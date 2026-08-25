"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { EnhancedCoverages } from "@/components/EnhancedCoverages";
import { PolicyFields } from "@/components/PolicyField";
import { CARRIER_QUOTES, type CarrierQuote } from "@/lib/quotes";

/* ---------- Radio ----------
   The row is the control, so this only ever reflects state. */
function Radio({ checked }: { checked: boolean }) {
  return (
    <span
      className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition"
      style={{
        borderColor: checked ? "#73C9B7" : "#c9cdd4",
        borderWidth: checked ? 5 : 1.5,
      }}
    />
  );
}

/* ---------- Carrier row ----------
   No card, no shadow, no pills — a hairline between quotes and type doing the
   ranking. Selecting is the row itself, so there is no separate button. */
function CarrierRow({
  quote,
  premium,
  meta,
  selected,
  onSelect,
  children,
}: {
  quote: CarrierQuote;
  premium: number;
  meta: string;
  selected: boolean;
  onSelect: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="border-t border-[#EAEAEA]">
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className="flex w-full items-start gap-4 py-6 text-left transition"
      >
        <Radio checked={selected} />

        <div className="flex min-w-0 flex-1 items-start justify-between gap-6">
          <div className="min-w-0">
            <div
              className={`text-[20px] text-btis-navy ${
                selected ? "font-semibold" : "font-medium"
              }`}
            >
              {quote.name}
            </div>
            <div className="mt-1 text-[13px] text-[#6C757D]">{meta}</div>
          </div>

          <div className="shrink-0 text-right leading-none">
            <div>
              <span className="text-[26px] font-semibold text-btis-navy">
                ${premium.toLocaleString()}
              </span>
              <span className="ml-1 text-[14px] text-[#6C757D]">/yr</span>
            </div>
            <div className="mt-1.5 text-[13px] text-[#6C757D]">
              {quote.commission}
            </div>
          </div>
        </div>
      </button>

      {children}
    </div>
  );
}

/* ---------- Main page ---------- */
export default function ReviewOptionFourPage() {
  const [selected, setSelected] = useState<CarrierQuote["id"] | null>(null);
  const [openDetail, setOpenDetail] = useState<CarrierQuote["id"] | null>(null);
  const [gaRerated, setGaRerated] = useState<number | null>(null);

  const premiumOf = (q: CarrierQuote) =>
    q.id === "GA" && gaRerated !== null ? gaRerated : q.premium;

  const sorted = [...CARRIER_QUOTES].sort((a, b) => premiumOf(a) - premiumOf(b));
  const lowestId = sorted[0].id;
  const selectedQuote = CARRIER_QUOTES.find((q) => q.id === selected);

  // Sorted by premium already, so "lowest" only needs a word, not a badge.
  const metaFor = (q: CarrierQuote) =>
    [q.id === lowestId ? "Lowest premium" : null, ...q.bullets]
      .filter(Boolean)
      .join(" · ");

  return (
    <AppShell wide>
      <section>
        <h2 className="text-[22px] font-semibold text-btis-navy">
          Select Carrier
        </h2>
        <p className="mt-1 text-[14px] text-[#6C757D]">
          Sorted by annual premium.
        </p>

        <div className="mt-6 border-b border-[#EAEAEA]">
          {sorted.map((q) => (
            <CarrierRow
              key={q.id}
              quote={q}
              premium={premiumOf(q)}
              meta={metaFor(q)}
              selected={selected === q.id}
              onSelect={() =>
                setSelected((prev) => (prev === q.id ? null : q.id))
              }
            >
              {(() => {
                const open = openDetail === q.id;
                const hasEnhanced = q.id === "GA";
                return (
                  <div className="pb-6">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDetail((prev) => (prev === q.id ? null : q.id))
                      }
                      aria-expanded={open}
                      className="-ml-1 inline-flex items-center gap-1 rounded px-1 text-[14px] font-medium text-[#3f8c66] transition hover:text-btis-navy"
                    >
                      {open ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                      {open ? "Hide" : "Adjust"} limits
                      {hasEnhanced && " and enhanced coverage"}
                    </button>

                    {open && (
                      <div className="mt-5 pl-9">
                        <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
                          <PolicyFields size="sm" />
                        </div>
                        {hasEnhanced && (
                          <div className="mt-6">
                            <EnhancedCoverages
                              heading={null}
                              subtitle={null}
                              basePremium={q.premium}
                              onRerate={setGaRerated}
                              onDiscard={() => setGaRerated(null)}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })()}
            </CarrierRow>
          ))}
        </div>
      </section>

      <div className="mt-10 flex items-center justify-between">
        <Link href="/loss-payee" className="btn-back">
          back
        </Link>

        {selectedQuote && (
          <Link href="/sign-bind" className="btn-next">
            Continue with {selectedQuote.name}
          </Link>
        )}
      </div>
    </AppShell>
  );
}
