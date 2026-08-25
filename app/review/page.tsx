"use client";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { GreatAmericanLogo, NavigatorsLogo } from "@/components/CarrierLogos";
import { PolicyFields } from "@/components/PolicyField";
import { Check } from "lucide-react";
import { EnhancedCoverages } from "@/components/EnhancedCoverages";
import Link from "next/link";

/* ---------- Quote card ---------- */
function QuoteCard({
  logo,
  price,
  bullets,
  badge,
  selected,
  updated,
  onSelect,
  cta,
}: {
  logo: React.ReactNode;
  price: string;
  bullets: string[];
  badge?: string;
  selected?: boolean;
  updated?: boolean;
  onSelect: () => void;
  cta: string;
}) {
  return (
    <div
      className={`relative flex min-w-0 flex-col rounded-2xl bg-white p-8 shadow-card ring-1 transition ${
        selected ? "ring-2 ring-[#73C9B7]" : "ring-black/5"
      }`}
    >
      {badge && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-btis-navy shadow"
          style={{ backgroundColor: "rgb(249, 228, 123)" }}
        >
          {badge}
        </div>
      )}

      <div className="mb-8 flex h-24 items-end justify-center">{logo}</div>

      <div className="grid gap-5">
        <PolicyFields />
      </div>

      <div className="mt-6 text-[16px] font-medium text-[#212529]">
        15% Commission
      </div>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
        <div className="min-w-0 leading-none">
          <span className="text-[36px] font-bold text-btis-navy">{price}</span>
          <div className="mt-1 text-[13px] text-[#6C757D]">annually</div>
          {updated && (
            <div className="mt-2 text-[11px] font-medium text-[#3f8c66]">
              Updated based on enhanced coverage selections
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onSelect}
          className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-5 py-2 text-[14px] font-medium transition ${
            selected ? "bg-[#EAF6F2] text-[#3f8c66]" : "text-white"
          }`}
          style={
            selected
              ? undefined
              : { backgroundImage: "linear-gradient(180deg, #ADD797 0%, #73C9B7 100%)" }
          }
        >
          {selected && <Check className="h-4 w-4 shrink-0" strokeWidth={3} />}
          {cta}
        </button>
      </div>

      <div className="mt-6 h-px w-full bg-[#EAEAEA]" />

      <ul className="mt-4 space-y-2 text-[15px] text-btis-navy">
        {bullets.map((b, i) => (
          <li key={i} className={i === 0 ? "font-semibold" : ""}>
            · {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Main page ---------- */
export default function ReviewPage() {
  const [selectedCarrier, setSelectedCarrier] = useState<"GA" | "NAV" | null>(null);

  const [reratedPremium, setReratedPremium] = useState<string | null>(null);

  const gaSelected = selectedCarrier === "GA";
  const navSelected = selectedCarrier === "NAV";

  // The re-rated premium only describes the enhanced-coverage customization,
  // so it is shown while Great American is the selected quote. Deselecting
  // falls back to the base quote without discarding the agent's limit edits —
  // re-selecting brings the customized premium back.
  const showRerate = gaSelected && !!reratedPremium;
  const currentGAPrice = showRerate ? reratedPremium! : "$1075";

  return (
    <AppShell wide>
      <div className="grid gap-8">
        {/* Cards */}
        {/* auto-fit counts columns from each track's MAX, so the tracks stay 1fr
            and the cap lives on the grid instead — otherwise a definite max
            pins the layout to a single stretched column. */}
        <div className="mx-auto grid w-full min-w-0 max-w-[1152px] gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))]">
          <QuoteCard
            logo={<GreatAmericanLogo />}
            price={currentGAPrice}
            bullets={["Broader coverage options", "Admitted", "Agency Bill"]}
            badge="Enhanced Coverage"
            selected={gaSelected}
            updated={showRerate}
            onSelect={() => setSelectedCarrier(gaSelected ? null : "GA")}
            cta={gaSelected ? "Selected" : "Select & Review Coverage"}
          />
          <QuoteCard
            logo={<NavigatorsLogo />}
            price="$675"
            bullets={["BTIS Proprietary Carrier", "Admitted", "Agency Bill"]}
            selected={navSelected}
            onSelect={() => setSelectedCarrier(navSelected ? null : "NAV")}
            cta={navSelected ? "Selected" : "Select"}
          />
        </div>

        {/* Enhanced Coverages panel (only when GA selected) */}
        {gaSelected && (
          <section className="rounded-2xl bg-white p-8 shadow-card ring-1 ring-black/5">
            <EnhancedCoverages
              onRerate={(p) => setReratedPremium("$" + p)}
              onDiscard={() => setReratedPremium(null)}
            />
          </section>
        )}

      </div>

      <div className="mt-10 flex items-center justify-between">
        <Link href="/loss-payee" className="btn-back">
          back
        </Link>

        {navSelected && (
          <Link href="/sign-bind" className="btn-next">
            Continue with Navigators
          </Link>
        )}
        {gaSelected && reratedPremium && (
          <Link href="/sign-bind" className="btn-next">
            Continue with Great American
          </Link>
        )}
      </div>
    </AppShell>
  );
}
