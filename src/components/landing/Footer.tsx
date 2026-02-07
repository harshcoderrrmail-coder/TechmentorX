import { useLanguage } from "@/contexts/LanguageContext";
import { Activity, Heart } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-dark-surface border-t border-sidebar-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Activity className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-dark-surface-foreground">MedSimplify</span>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-sidebar-muted">
            {t("footer.disclaimer")}
          </p>

          <div className="flex items-center gap-1 text-xs text-sidebar-muted">
            Made with <Heart className="h-3 w-3 text-primary" /> for better health literacy
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
