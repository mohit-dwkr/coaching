import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { getToppers } from "@/lib/data";

export default function ToppersSection() {
  const toppers = getToppers();

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

        {/* Grid: 2 columns on mobile, 3 on tablet, 4 on desktop for smaller card size */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {toppers.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all group"
            >
              {/* Photo Area: Thoda chota aur balanced */}
              <div className="relative aspect-[4/3] w-full bg-primary/5 flex items-center justify-center border-b border-border">
                {/* Icon size adjusted to h-16 (Balanced) */}
                <Award className="h-12 w-12 md:h-16 md:w-16 text-primary/70 group-hover:scale-110 transition-transform duration-300" />
                
                {/* Marks Badge: Compact size */}
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-0.5 rounded-md font-bold text-xs md:text-sm shadow-sm">
                  {t.marks}
                </div>
              </div>

              {/* Text Area: Clean and small */}
              <div className="p-3 md:p-4 text-center">
                <h3 className="font-bold text-sm md:text-base text-foreground truncate">
                  {t.name}
                </h3>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5">
                   Batch {t.year}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}