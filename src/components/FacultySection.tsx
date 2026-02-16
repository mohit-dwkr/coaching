import { motion } from "framer-motion";
import { User } from "lucide-react";
import { defaultFaculty } from "@/lib/data";

export default function FacultySection() {
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

        {/* Same Grid as Toppers: 2 columns mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {defaultFaculty.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all group"
            >
              {/* Profile Image Area - Topper design se matched */}
              <div className="relative aspect-[4/3] w-full bg-secondary/50 flex items-center justify-center border-b border-border">
                {/* User Icon size balanced like Award icon */}
                <User className="h-12 w-12 md:h-16 md:w-16 text-primary/70 group-hover:scale-110 transition-transform duration-300" />
                
                {/* Experience Badge - Marks badge ki tarah */}
                <div className="absolute top-2 right-2 bg-primary/10 text-primary px-2 py-0.5 rounded-md font-semibold text-[10px] md:text-xs border border-primary/20">
                  {f.experience}
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
      </div>
    </section>
  );
}