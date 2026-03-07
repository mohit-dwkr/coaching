import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, Trophy, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

const stats = [
  { icon: Users, value: "5000+", label: "Students Taught" },
  { icon: Trophy, value: "200+", label: "Toppers Produced" },
  { icon: Clock, value: "15+", label: "Years of Excellence" },
];

export default function HeroSection() {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHero();
  }, []);

  async function fetchHero() {
    try {
      const { data, error } = await supabase
        .from("Coaching_Hero")
        .select("*")
        .limit(1)
        .single();

      if (!error && data) {
        setHeroData(data);
      }
    } finally {
      setLoading(false);
    }
  }

  const renderHeading = () => {
    const rawHeading = heroData?.heading || "Where Excellence Meets Ambition";
    const words = rawHeading.split(/\s+/).filter(Boolean);

    return words.map((word, index) => (
      <span key={index}>
        <span className={index === 1 ? "text-primary" : ""}>
          {word}
        </span>
        {index !== words.length - 1 && " "}
        {index === 1 && <br className="hidden md:block" />}
      </span>
    ));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="home" className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image Layer */}
      {heroData?.image_url && (
        <div className="absolute inset-0 z-0">
          <img
            src={heroData.image_url}
            alt="Classroom Background"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10 py-24">
        <AnimatePresence mode="wait">
          {!loading ? (
            <motion.div
              key="hero-content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-3xl"
            >
              {/* Text Side - Now White for Overlay */}
              <motion.div variants={itemVariants}>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight text-white drop-shadow-md">
                  {renderHeading()}
                </h1>

                <p className="mt-5 text-lg text-gray-100 max-w-xl leading-relaxed drop-shadow-sm">
                  {heroData?.subheading ||
                    "Empowering K-12 students with expert coaching, proven results, and a clear path to academic greatness — for over 15 years."}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white" asChild>
                    <a href="#contact">Join Now</a>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white hover:text-black" asChild>
                    <a href="#batches">Explore Batches</a>
                  </Button>
                </div>
              </motion.div>

              {/* Stats - Floating Bento Style */}
              <motion.div
                variants={itemVariants}
                className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5"
              >
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center gap-4 bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-xl"
                  >
                    <div className="flex-shrink-0 p-3 rounded-lg bg-primary text-white">
                      <s.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">{s.value}</div>
                      <div className="text-sm text-slate-600 font-medium">{s.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <div key="loader" className="h-[60vh]" />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}