import { motion } from "framer-motion";
import { User, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient"; // Path check kar lein

export default function FacultySection() {
  const [facultyData, setFacultyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Supabase se faculty data fetch karne ka logic
  useEffect(() => {
    async function fetchFaculty() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("Coaching_Faculty")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) setFacultyData(data);
      } catch (err) {
        console.error("Faculty fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFaculty();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <section id="faculty" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">
            Meet Our <span className="text-primary">Faculty</span>
          </h2>
          <p className="mt-2 text-muted-foreground max-w-md mx-auto text-sm md:text-base">
            Learn from the best educators with decades of combined teaching experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {facultyData.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all group"
            >
              {/* Profile Image Area */}
              <div className="relative aspect-[4/3] w-full bg-secondary/50 flex items-center justify-center border-b border-border overflow-hidden">
                {f.image_url ? (
                  <img
                    src={f.image_url}
                    alt={f.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <User className="h-12 w-12 md:h-16 md:w-16 text-primary/70 group-hover:scale-110 transition-transform duration-300" />
                )}

                {/* Experience Badge - Using 'experience_years' from your table */}
                <div className="absolute top-2 right-2 bg-blue-600 backdrop-blur-sm text-white px-2 py-0.5 rounded-md font-semibold text-[7px] md:text-xs border border-blue-700">
                  {f.experience_years}-Years
                </div>
              </div>

              {/* Faculty Info Area */}
              <div className="p-3 md:p-4 text-center">
                <h3 className="font-bold text-sm md:text-base text-foreground truncate">
                  {f.name}
                </h3>
                <p className="text-primary text-[10px] md:text-xs font-bold uppercase tracking-wide mt-1">
                  {f.subject}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {!loading && facultyData.length === 0 && (
          <p className="text-center text-muted-foreground mt-10">No faculty members added yet.</p>
        )}
      </div>
    </section>
  );
}