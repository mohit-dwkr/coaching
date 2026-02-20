import { motion, AnimatePresence } from "framer-motion";
import { Clock, BookOpen, IndianRupee, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient"; // Path check kar lein

export default function BatchCards() {
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // See More logic ke liye state
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchBatches() {
      try {
        const { data, error } = await supabase
          .from("Coaching_Batches")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data) {
          setBatches(data);
        }
      } catch (err) {
        console.error("Error fetching batches:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBatches();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Pehle 6 batches ya saare batches decide karne ka logic
  const displayedBatches = showAll ? batches : batches.slice(0, 6);

  return (
    <section id="batches" className="py-20 bg-secondary/40">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Our <span className="text-primary">Batches</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Carefully structured batches for every class with expert faculty and flexible timings.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedBatches.map((b, i) => (
              <motion.div
                key={b.id}
                layout // Smooth transition ke liye
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <div className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold mb-4">
                  Class {b.class_name}
                </div>

                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <BookOpen className="h-4 w-4 mt-0.5 text-primary" />
                    <span>{b.subjects}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{b.start_time} - {b.end_time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-foreground text-base">₹{b.price}/month</span>
                  </div>
                </div>

                <Button className="w-full mt-6" asChild>
                  <a href="#contact">Join Now</a>
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* See More / See Less Button Logic */}
        {batches.length > 6 && (
          <div className="mt-12 text-center">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => setShowAll(!showAll)}
              className="rounded-full px-8 border-primary text-primary hover:bg-primary hover:text-white transition-all"
            >
              {showAll ? (
                <>See Less <ChevronUp className="ml-2 h-4 w-4" /></>
              ) : (
                <>See More <ChevronDown className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </div>
        )}

        {!loading && batches.length === 0 && (
          <p className="text-center text-muted-foreground mt-10">No batches available.</p>
        )}
      </div>
    </section>
  );
}