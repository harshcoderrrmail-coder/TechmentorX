import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

interface HealthIndicatorCardProps {
  name: string;
  value: string;
  status: "normal" | "moderate" | "high";
  index: number;
}

const statusStyles = {
  normal: { bg: "bg-success/10", text: "text-success", key: "status.normal" },
  moderate: { bg: "bg-warning/10", text: "text-warning", key: "status.moderate" },
  high: { bg: "bg-destructive/10", text: "text-destructive", key: "status.high" },
};

const HealthIndicatorCard = ({ name, value, status, index }: HealthIndicatorCardProps) => {
  const { t } = useLanguage();
  const style = statusStyles[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="flex items-center justify-between rounded-xl border border-border bg-card p-4 card-shadow"
    >
      <div>
        <p className="text-sm font-medium text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground">{value}</p>
      </div>
      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${style.bg} ${style.text}`}>
        {t(style.key)}
      </span>
    </motion.div>
  );
};

export default HealthIndicatorCard;
