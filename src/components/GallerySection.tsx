import { motion } from "framer-motion";
import { getGallery } from "@/lib/data";
import { ImageIcon } from "lucide-react";

const placeholders = [
  { id: "p1", label: "Classroom Sessions" },
  { id: "p2", label: "Annual Function" },
  { id: "p3", label: "Science Lab" },
  { id: "p4", label: "Award Ceremony" },
  { id: "p5", label: "Sports Day" },
  { id: "p6", label: "Study Tours" },
];

export default function GallerySection() {
  const gallery = getGallery();
  const hasImages = gallery.length > 0;

  return (
    <section id="gallery" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Photo <span className="text-primary">Gallery</span>
          </h2>
          <p className="mt-2 md:mt-3 text-muted-foreground max-w-lg mx-auto text-sm md:text-base">
            Glimpses of our vibrant coaching environment and memorable events.
          </p>
        </motion.div>

        {/* Responsive Grid: 1 column on mobile, 2 on small tablets, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {hasImages ? (
            gallery.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative aspect-video rounded-xl overflow-hidden border border-border shadow-sm transition-all duration-300"
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Responsive Overlay: Always visible on mobile, hover on desktop */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-white text-xs md:text-sm font-medium">
                    {img.caption}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            placeholders.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative aspect-video rounded-xl bg-secondary border border-border flex flex-col items-center justify-between p-4 overflow-hidden transition-all duration-300 hover:border-primary/50"
              >
                {/* Center Icon */}
                <div className="flex-1 flex items-center justify-center">
                   <div className="p-3 rounded-full bg-background/50 group-hover:bg-primary/10 transition-colors duration-300">
                    <ImageIcon className="h-6 w-6 md:h-8 md:w-8 text-primary/40 group-hover:text-primary transition-colors duration-300" />
                   </div>
                </div>
                
                {/* Label always at bottom */}
                <span className="text-xs md:text-sm font-semibold text-muted-foreground group-hover:text-primary transition-colors duration-300 text-center">
                  {p.label}
                </span>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}