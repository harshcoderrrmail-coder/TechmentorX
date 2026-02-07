import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import { ArrowRight, Shield } from "lucide-react";
import heroImage from "@/assets/hero-medical.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Medical technology visualization"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>

      <div className="container relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] items-center px-4">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 backdrop-blur-sm">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                AI-Powered Health Literacy
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-background sm:text-5xl md:text-6xl">
              {t("hero.title")}{" "}
              <span className="text-gradient-primary">{t("hero.title2")}</span>
            </h1>

            <p className="mb-8 max-w-lg text-lg leading-relaxed text-background/70">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                onClick={() => navigate("/auth?mode=signup")}
                className="gap-2 text-base"
              >
                {t("hero.cta.signup")}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/auth?mode=login")}
                className="bg-black text-white border-black text-base 
hover:bg-white hover:text-black 
transition-all duration-300 ease-in-out"
              >
                {t("hero.cta.login")}
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
