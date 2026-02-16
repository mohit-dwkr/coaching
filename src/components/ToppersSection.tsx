import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { getToppers } from "@/lib/data";

export default function ToppersSection() {
  const toppers = getToppers();

  return (
    <section id="results" className="py-20 bg-secondary/40">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Our <span className="text-primary">Toppers</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Celebrating students who achieved outstanding results with our guidance.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {toppers.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-xl border border-border p-6 flex items-center gap-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{t.name}</h3>
                <p className="text-primary font-bold text-lg">{t.marks}</p>
                <p className="text-xs text-muted-foreground">Batch of {t.year}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
