import { motion } from "framer-motion";
import { User } from "lucide-react";
import { defaultFaculty } from "@/lib/data";

export default function FacultySection() {
  return (
    <section id="faculty" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Meet Our <span className="text-primary">Faculty</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Learn from the best educators with decades of combined teaching experience.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {defaultFaculty.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
                <User className="h-9 w-9 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{f.name}</h3>
              <p className="text-primary text-sm font-medium mt-1">{f.subject}</p>
              <p className="text-xs text-muted-foreground mt-1">{f.experience} experience</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
