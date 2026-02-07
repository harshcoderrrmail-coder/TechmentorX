import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";

const AnalyzingLoader = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20">
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 glow-primary-strong"
      >
        <Brain className="h-10 w-10 text-primary" />
      </motion.div>

      <div className="text-center">
        <p className="text-lg font-semibold text-foreground">{t("dash.analyzing")}</p>
        <div className="mt-4 flex justify-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-primary"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyzingLoader;
