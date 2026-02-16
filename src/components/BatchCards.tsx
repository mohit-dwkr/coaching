import { motion } from "framer-motion";
import { Clock, BookOpen, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBatches } from "@/lib/data";

export default function BatchCards() {
  const batches = getBatches();

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
          {batches.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold mb-4">
                Class {b.className}
              </div>

              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <BookOpen className="h-4 w-4 mt-0.5 text-primary" />
                  <span>{b.subjects.join(", ")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{b.timing}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-foreground text-base">₹{b.fees}/month</span>
                </div>
              </div>

              <Button className="w-full mt-6" asChild>
                <a href="#contact">Join Now</a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
