import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import { getMaterials, setMaterials, type StudyMaterial } from "@/lib/data";

export default function StudyMaterialManager() {
  const [materials, setMatState] = useState(getMaterials);
  const [form, setForm] = useState({ title: "", className: "", subject: "", pdfUrl: "" });

  const save = (next: StudyMaterial[]) => {
    setMaterials(next);
    setMatState(next);
  };

  const add = () => {
    if (!form.title || !form.className) return;
    save([...materials, { id: Date.now().toString(), ...form }]);
    setForm({ title: "", className: "", subject: "", pdfUrl: "" });
  };

  const remove = (id: string) => save(materials.filter((m) => m.id !== id));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Study Material Manager</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <Input placeholder="Class (e.g. 10th)" value={form.className} onChange={(e) => setForm({ ...form, className: e.target.value })} />
        <Input placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
        <Input placeholder="PDF URL" value={form.pdfUrl} onChange={(e) => setForm({ ...form, pdfUrl: e.target.value })} />
      </div>
      <Button onClick={add} className="mb-8">
        <Plus className="h-4 w-4 mr-1" /> Add Material
      </Button>

      <div className="space-y-3">
        {materials.map((m) => (
          <div key={m.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border">
            <div className="text-sm">
              <span className="font-semibold">{m.title}</span>
              <span className="mx-2 text-muted-foreground">|</span>
              <span className="text-muted-foreground">Class {m.className} · {m.subject}</span>
            </div>
            <Button size="icon" variant="ghost" onClick={() => remove(m.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
