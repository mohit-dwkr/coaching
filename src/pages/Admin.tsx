import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Image,
  FileText,
  Trophy,
  Inbox,
  Home,
  GraduationCap,
} from "lucide-react";
import BatchManager from "@/components/admin/BatchManager";
import GalleryManager from "@/components/admin/GalleryManager";
import StudyMaterialManager from "@/components/admin/StudyMaterialManager";
import TopperManager from "@/components/admin/TopperManager";
import InquiryInbox from "@/components/admin/InquiryInbox";

const tabs = [
  { id: "batches", label: "Batches", icon: BookOpen },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "material", label: "Study Material", icon: FileText },
  { id: "toppers", label: "Toppers", icon: Trophy },
  { id: "inbox", label: "Inquiries", icon: Inbox },
] as const;

type Tab = (typeof tabs)[number]["id"];

const panels: Record<Tab, React.FC> = {
  batches: BatchManager,
  gallery: GalleryManager,
  material: StudyMaterialManager,
  toppers: TopperManager,
  inbox: InquiryInbox,
};

export default function Admin() {
  const [active, setActive] = useState<Tab>("batches");
  const navigate = useNavigate();
  const Panel = panels[active];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 bg-sidebar-background text-sidebar-foreground flex flex-col">
        <div className="p-4 flex items-center gap-2 font-bold text-lg border-b border-sidebar-border">
          <GraduationCap className="h-6 w-6 text-sidebar-primary" />
          Admin Panel
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active === t.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-2 text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors px-3 py-2"
          >
            <Home className="h-4 w-4" /> Back to Website
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-background p-6 lg:p-8 overflow-auto">
        <Panel />
      </main>
    </div>
  );
}
