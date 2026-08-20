import { AppShell } from "@/components/AppShell";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
// Simulate Jan 2020: Wed=1
const GRID = [
  [30, 31, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 31, 1, 2],
];

export default function CalendarPage() {
  return (
    <AppShell title="Effective date">
      <div className="mx-auto max-w-md rounded-2xl bg-white shadow-card ring-1 ring-ink-faint/40">
        <div className="flex items-center justify-between rounded-t-2xl bg-brand-200/70 px-4 py-3 text-[15px] text-btis-navy">
          <ChevronLeft className="h-4 w-4" />
          January 2020
          <ChevronRight className="h-4 w-4" />
        </div>
        <div className="grid grid-cols-7 gap-y-2 p-4 text-center text-[13px] text-ink-soft">
          {DAYS.map((d, i) => (
            <div key={i} className="pb-2 font-medium text-ink">{d}</div>
          ))}
          {GRID.map((row, ri) =>
            row.map((d, di) => {
              const isMuted =
                (ri === 0 && d > 15) || (ri === GRID.length - 1 && d < 15);
              return (
                <div
                  key={`${ri}-${di}`}
                  className={`aspect-square grid place-items-center rounded-md ${
                    isMuted ? "text-ink-faint" : "hover:bg-brand-100 cursor-pointer"
                  }`}
                >
                  {d}
                </div>
              );
            }),
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-start">
        <Link href="/review" className="btn-back">
          back
        </Link>
      </div>
    </AppShell>
  );
}
