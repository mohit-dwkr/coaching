import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, Trophy, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import heroImg from "@/assets/hero-director.png";

const stats = [
  { icon: Users, value: "5000+", label: "Students Taught" },
  { icon: Trophy, value: "200+", label: "Toppers Produced" },
  { icon: Clock, value: "15+", label: "Years of Excellence" },
];

export default function HeroSection() {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    fetchHero();
  }, []);

  async function fetchHero() {
    const { data, error } = await supabase
      .from("Coaching_Hero")
      .select("*")
      .limit(1)
      .single();

    if (!error && data) {
      setHeroData(data);
    }
  }

  // --- Automatic Second Word Blue Logic ---
  const renderHeading = () => {
    const rawHeading = heroData?.heading || "Where Excellence Meets Ambition";
    const words = rawHeading.split(/\s+/).filter(Boolean);

    return words.map((word, index) => (
      <span key={index}>
        {/* Index 1 hamesha second word hota hai */}
        <span className={index === 1 ? "text-primary" : ""}>
          {word}
        </span>
        {/* Word ke baad space tabhi aaye jab wo aakhri word na ho */}
        {index !== words.length - 1 && " "}
        {/* Pehle do words ke baad mobile par break lene ke liye (optional styling) */}
        {index === 1 && <br className="hidden md:block" />}
      </span>
    ));
  };

  return (
    <section id="home" className="pt-16">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground">
              {renderHeading()}
            </h1>

            <p className="mt-5 text-lg text-muted-foreground max-w-md leading-relaxed">
              {heroData?.subheading ||
                "Empowering K-12 students with expert coaching, proven results, and a clear path to academic greatness — for over 15 years."}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <a href="#contact">Join Now</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#batches">Explore Batches</a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl" />
              <img
                src={heroData?.image_url || heroImg}
                alt="Director – Academic Coaching Centre"
                className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-4 bg-secondary rounded-xl p-5 border border-primary/10"
            >
              <div className="flex-shrink-0 p-3 rounded-lg bg-primary text-primary-foreground">
                <s.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}