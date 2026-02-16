import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMaterials } from "@/lib/data";

export default function StudyMaterialSection() {
  const materials = getMaterials();
  const classes = [...new Set(materials.map((m) => m.className))];
  const [selected, setSelected] = useState(classes[0] ?? "");

  const filtered = materials.filter((m) => m.className === selected);

  return (
    <section id="material" className="py-20 bg-secondary/40">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Study <span className="text-primary">Material</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Download high-quality notes prepared by our expert faculty.
          </p>
        </motion.div>

        {/* Class filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {classes.map((c) => (
            <button
              key={c}
              onClick={() => setSelected(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selected === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-primary"
              }`}
            >
              Class {c}
            </button>
          ))}
        </div>

        <div className="max-w-2xl mx-auto space-y-3">
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No materials available for this class yet.</p>
          )}
          {filtered.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground text-sm">{m.title}</p>
                  <p className="text-xs text-muted-foreground">{m.subject}</p>
                </div>
              </div>
              <Button size="sm" variant="outline" asChild>
                <a href={m.pdfUrl} target="_blank" rel="noreferrer">
                  <Download className="h-4 w-4 mr-1" /> Download
                </a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
