"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Check } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { EnhancedCoverages } from "@/components/EnhancedCoverages";

/* ---------- Carrier logos (use PNG assets) ---------- */
function GreatAmericanLogo() {
  return (
    <img
      src="/great-american.png"
      alt="Great American Insurance Group"
      width={220}
      height={107}
      className="h-auto w-28 select-none"
    />
  );
}
function NavigatorsLogo() {
  return (
    <img
      src="/rivet.png"
      alt="Rivet by Navigators"
      width={474}
      height={181}
      className="h-auto w-28 select-none"
    />
  );
}

/* ---------- Quotes ----------
   Same two carriers and the same numbers the card layout uses; this page is
   only an alternative presentation of the carrier choice. */
type Quote = {
  id: "GA" | "NAV";
  name: string;
  logo: React.ReactNode;
  premium: number;
  commission: string;
  badge?: string;
  bullets: string[];
};

const QUOTES: Quote[] = [
  {
    id: "GA",
    name: "Great American",
    logo: <GreatAmericanLogo />,
    premium: 1075,
    commission: "15% Commission",
    badge: "Enhanced Coverage",
    bullets: ["Broader coverage options", "Admitted", "Agency Bill"],
  },
  {
    id: "NAV",
    name: "Navigators",
    logo: <NavigatorsLogo />,
    premium: 675,
    commission: "15% Commission",
    bullets: ["BTIS Proprietary Carrier", "Admitted", "Agency Bill"],
  },
];

const MINT_GRADIENT = "linear-gradient(180deg, #ADD797 0%, #73C9B7 100%)";

/* ---------- Badge ---------- */
function Badge({ label, tone }: { label: string; tone: "mint" | "yellow" }) {
  if (tone === "yellow") {
    // Matches the "Enhanced Coverage" flag on the card layout.
    return (
      <span
        className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-btis-navy"
        style={{ backgroundColor: "rgb(249, 228, 123)" }}
      >
        {label}
      </span>
    );
  }
  return (
    <span
      className="rounded-full px-2.5 py-0.5 text-[12px] font-semibold text-white"
      style={{ backgroundImage: MINT_GRADIENT }}
    >
      {label}
    </span>
  );
}

/* ---------- Carrier row ---------- */
function CarrierRow({
  quote,
  premium,
  lowest,
  selected,
  open,
  onToggle,
  onSelect,
  detail,
}: {
  quote: Quote;
  premium: number;
  lowest: boolean;
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
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: "#73C9B7" }}
          />
          <span className="text-[18px] font-semibold text-btis-navy">
            {quote.name}
          </span>
          {lowest && <Badge label="Lowest Premium" tone="mint" />}
          {quote.badge && <Badge label={quote.badge} tone="yellow" />}
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
          <div className="flex items-start justify-between gap-6">
            <ul className="space-y-2 text-[15px] text-btis-navy">
              {quote.bullets.map((b, i) => (
                <li key={b} className={i === 0 ? "font-semibold" : ""}>
                  · {b}
                </li>
              ))}
            </ul>
            <div className="shrink-0">{quote.logo}</div>
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
  const [selected, setSelected] = useState<Quote["id"] | null>(null);
  const [openRow, setOpenRow] = useState<Quote["id"] | null>(null);
  const [gaRerated, setGaRerated] = useState<number | null>(null);

  // Great American's premium follows the enhanced-coverage limits once the
  // agent re-rates; every other quote is fixed.
  const premiumOf = (q: Quote) =>
    q.id === "GA" && gaRerated !== null ? gaRerated : q.premium;

  const sorted = [...QUOTES].sort((a, b) => premiumOf(a) - premiumOf(b));
  const lowestId = sorted[0].id;
  const selectedQuote = QUOTES.find((q) => q.id === selected);

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
              lowest={q.id === lowestId}
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

        {selectedQuote && (
          <Link href="/sign-bind" className="btn-next">
            Continue with {selectedQuote.name}
          </Link>
        )}
      </div>
    </AppShell>
  );
}
