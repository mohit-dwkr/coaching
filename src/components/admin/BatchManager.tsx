import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import { getBatches, setBatches, type Batch } from "@/lib/data";

export default function BatchManager() {
  const [batches, setBatchState] = useState(getBatches);
  const [form, setForm] = useState({ className: "", subjects: "", timing: "", fees: "" });

  const save = (next: Batch[]) => {
    setBatches(next);
    setBatchState(next);
  };

  const add = () => {
    if (!form.className) return;
    const b: Batch = {
      id: Date.now().toString(),
      className: form.className,
      subjects: form.subjects.split(",").map((s) => s.trim()).filter(Boolean),
      timing: form.timing,
      fees: Number(form.fees) || 0,
    };
    save([...batches, b]);
    setForm({ className: "", subjects: "", timing: "", fees: "" });
  };

  const remove = (id: string) => save(batches.filter((b) => b.id !== id));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Batch Manager</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Input placeholder="Class (e.g. 10th)" value={form.className} onChange={(e) => setForm({ ...form, className: e.target.value })} />
        <Input placeholder="Subjects (comma separated)" value={form.subjects} onChange={(e) => setForm({ ...form, subjects: e.target.value })} />
        <Input placeholder="Timing" value={form.timing} onChange={(e) => setForm({ ...form, timing: e.target.value })} />
        <Input placeholder="Fees (₹)" type="number" value={form.fees} onChange={(e) => setForm({ ...form, fees: e.target.value })} />
      </div>
      <Button onClick={add} className="mb-8">
        <Plus className="h-4 w-4 mr-1" /> Add Batch
      </Button>

      <div className="space-y-3">
        {batches.map((b) => (
          <div key={b.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border">
            <div>
              <span className="font-semibold">Class {b.className}</span>
              <span className="mx-2 text-muted-foreground">|</span>
              <span className="text-sm text-muted-foreground">{b.subjects.join(", ")}</span>
              <span className="mx-2 text-muted-foreground">|</span>
              <span className="text-sm">{b.timing}</span>
              <span className="mx-2 text-muted-foreground">|</span>
              <span className="text-sm font-medium">₹{b.fees}</span>
            </div>
            <Button size="icon" variant="ghost" onClick={() => remove(b.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
