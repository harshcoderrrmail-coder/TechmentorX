import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { FileText, Stethoscope, Lightbulb, AlertTriangle } from "lucide-react";
import RiskIndicator from "./RiskIndicator";
import HealthIndicatorCard from "./HealthIndicatorCard";

export interface ReportResult {
  summary: string;
  indicators: Array<{
    name: string;
    value: string;
    status: "normal" | "moderate" | "high";
  }>;
  riskLevel: "low" | "moderate" | "high";
  suggestions: string[];
  doctorRecommendation: string | null;
}

interface ResultsDisplayProps {
  result: ReportResult;
}

const ResultsDisplay = ({ result }: ResultsDisplayProps) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Summary */}
      <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">{t("dash.summary")}</h3>
        </div>
        <p className="leading-relaxed text-muted-foreground">{result.summary}</p>
      </div>

      {/* Risk Level */}
      <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
        <h3 className="mb-6 text-center text-lg font-semibold text-foreground">
          {t("dash.risk")}
        </h3>
        <RiskIndicator level={result.riskLevel} />
      </div>

      {/* Health Indicators */}
      {result.indicators.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Stethoscope className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{t("dash.indicators")}</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {result.indicators.map((indicator, i) => (
              <HealthIndicatorCard
                key={i}
                name={indicator.name}
                value={indicator.value}
                status={indicator.status}
                index={i}
              />
            ))}
          </div>
        </div>
      )}

      {/* Lifestyle Suggestions */}
      {result.suggestions.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Lightbulb className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{t("dash.suggestions")}</h3>
          </div>
          <ul className="space-y-3">
            {result.suggestions.map((suggestion, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">{suggestion}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      {/* Doctor Recommendation */}
      {result.doctorRecommendation && (
        <div className="rounded-2xl border border-warning/30 bg-warning/5 p-6">
          <div className="mb-3 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <h3 className="text-lg font-semibold text-foreground">{t("dash.doctor")}</h3>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {result.doctorRecommendation}
          </p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="rounded-xl bg-muted/50 p-4 text-center">
        <p className="text-xs leading-relaxed text-muted-foreground">
          {t("footer.disclaimer")}
        </p>
      </div>
    </motion.div>
  );
};

export default ResultsDisplay;
