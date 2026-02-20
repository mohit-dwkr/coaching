import { useState, useEffect, useRef } from "react";
import { Layout, Image as ImageIcon, Upload, Save, Type, AlignLeft, Loader2, RefreshCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/supabaseClient";

const DEFAULT_HERO = {
  heading: "Where Excellence Meets Ambition",
  subheading: "Empowering K-12 students with expert coaching, proven results, and a clear path to academic greatness — for over 15 years.",
  image_url: "https://your-default-image-url.com/hero.png" 
};

export default function HeroManager() {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [heroId, setHeroId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    heading: "",
    subheading: "",
    image_url: "",
  });

  const handleHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const words = value.trim().split(/\s+/).filter(Boolean);

    if (words.length >= 4 && value.endsWith(" ")) {
      return;
    }

    if (words.length > 4) {
      const restrictedValue = words.slice(0, 4).join(" ");
      setForm({ ...form, heading: restrictedValue });
      toast.warning("Only 4 words allowed in heading!");
    } else {
      setForm({ ...form, heading: value });
    }
  };

  const fetchHeroData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Coaching_Hero")
      .select("*")
      .limit(1)
      .single();

    if (!error && data) {
      setHeroId(data.id);
      setForm({
        heading: data.heading || "",
        subheading: data.subheading || "",
        image_url: data.image_url || ""
      });
    } else {
      setHeroId(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHeroData();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `hero-${Date.now()}.${fileExt}`;
    const filePath = `hero/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('coaching_data')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast.error("Upload failed");
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from('coaching_data').getPublicUrl(filePath);
    setForm((prev) => ({ ...prev, image_url: urlData.publicUrl }));
    setUploading(false);
    toast.success("Image uploaded!");
  };

  const handleSave = async () => {
    setLoading(true);
    const finalHeading = form.heading.trim().split(/\s+/).slice(0, 4).join(" ");

    const payload = {
      heading: finalHeading || DEFAULT_HERO.heading,
      subheading: form.subheading.trim() || DEFAULT_HERO.subheading,
      image_url: form.image_url.trim() || DEFAULT_HERO.image_url,
      updated_at: new Date().toISOString()
    };

    let result;
    if (heroId) {
      result = await supabase.from("Coaching_Hero").update(payload).eq("id", heroId);
    } else {
      result = await supabase.from("Coaching_Hero").insert([payload]);
    }

    if (!result.error) {
      toast.success("Changes saved successfully!");
      fetchHeroData();
    } else {
      toast.error("Error: " + result.error.message);
    }
    setLoading(false);
  };

  const handleDeleteAll = async () => {
    if (!confirm("Are you sure? This will reset the section to default values.")) return;
    
    setLoading(true);
    if (heroId) {
      await supabase.from("Coaching_Hero").delete().eq("id", heroId);
    }
    
    setForm({ heading: "", subheading: "", image_url: "" });
    setHeroId(null);
    setLoading(false);
    toast.success("Section reset to default state");
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Hero Section Manager</h1>
          <p className="text-muted-foreground text-xs md:text-sm">Update content or reset to defaults.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="destructive" size="sm" onClick={handleDeleteAll} disabled={loading} className="flex-1 sm:flex-none">
  <Trash2 className="w-4 h-4 sm:mr-2" /> 
  {/* Option 1: Hamesha dikhane ke liye sirf <span>Reset</span> use karein */}
  <span className="inline">Reset</span> 
</Button>
            <Button variant="outline" size="icon" onClick={fetchHeroData} disabled={loading} className="h-9 w-9">
              <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Form Column */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="shadow-md border-primary/10">
            <CardHeader className="p-4 md:p-6 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                    <Layout className="w-5 h-5 text-primary" /> Content Manager
                </CardTitle>
                <CardDescription className="text-xs">Heading is limited to 4 words only.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Type className="w-4 h-4 text-primary" /> Heading
                  </label>
                  <span className="text-[10px] bg-muted px-2 py-0.5 rounded font-mono">
                    {form.heading.split(/\s+/).filter(Boolean).length}/4 Words
                  </span>
                </div>
                <Input 
                  value={form.heading} 
                  onChange={handleHeadingChange} 
                  placeholder={`Default: ${DEFAULT_HERO.heading}`}
                  className={`text-sm ${form.heading.split(/\s+/).filter(Boolean).length === 4 ? "border-blue-500 ring-1 ring-blue-500/20" : ""}`}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <AlignLeft className="w-4 h-4 text-primary" /> Subheading
                </label>
                <Textarea 
                  value={form.subheading} 
                  onChange={(e) => setForm({...form, subheading: e.target.value})} 
                  placeholder="Enter subheading..."
                  className="min-h-[100px] text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-primary" /> Image Source
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input 
                    value={form.image_url} 
                    onChange={(e) => setForm({...form, image_url: e.target.value})} 
                    placeholder="URL or Upload"
                    className="flex-1 text-sm"
                  />
                  <div className="flex gap-2">
                    <Button type="button" variant="secondary" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="flex-1 sm:flex-none">
                      {uploading ? <Loader2 className="animate-spin h-4 w-4" /> : <><Upload className="w-4 h-4 mr-2" /> Upload</>}
                    </Button>
                  </div>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                </div>
              </div>

              <div className="pt-2">
                <Button onClick={handleSave} disabled={loading} className="w-full h-11">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Column */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="lg:sticky lg:top-6 border-dashed border-2 shadow-none bg-muted/20">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Live Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="rounded-xl border overflow-hidden bg-background shadow-lg">
                <div className="relative aspect-video bg-muted flex items-center justify-center">
                  <img 
                    src={form.image_url || DEFAULT_HERO.image_url} 
                    alt="Preview" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-4 md:p-5 space-y-2 md:space-y-3">
                  <h3 className="text-base md:text-lg font-bold leading-tight line-clamp-2">
                    {form.heading || DEFAULT_HERO.heading}
                  </h3>
                  <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed">
                    {form.subheading || DEFAULT_HERO.subheading}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-center text-[10px] text-muted-foreground uppercase tracking-tight font-medium">
                {(!form.heading && !form.subheading) ? "Showing: Default System Content" : "Showing: Your Custom Content"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}