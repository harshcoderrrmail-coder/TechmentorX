import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Brain, Gauge, Languages, Lock } from "lucide-react";

const features = [
  { icon: Brain, titleKey: "features.ai.title", descKey: "features.ai.desc" },
  { icon: Gauge, titleKey: "features.risk.title", descKey: "features.risk.desc" },
  { icon: Languages, titleKey: "features.lang.title", descKey: "features.lang.desc" },
  { icon: Lock, titleKey: "features.secure.title", descKey: "features.secure.desc" },
];

const FeaturesSection = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            {t("features.title")}
          </h2>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-2xl border border-border bg-card p-8 card-shadow transition-all duration-300 hover:card-shadow-hover hover:border-primary/20"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                {t(feature.titleKey)}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t(feature.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
