import { useState } from "react";
import { getInquiries } from "@/lib/data";
import { Mail, Phone, Calendar } from "lucide-react";

export default function InquiryInbox() {
  const [inquiries] = useState(getInquiries);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Inquiry Inbox</h2>

      {inquiries.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">No inquiries yet. They'll show up here when visitors submit the contact form.</p>
      ) : (
        <div className="space-y-4">
          {inquiries.map((q) => (
            <div key={q.id} className="p-5 bg-card border border-border rounded-xl">
              <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground text-base">{q.name}</span>
                {q.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" /> {q.email}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" /> {q.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> {q.date}
                </span>
              </div>
              {q.message && <p className="text-sm text-foreground/80">{q.message}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
