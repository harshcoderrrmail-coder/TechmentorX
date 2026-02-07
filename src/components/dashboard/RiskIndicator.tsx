import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

interface RiskIndicatorProps {
  level: "low" | "moderate" | "high";
}

const riskConfig = {
  low: { color: "hsl(104, 44%, 43%)", percentage: 25, key: "risk.low" },
  moderate: { color: "hsl(45, 93%, 47%)", percentage: 55, key: "risk.moderate" },
  high: { color: "hsl(0, 72%, 51%)", percentage: 85, key: "risk.high" },
};

const RiskIndicator = ({ level }: RiskIndicatorProps) => {
  const { t } = useLanguage();
  const config = riskConfig[level];
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (config.percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-32 w-32">
        <svg className="h-32 w-32 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="8"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={config.color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-foreground">{config.percentage}%</span>
        </div>
      </div>
      <span
        className="rounded-full px-4 py-1.5 text-sm font-semibold"
        style={{ backgroundColor: `${config.color}20`, color: config.color }}
      >
        {t(config.key)}
      </span>
    </div>
  );
};

export default RiskIndicator;
