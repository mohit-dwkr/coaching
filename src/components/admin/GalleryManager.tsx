import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import { getGallery, setGallery, type GalleryImage } from "@/lib/data";

export default function GalleryManager() {
  const [gallery, setGalleryState] = useState(getGallery);
  const [form, setForm] = useState({ url: "", caption: "" });

  const save = (next: GalleryImage[]) => {
    setGallery(next);
    setGalleryState(next);
  };

  const add = () => {
    if (!form.url) return;
    save([...gallery, { id: Date.now().toString(), ...form }]);
    setForm({ url: "", caption: "" });
  };

  const remove = (id: string) => save(gallery.filter((g) => g.id !== id));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Gallery Manager</h2>

      <div className="flex gap-3 mb-6 flex-wrap">
        <Input className="flex-1 min-w-[200px]" placeholder="Image URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
        <Input className="flex-1 min-w-[200px]" placeholder="Caption" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} />
        <Button onClick={add}>
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {gallery.map((g) => (
          <div key={g.id} className="relative group rounded-xl overflow-hidden border border-border">
            <img src={g.url} alt={g.caption} className="w-full aspect-video object-cover" />
            <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button size="icon" variant="destructive" onClick={() => remove(g.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            {g.caption && (
              <p className="text-xs text-muted-foreground p-2 truncate">{g.caption}</p>
            )}
          </div>
        ))}
      </div>

      {gallery.length === 0 && (
        <p className="text-center text-muted-foreground py-12">No gallery images yet. Add image URLs above.</p>
      )}
    </div>
  );
}
