import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, BookOpen, Layers, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/supabaseClient";

export default function StudyMaterialSection() {
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    async function fetchMaterials() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("Coaching_StudyMaterial")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) {
          setMaterials(data);
          // Fixed TypeScript Error: adding 'as string[]'
          const uniqueClasses = [...new Set(data.map((m: any) => m.student_class))] as string[];
          if (uniqueClasses.length > 0) {
            setSelectedClass(uniqueClasses[0]);
            const firstSubject = data.find((m: any) => m.student_class === uniqueClasses[0])?.subject;
            setSelectedSubject(firstSubject || "");
          }
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMaterials();
  }, []);

  const classes = [...new Set(materials.map((m) => m.student_class))] as string[];
  const subjectsForClass = [...new Set(materials.filter((m) => m.student_class === selectedClass).map((m) => m.subject))] as string[];

  const handleClassChange = (c: string) => {
    setSelectedClass(c);
    const firstSubject = materials.find(m => m.student_class === c)?.subject;
    setSelectedSubject(firstSubject ?? "");
  };

  const filtered = materials.filter(m => m.student_class === selectedClass && m.subject === selectedSubject);

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <section id="material" className="relative py-8 mt-10 md:py-20 bg-[#F8FAFC] min-h-screen h-auto overflow-y-visible">
  {/* pt-20 mobile par navbar se space dene ke liye hai */}
  <div className="container mx-auto px-4 md:px-4 pt-20 md:pt-0">
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="text-center mb-10 px-4"
    >
      <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
        Study <span className="text-primary">Material</span>
      </h2>
    </motion.div>

    <div className="max-w-4xl mx-auto px-4 pb-20">
      {/* Class Selection */}
      <div className="mb-8 text-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-widest">
          Step 1: Select Your Class
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {classes.map((c: string | number) => (
            <button 
              key={c} 
              onClick={() => handleClassChange(c)} 
              className={`px-5 py-2 rounded-xl font-bold transition-all ${selectedClass === c ? "bg-primary text-white shadow-md" : "bg-white border text-slate-500 hover:bg-slate-50"}`}
            >
              Class {c}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Selection */}
      {selectedClass && (
        <div className="mb-12 text-center animate-in fade-in duration-300">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-widest">
            Step 2: Choose Subject
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {subjectsForClass.map((s: string) => (
              <button 
                key={s} 
                onClick={() => setSelectedSubject(s)} 
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${selectedSubject === s ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PDF List */}
      <div className="space-y-3">
        <AnimatePresence mode="wait">
          {filtered.map((m: any) => (
            <motion.div 
              key={m.id} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-white border rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
            >
              <div className="flex items-center gap-3 w-full">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                  <FileText size={20} />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <p className="font-bold text-slate-800 truncate text-sm md:text-base">{m.title}</p>
                  <p className="text-xs text-slate-400">{m.subject} | Class {m.student_class}</p>
                </div>
              </div>
              <Button asChild className="w-full sm:w-auto rounded-xl font-bold">
                <a href={m.file_url} target="_blank" rel="noreferrer">
                  <Download className="h-4 w-4 mr-2" /> Download
                </a>
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  </div>
</section>
  );
}