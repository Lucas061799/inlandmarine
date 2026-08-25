"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Check } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { EnhancedCoverages } from "@/components/EnhancedCoverages";
import { CarrierLogo } from "@/components/CarrierLogos";
import { PolicyFields } from "@/components/PolicyField";
import { CoverageBadge } from "@/components/CoverageBadge";
import { CARRIER_QUOTES, type CarrierQuote } from "@/lib/quotes";

const MINT_GRADIENT = "linear-gradient(180deg, #ADD797 0%, #73C9B7 100%)";

/* ---------- Carrier row ---------- */
function CarrierRow({
  quote,
  premium,
  selected,
  open,
  onToggle,
  onSelect,
  detail,
}: {
  quote: CarrierQuote;
  premium: number;
  selected: boolean;
  open: boolean;
  onToggle: () => void;
  onSelect: () => void;
  /** Extra content revealed with the row — the enhanced coverage limits. */
  detail?: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl bg-white transition ${
        selected
          ? "ring-2 ring-[#73C9B7] shadow-card"
          : "ring-1 ring-[#EAEAEA] hover:ring-[#c9e8df]"
      }`}
    >
      {/* Header: carrier + badges + expand toggle */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 pt-5 text-left"
      >
        <div className="flex min-w-0 items-center gap-3">
          <span className="text-[18px] font-semibold text-btis-navy">
            {quote.name}
          </span>
          {quote.badge && <CoverageBadge label={quote.badge} />}
        </div>
        {open ? (
          <ChevronDown className="h-5 w-5 shrink-0 text-btis-navy" />
        ) : (
          <ChevronRight className="h-5 w-5 shrink-0 text-btis-navy" />
        )}
      </button>

      {/* Price + select */}
      <div className="flex items-end justify-between gap-6 px-6 pb-5 pt-3">
        <div className="min-w-0 leading-none">
          <span className="text-[32px] font-bold text-btis-navy">
            ${premium.toLocaleString()}
          </span>
          <span className="ml-1 text-[15px] text-[#6C757D]">/yr</span>
          <div className="mt-1.5 text-[13px] text-[#6C757D]">
            {quote.commission}
          </div>
        </div>
        <button
          type="button"
          onClick={onSelect}
          className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-5 py-2 text-[14px] font-medium transition ${
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

      {/* Expanded detail */}
      {open && (
        <div className="border-t border-[#EAEAEA] px-6 py-5">
          <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
            <PolicyFields size="sm" />
          </div>

          <div className="mt-6 flex items-start justify-between gap-6">
            <ul className="space-y-2 text-[15px] text-btis-navy">
              {quote.bullets.map((b, i) => (
                <li key={b} className={i === 0 ? "font-semibold" : ""}>
                  · {b}
                </li>
              ))}
            </ul>
            <CarrierLogo id={quote.id} className="h-auto w-28 shrink-0" />
          </div>

          {detail && (
            <div className="mt-6 border-t border-[#EAEAEA] pt-6">{detail}</div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------- Main page ---------- */
export default function ReviewOptionTwoPage() {
  const [selected, setSelected] = useState<CarrierQuote["id"] | null>(null);
  const [openRow, setOpenRow] = useState<CarrierQuote["id"] | null>(null);
  const [gaRerated, setGaRerated] = useState<number | null>(null);

  // Great American's premium follows the enhanced-coverage limits once the
  // agent re-rates; every other quote is fixed.
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
              detail={
                q.id === "GA" ? (
                  <EnhancedCoverages
                    heading={null}
                    basePremium={q.premium}
                    onRerate={setGaRerated}
                    onDiscard={() => setGaRerated(null)}
                  />
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

        {/* Plain "Continue" here on purpose — the other options name the
            carrier, so the two treatments can be compared side by side. */}
        {selectedQuote && (
          <Link href="/sign-bind" className="btn-next">
            Continue
          </Link>
        )}
      </div>
    </AppShell>
  );
}
