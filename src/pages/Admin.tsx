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
  User,
  Menu,
  X,
  AppWindow
} from "lucide-react";
import BatchManager from "@/components/admin/BatchManager";
import GalleryManager from "@/components/admin/GalleryManager";
import StudyMaterialManager from "@/components/admin/StudyMaterialManager";
import TopperManager from "@/components/admin/TopperManager";
import InquiryInbox from "@/components/admin/InquiryInbox";
import FacultyManager from "@/components/admin/facultyManager";
import HeroManager from "@/components/admin/HeroManager";
import { motion, AnimatePresence } from "framer-motion"; // Thoda smooth feel ke liye

const tabs = [
  { id: "batches", label: "Manage Batches", icon: BookOpen },
  { id: "gallery", label: "Gallery Photos", icon: Image },
  { id: "material", label: "Study Material", icon: FileText },
  { id: "toppers", label: "Toppers & Results", icon: Trophy },
  { id: "inbox", label: "Student Inquiries", icon: Inbox },
  { id: "faculty", label: "Faculty Management", icon: User},
  { id: "Hero", label: "Hero Management", icon: AppWindow},
] as const;

type Tab = (typeof tabs)[number]["id"];

const panels: Record<Tab, React.FC> = {
  batches: BatchManager,
  gallery: GalleryManager,
  material: StudyMaterialManager,
  toppers: TopperManager,
  inbox: InquiryInbox,
  faculty: FacultyManager,
  Hero: HeroManager,
};

export default function Admin() {
  const [active, setActive] = useState<Tab>("batches");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const Panel = panels[active];

  const handleTabChange = (id: Tab) => {
    setActive(id);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans antialiased text-slate-900 overflow-hidden">
      
      {/* --- MOBILE SIDEBAR OVERLAY --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[60] lg:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-[70] w-72 bg-white border-r border-slate-200 flex flex-col shadow-2xl lg:shadow-none 
        transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-64
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-xl">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-800">
              Admin <span className="text-primary font-medium text-lg italic">Panel</span>
            </span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {tabs.map((t) => {
            const IsActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleTabChange(t.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                  IsActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-slate-500 hover:bg-slate-50 hover:text-primary"
                }`}
              >
                <t.icon className={`h-5 w-5 ${IsActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                {t.label}
              </button>
            );
          })}
        </nav>

        {/* Footer Link */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/30">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 text-sm font-semibold text-slate-500 hover:text-red-600 transition-colors px-4 py-3 rounded-xl hover:bg-red-50"
          >
            <Home className="h-5 w-5" /> 
            <span>Exit to Website</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 shrink-0 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8">
            <div className="flex items-center gap-4 min-w-0">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 -ml-2 lg:hidden text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              <h1 className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400 truncate">
                  Dashboard / <span className="text-slate-900">{active}</span>
              </h1>
            </div>

            <div className="flex items-center gap-3 shrink-0">
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-bold text-slate-700 leading-none">Admin User</p>
                </div>
                <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <User className="h-5 w-5 text-slate-500" />
                </div>
            </div>
        </header>

        {/* Dynamic Content Scroll Area */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
          <div className="p-4 md:p-8 lg:p-10 max-w-[1400px] mx-auto">
            <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
              <Panel />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}