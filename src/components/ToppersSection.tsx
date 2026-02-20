import { motion } from "framer-motion";
import { Award, Loader2, ChevronDown, ChevronUp } from "lucide-react"; // Icons add kiye
import { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient"; 
import { Button } from "@/components/ui/button"; // Button component use kiya

export default function ToppersSection() {
  const [toppers, setToppers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false); // Toggle state

  useEffect(() => {
    async function fetchToppers() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("Coaching_Toppers")
          .select("*")
          .order("created_at", { ascending: false }); 

        if (error) throw error;
        if (data) setToppers(data);
      } catch (err) {
        console.error("Toppers fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchToppers();
  }, []);

  // Sirf pehle 8 toppers dikhane ke liye logic
  const displayedToppers = showAll ? toppers : toppers.slice(0, 8);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <section id="results" className="py-16 bg-secondary/40">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">
            Our <span className="text-primary">Toppers</span>
          </h2>
          <p className="mt-2 text-muted-foreground max-w-md mx-auto text-sm md:text-base">
            Celebrating students who achieved outstanding results.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {displayedToppers.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all group"
            >
              <div className="relative aspect-[4/3] w-full bg-primary/5 flex items-center justify-center border-b border-border overflow-hidden">
                {t.image_url ? (
                  <img 
                    src={t.image_url} 
                    alt={t.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <Award className="h-12 w-12 md:h-16 md:w-16 text-primary/70 group-hover:scale-110 transition-transform duration-300" />
                )}
                
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-0.5 rounded-md font-bold text-xs md:text-sm shadow-sm z-10">
                  {t.percentage}%
                </div>
              </div>

              <div className="p-3 md:p-4 text-center">
                <h3 className="font-bold text-sm md:text-base text-foreground truncate">
                  {t.name}
                </h3>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5">
                   Class {t.student_class} | Batch {t.batch_year}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More / Show Less Button */}
        {toppers.length > 8 && (
          <div className="mt-12 flex justify-center">
            <Button 
              variant="outline" 
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 font-semibold"
            >
              {showAll ? (
                <>Show Less <ChevronUp className="h-4 w-4" /></>
              ) : (
                <>Show More <ChevronDown className="h-4 w-4" /></>
              )}
            </Button>
          </div>
        )}

        {!loading && toppers.length === 0 && (
          <p className="text-center text-muted-foreground mt-10">No results to show yet.</p>
        )}
      </div>
    </section>
  );
}