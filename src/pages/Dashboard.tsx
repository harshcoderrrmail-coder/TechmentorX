import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import UploadSection from "@/components/dashboard/UploadSection";
import ResultsDisplay, { ReportResult } from "@/components/dashboard/ResultsDisplay";
import AnalyzingLoader from "@/components/dashboard/AnalyzingLoader";
import { FileText } from "lucide-react";
import { toast } from "sonner";

interface Report {
  id: string;
  report_name: string;
  ai_risk_level: string;
  created_at: string;
  original_text: string;
  ai_summary: string | null;
  ai_indicators: any;
  ai_suggestions: any;
  ai_doctor_recommendation: string | null;
}

const Dashboard = () => {
  const { user, loading } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [reports, setReports] = useState<Report[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showUpload, setShowUpload] = useState(true);
  const [currentResult, setCurrentResult] = useState<ReportResult | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth?mode=login");
    }
  }, [user, loading, navigate]);

  const fetchReports = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch reports:", error);
      return;
    }
    setReports((data as Report[]) || []);
  }, [user]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleSelectReport = (id: string) => {
    const report = reports.find((r) => r.id === id);
    if (!report) return;

    setSelectedId(id);
    setShowUpload(false);

    if (report.ai_summary) {
      setCurrentResult({
        summary: report.ai_summary,
        indicators: (report.ai_indicators as any[]) || [],
        riskLevel: (report.ai_risk_level as "low" | "moderate" | "high") || "low",
        suggestions: (report.ai_suggestions as string[]) || [],
        doctorRecommendation: report.ai_doctor_recommendation,
      });
    }
  };

  const handleNewReport = () => {
    setSelectedId(null);
    setShowUpload(true);
    setCurrentResult(null);
  };

  const handleAnalyze = async (text: string) => {
    if (!user) return;
    setIsAnalyzing(true);
    setShowUpload(false);
    setCurrentResult(null);

    try {
      const { data: fnData, error: fnError } = await supabase.functions.invoke("analyze-report", {
        body: { reportText: text, language },
      });

      if (fnError) {
        console.error("Edge function error:", fnError);
        toast.error("Failed to analyze report. Please try again.");
        setShowUpload(true);
        setIsAnalyzing(false);
        return;
      }

      const result: ReportResult = fnData;

      // Save to database
      const reportName = text.substring(0, 50).replace(/\n/g, " ").trim() + "...";
      const { data: savedReport, error: saveError } = await supabase
        .from("reports")
        .insert({
          user_id: user.id,
          report_name: reportName,
          original_text: text,
          ai_summary: result.summary,
          ai_indicators: result.indicators as any,
          ai_risk_level: result.riskLevel,
          ai_suggestions: result.suggestions as any,
          ai_doctor_recommendation: result.doctorRecommendation,
          language,
        })
        .select()
        .maybeSingle();

      if (saveError) {
        console.error("Failed to save report:", saveError);
      }

      setCurrentResult(result);
      if (savedReport) {
        setSelectedId(savedReport.id);
      }
      await fetchReports();
    } catch (err) {
      console.error("Analysis error:", err);
      toast.error("Something went wrong. Please try again.");
      setShowUpload(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <Sidebar
        reports={reports}
        selectedId={selectedId}
        onSelect={handleSelectReport}
        onNew={handleNewReport}
      />

      {/* Main content area */}
      <main className="pt-16 lg:pl-72">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          {isAnalyzing ? (
            <AnalyzingLoader />
          ) : currentResult ? (
            <ResultsDisplay result={currentResult} />
          ) : showUpload ? (
            <UploadSection onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent">
                <FileText className="h-8 w-8 text-accent-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">{t("dash.welcome")}</h2>
              <p className="mt-2 text-muted-foreground">{t("dash.welcome.sub")}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
