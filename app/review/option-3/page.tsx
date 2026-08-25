"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Check } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { EnhancedCoverages } from "@/components/EnhancedCoverages";
import { PolicyFields } from "@/components/PolicyField";
import { CoverageBadge } from "@/components/CoverageBadge";
import { CARRIER_QUOTES, type CarrierQuote } from "@/lib/quotes";

const MINT_GRADIENT = "linear-gradient(180deg, #ADD797 0%, #73C9B7 100%)";

/* ---------- Carrier row ----------
   Identity, both limit controls, commission, premium, the select action and
   the selling points are all always visible. Only the enhanced coverage
   limits collapse, since they are long. */
function CarrierRow({
  quote,
  premium,
  selected,
  open,
  onToggle,
  onSelect,
  enhanced,
}: {
  quote: CarrierQuote;
  premium: number;
  selected: boolean;
  open: boolean;
  onToggle: () => void;
  onSelect: () => void;
  enhanced?: React.ReactNode;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl bg-white transition ${
        selected
          ? "shadow-card ring-2 ring-[#73C9B7]"
          : "ring-1 ring-[#EAEAEA] hover:ring-[#c9e8df]"
      }`}
    >
      <div className="flex items-start justify-between gap-4 px-6 pt-5">
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <span className="text-[18px] font-semibold text-btis-navy">
            {quote.name}
          </span>
          {quote.badge && <CoverageBadge label={quote.badge} />}
        </div>

        {enhanced && (
            <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            className="flex shrink-0 items-center gap-2 text-[13px] text-[#6C757D] transition hover:text-btis-navy"
          >
            {open ? "Hide" : "View"} enhanced coverage
            {open ? (
              <ChevronDown className="h-5 w-5 text-btis-navy" />
            ) : (
              <ChevronRight className="h-5 w-5 text-btis-navy" />
            )}
          </button>
        )}
      </div>

      {/* Two zones: what the agent can change on the left, what it costs and
          the action it leads to on the right. */}
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 px-6 pb-5 pt-4">
        <div className="flex flex-wrap items-end gap-x-4 gap-y-4">
          <PolicyFields size="sm" />
        </div>

        <div className="ml-auto flex items-end gap-6">
          <div className="text-right leading-none">
            <div>
              <span className="text-[28px] font-bold text-btis-navy">
                ${premium.toLocaleString()}
              </span>
              <span className="ml-1 text-[14px] text-[#6C757D]">/yr</span>
            </div>
            <div className="mt-1.5 text-[13px] text-[#6C757D]">
              {quote.commission}
            </div>
          </div>

          <button
            type="button"
            onClick={onSelect}
            className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-5 py-2.5 text-[14px] font-medium transition ${
              selected
                ? "text-white"
                : "border border-[#73C9B7] bg-white text-[#3f8c66] hover:bg-[#EAF6F2]"
            }`}
            style={selected ? { backgroundImage: MINT_GRADIENT } : undefined}
          >
            {selected && <Check className="h-4 w-4 shrink-0" strokeWidth={3} />}
            {selected ? "Selected" : "Select"}
          </button>
        </div>
      </div>

      <div className="border-t border-[#EAEAEA] px-6 py-5">
        <ul className="flex flex-wrap gap-x-8 gap-y-2 text-[15px] text-btis-navy">
          {quote.bullets.map((b, i) => (
            <li key={b} className={i === 0 ? "font-semibold" : ""}>
              · {b}
            </li>
          ))}
        </ul>

        {open && enhanced && <div className="mt-6">{enhanced}</div>}
      </div>
    </div>
  );
}

/* ---------- Main page ---------- */
export default function ReviewOptionThreePage() {
  const [selected, setSelected] = useState<CarrierQuote["id"] | null>(null);
  const [openRow, setOpenRow] = useState<CarrierQuote["id"] | null>(null);
  const [gaRerated, setGaRerated] = useState<number | null>(null);

  const premiumOf = (q: CarrierQuote) =>
    q.id === "GA" && gaRerated !== null ? gaRerated : q.premium;

  const sorted = [...CARRIER_QUOTES].sort((a, b) => premiumOf(a) - premiumOf(b));
  const selectedQuote = CARRIER_QUOTES.find((q) => q.id === selected);

  return (
    <AppShell wide>
      <section>
        <div className="border-b border-[#EAEAEA] pb-5">
          <h2 className="text-[22px] font-semibold text-btis-navy">
            Select Carrier
          </h2>
        </div>

        <p className="mt-5 text-[14px] text-[#6C757D]">
          Sorted by annual premium.
        </p>

        <div className="mt-5 space-y-4">
          {sorted.map((q) => (
            <CarrierRow
              key={q.id}
              quote={q}
              premium={premiumOf(q)}
              selected={selected === q.id}
              open={openRow === q.id}
              onToggle={() => setOpenRow((prev) => (prev === q.id ? null : q.id))}
              onSelect={() =>
                setSelected((prev) => (prev === q.id ? null : q.id))
              }
              enhanced={
                q.id === "GA" ? (
                  <>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-[17px] font-semibold text-btis-navy">
                        Enhanced Coverage
                      </h3>
                      <span className="text-[13px] text-[#6C757D]">
                        changes require re-rating
                      </span>
                    </div>
                    <div className="mt-4">
                      <EnhancedCoverages
                        heading={null}
                        subtitle={null}
                        basePremium={q.premium}
                        onRerate={setGaRerated}
                        onDiscard={() => setGaRerated(null)}
                      />
                    </div>
                  </>
                ) : undefined
              }
            />
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
