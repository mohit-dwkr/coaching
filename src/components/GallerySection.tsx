import { motion } from "framer-motion";
import { ImageIcon, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";
import { Button } from "@/components/ui/button";

export default function GallerySection() {
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // Supabase se data fetch karna
  useEffect(() => {
    async function fetchGallery() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("Coaching_Gallery")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) setGallery(data);
      } catch (err) {
        console.error("Gallery fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  // Limit logic: Default 6 images dikhengi
  const displayedImages = showAll ? gallery : gallery.slice(0, 6);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {gallery.length > 0 ? (
            displayedImages.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative aspect-video rounded-xl overflow-hidden border border-border shadow-sm transition-all duration-300"
              >
                <img
                  src={img.image_url} // Database column name used
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-white text-xs md:text-sm font-medium">
                    {img.caption}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-muted-foreground">
              <ImageIcon className="h-10 w-10 mx-auto mb-2 opacity-20" />
              <p>No photos available yet.</p>
            </div>
          )}
        </div>

        {/* Show More / Show Less Button */}
        {gallery.length > 6 && (
          <div className="mt-10 flex justify-center">
            <Button 
              variant="outline" 
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 font-semibold border-primary/20 hover:bg-primary/5"
            >
              {showAll ? (
                <>Show Less <ChevronUp className="h-4 w-4" /></>
              ) : (
                <>Show More <ChevronDown className="h-4 w-4" /></>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}