import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, FileText, Menu, X } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

interface ReportHistoryItem {
  id: string;
  report_name: string;
  ai_risk_level: string;
  created_at: string;
}

interface SidebarProps {
  reports: ReportHistoryItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
}

const riskDotColor: Record<string, string> = {
  low: "bg-success",
  moderate: "bg-warning",
  high: "bg-destructive",
};

const Sidebar = ({ reports, selectedId, onSelect, onNew }: SidebarProps) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const sidebarContent = (
    <>
      <div className="p-4">
        <Button onClick={onNew} className="w-full gap-2" size="sm">
          <Plus className="h-4 w-4" />
          {t("dash.new")}
        </Button>
      </div>

      <div className="px-4 py-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-sidebar-muted">
          {t("dash.history")}
        </p>
      </div>

      <ScrollArea className="flex-1 px-2">
        {reports.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-sidebar-muted">
            {t("dash.no.reports")}
          </p>
        ) : (
          <div className="space-y-1 pb-4">
            {reports.map((report) => (
              <button
                key={report.id}
                onClick={() => {
                  onSelect(report.id);
                  setIsOpen(false);
                }}
                className={`w-full rounded-lg px-3 py-3 text-left transition-colors ${
                  selectedId === report.id
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-sidebar-muted" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{report.report_name}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          riskDotColor[report.ai_risk_level] || "bg-sidebar-muted"
                        }`}
                      />
                      <span className="text-xs text-sidebar-muted">
                        {format(new Date(report.created_at), "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </ScrollArea>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-20 z-40 flex h-10 w-10 items-center justify-center rounded-lg bg-dark-surface text-dark-surface-foreground card-shadow lg:hidden"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-foreground/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 z-30 flex h-[calc(100vh-4rem)] w-72 flex-col bg-dark-surface transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;
