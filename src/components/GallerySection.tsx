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
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Photo <span className="text-primary">Gallery</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Glimpses of our vibrant coaching environment and memorable events.
          </p>
        </motion.div>

        {hasImages ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="aspect-video rounded-xl overflow-hidden group"
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {placeholders.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="aspect-video rounded-xl bg-secondary border border-border flex flex-col items-center justify-center gap-2"
              >
                <ImageIcon className="h-8 w-8 text-primary/40" />
                <span className="text-sm text-muted-foreground">{p.label}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
