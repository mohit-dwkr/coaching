import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import { getToppers, setToppers, type Topper } from "@/lib/data";

export default function TopperManager() {
  const [toppers, setToppersState] = useState(getToppers);
  const [form, setForm] = useState({ name: "", marks: "", year: "" });

  const save = (next: Topper[]) => {
    setToppers(next);
    setToppersState(next);
  };

  const add = () => {
    if (!form.name) return;
    save([...toppers, { id: Date.now().toString(), ...form }]);
    setForm({ name: "", marks: "", year: "" });
  };

  const remove = (id: string) => save(toppers.filter((t) => t.id !== id));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Topper Manager</h2>

      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        <Input placeholder="Student Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input placeholder="Marks (e.g. 98.6%)" value={form.marks} onChange={(e) => setForm({ ...form, marks: e.target.value })} />
        <Input placeholder="Year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
      </div>
      <Button onClick={add} className="mb-8">
        <Plus className="h-4 w-4 mr-1" /> Add Topper
      </Button>

      <div className="space-y-3">
        {toppers.map((t) => (
          <div key={t.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border">
            <div className="text-sm">
              <span className="font-semibold">{t.name}</span>
              <span className="mx-2 text-muted-foreground">|</span>
              <span className="text-primary font-bold">{t.marks}</span>
              <span className="mx-2 text-muted-foreground">|</span>
              <span className="text-muted-foreground">{t.year}</span>
            </div>
            <Button size="icon" variant="ghost" onClick={() => remove(t.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
