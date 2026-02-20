import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Loader2 } from "lucide-react"; // Loader2 add kiya
import { supabase } from "@/supabaseClient"; // Supabase import zaroori hai
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!form.name.trim() || !form.phone.trim()) {
      toast({ title: "Please fill required fields", variant: "destructive" });
      return;
    }

    try {
      setIsSubmitting(true);

      // Supabase table 'Coaching_Contactform' mein data insert ho raha hai
      const { error } = await supabase
        .from("Coaching_Contactform")
        .insert([
          {
            name: form.name,
            email: form.email,
            phone: form.phone,
            message: form.message,
          },
        ]);

      if (error) throw error;

      toast({ 
        title: "Inquiry Sent!", 
        description: "We'll get back to you soon." 
      });

      // Form reset
      setForm({ name: "", email: "", phone: "", message: "" });
      
    } catch (error: any) {
      toast({ 
        title: "Error sending inquiry", 
        description: error.message, 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Have questions? Reach out to us and we'll help you get started.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Input
              placeholder="Your Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={100}
              disabled={isSubmitting}
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              maxLength={255}
              disabled={isSubmitting}
            />
            <Input
              placeholder="Phone Number *"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              maxLength={15}
              disabled={isSubmitting}
            />
            <Textarea
              placeholder="Your Message"
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              maxLength={500}
              disabled={isSubmitting}
            />
            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
              ) : (
                "Send Inquiry"
              )}
            </Button>
          </motion.form>

          {/* Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Address</p>
                  <p className="text-sm text-muted-foreground">
                    123 Education Street, Knowledge Park, New Delhi – 110001
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Phone</p>
                  <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">info@academic.edu.in</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-border h-56">
              <iframe
                title="Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.562010214697!2d77.2065154150822!3d28.613939082424164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b71db41105e!2sIndia%20Gate!5e0!3m2!1sen!2sin!4v1647424685000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}