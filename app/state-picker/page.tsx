import { AppShell } from "@/components/AppShell";
import { US_STATES } from "@/lib/states";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function StatePickerPage() {
  return (
    <AppShell title="State">
      <div className="mx-auto max-w-xs">
        <div className="field relative">
          <label>State</label>
          <input type="text" defaultValue="" />
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
        </div>

        <div className="mt-1 max-h-72 overflow-auto rounded-md border border-ink-faint/60 bg-white shadow-soft">
          {US_STATES.map((s) => (
            <button
              key={s}
              className="block w-full px-4 py-1.5 text-left text-[13px] text-ink-soft hover:bg-brand-100/60 hover:text-ink"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-start">
        <Link href="/" className="btn-back">
          back
        </Link>
      </div>
    </AppShell>
  );
}
