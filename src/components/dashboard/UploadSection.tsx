import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, X } from "lucide-react";
import { toast } from "sonner";

interface UploadSectionProps {
  onAnalyze: (text: string) => void;
  isAnalyzing: boolean;
}

const UploadSection = ({ onAnalyze, isAnalyzing }: UploadSectionProps) => {
  const { t } = useLanguage();
  const [reportText, setReportText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);

  const extractTextFromPdf = async (file: File): Promise<string> => {
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const text = content.items.map((item: any) => item.str).join(" ");
      fullText += text + "\n\n";
    }

    return fullText.trim();
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setFileName(file.name);

    try {
      const text = await extractTextFromPdf(file);
      if (text.trim().length < 20) {
        toast.error("Could not extract enough text from the PDF. Try pasting the text instead.");
        return;
      }
      setReportText(text);
      toast.success("PDF text extracted successfully!");
    } catch {
      toast.error("Failed to read PDF. Try pasting the report text instead.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  const handleAnalyze = () => {
    if (!reportText.trim()) {
      toast.error("Please upload a PDF or paste report text first");
      return;
    }
    onAnalyze(reportText);
  };

  const clearFile = () => {
    setFileName(null);
    setReportText("");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">{t("dash.upload.title")}</h2>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-200 ${
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/40 hover:bg-accent/50"
        }`}
      >
        <input {...getInputProps()} />
        {fileName ? (
          <div className="flex items-center justify-center gap-3">
            <FileText className="h-8 w-8 text-primary" />
            <span className="font-medium text-foreground">{fileName}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearFile();
              }}
              className="rounded-full p-1 hover:bg-muted"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        ) : (
          <>
            <Upload className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{t("dash.upload.drag")}</p>
          </>
        )}
      </div>

      {/* Text Area */}
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">{t("dash.upload.paste")}</p>
        <Textarea
          value={reportText}
          onChange={(e) => setReportText(e.target.value)}
          placeholder={t("dash.upload.placeholder")}
          rows={8}
          className="resize-none rounded-xl"
        />
      </div>

      {/* Analyze Button */}
      <Button
        size="lg"
        className="w-full text-base"
        onClick={handleAnalyze}
        disabled={isAnalyzing || !reportText.trim()}
      >
        {t("dash.analyze")}
      </Button>
    </div>
  );
};

export default UploadSection;
