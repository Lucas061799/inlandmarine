"use client";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Combobox } from "@/components/Combobox";
import { ChevronDown, ChevronRight, Check } from "lucide-react";
import { ENHANCED_COVERAGE_GROUPS } from "@/lib/coverages";
import Link from "next/link";

/* ---------- Carrier logos (use PNG assets) ---------- */
function GreatAmericanLogo() {
  return (
    <img
      src="/great-american.png"
      alt="Great American Insurance Group"
      width={220}
      height={107}
      className="h-auto w-48 select-none"
    />
  );
}
function NavigatorsLogo() {
  return (
    <img
      src="/navigators.png"
      alt="Navigators"
      width={220}
      height={84}
      className="h-auto w-48 select-none"
    />
  );
}

/* ---------- Simple styled dropdown (visual only) ---------- */
function LimitDropdown({ label, value }: { label: string; value: string }) {
  return (
    <div className="field relative">
      <label>{label}</label>
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-[14px] border border-[#EAEAEA] bg-white text-left text-[18px] text-[#212529]"
        style={{ padding: "0.85rem 1.1rem", fontFamily: "Montserrat, sans-serif" }}
      >
        <span>{value}</span>
        <ChevronDown className="h-4 w-4 text-ink-soft" />
      </button>
    </div>
  );
}

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
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] font-semibold text-white shadow"
          style={{
            backgroundImage: "linear-gradient(180deg, #ADD797 0%, #73C9B7 100%)",
          }}
        >
          {badge}
        </div>
      )}

      <div className="mb-8 flex h-16 items-end justify-center">{logo}</div>

      <div className="grid gap-5">
        <LimitDropdown label="Limits" value="$1M/$2M/$2M" />
        <LimitDropdown label="Deductible" value="$1,500" />
      </div>

      <div className="mt-6 text-[16px] font-medium text-[#212529]">
        15% Commission
      </div>

      <div className="mt-3 flex items-end justify-between gap-4">
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

/* ---------- Accordion header ---------- */
function AccordionHeader({
  open,
  title,
  badge,
  onToggle,
}: {
  open: boolean;
  title: string;
  badge: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between px-5 py-4 text-left"
    >
      <div className="flex items-center gap-3">
        <span className="text-[17px] font-semibold text-btis-navy">{title}</span>
        <span
          className="rounded-full px-2.5 py-0.5 text-[12px] font-medium text-[#3f8c66]"
          style={{ backgroundColor: "rgba(115, 201, 183, 0.16)" }}
        >
          {badge}
        </span>
      </div>
      {open ? (
        <ChevronDown className="h-5 w-5 text-btis-navy" />
      ) : (
        <ChevronRight className="h-5 w-5 text-btis-navy" />
      )}
    </button>
  );
}

/* ---------- Coverage limit dropdown ---------- */
function CoverageDropdown({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <Combobox
      options={options}
      value={value}
      onChange={onChange}
      searchable={false}
    />
  );
}

/* ---------- Main page ---------- */
export default function ReviewPage() {
  const [selectedCarrier, setSelectedCarrier] = useState<"GA" | "NAV" | null>(null);

  // Selected limit for every enhanced coverage, seeded from the real defaults
  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    ENHANCED_COVERAGE_GROUPS.forEach((g) =>
      g.items.forEach((i) => (init[i.id] = i.defaultValue)),
    );
    return init;
  });
  const [initialValues] = useState(values);

  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    equipment: false,
    "rental-expenses": false,
    "property-protection": false,
    "additional-coverage": false,
  });

  const [reratedPremium, setReratedPremium] = useState<string | null>(null);
  const [rerating, setRerating] = useState(false);

  const dirty = useMemo(
    () => Object.keys(values).some((k) => values[k] !== initialValues[k]),
    [values, initialValues],
  );

  const gaSelected = selectedCarrier === "GA";
  const navSelected = selectedCarrier === "NAV";

  // The re-rated premium only describes the enhanced-coverage customization,
  // so it is shown while Great American is the selected quote. Deselecting
  // falls back to the base quote without discarding the agent's limit edits —
  // re-selecting brings the customized premium back.
  const showRerate = gaSelected && !!reratedPremium;
  const currentGAPrice = showRerate ? reratedPremium! : "$1075";

  function handleReRate() {
    setRerating(true);
    setTimeout(() => {
      // Fake re-rate: bump premium a bit based on # of edits
      const delta =
        Object.keys(values).filter((k) => values[k] !== initialValues[k]).length * 18;
      setReratedPremium("$" + (1075 + delta));
      setRerating(false);
    }, 800);
  }

  function reset() {
    setValues(initialValues);
    setReratedPremium(null);
  }

  return (
    <AppShell wide>
      <div className="grid gap-8">
        {/* Cards */}
        <div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(400px,1fr))]">
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
            <div className="flex items-start justify-between gap-4 border-b border-[#EAEAEA] pb-5">
              <h2 className="text-[22px] font-semibold text-btis-navy">
                Great American Enhanced Coverages
              </h2>
              {dirty && (
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[13px] font-medium text-[#8a5a1f]"
                  style={{ backgroundColor: "rgba(240, 160, 64, 0.14)" }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: "#F0A040" }}
                  />
                  Unsaved changes
                </span>
              )}
            </div>

            <p className="mt-5 text-[14px] text-[#6C757D]">
              Review and customize your coverage limits. Changes require re-rating.
            </p>

            {/* Coverage groups */}
            <div className="mt-5 space-y-4">
              {ENHANCED_COVERAGE_GROUPS.map((g) => {
                const isOpen = expanded[g.id];
                return (
                  <div key={g.id} className="rounded-xl border border-[#EAEAEA]">
                    <AccordionHeader
                      open={isOpen}
                      title={g.title}
                      badge={`${g.items.length} included`}
                      onToggle={() =>
                        setExpanded((prev) => ({ ...prev, [g.id]: !prev[g.id] }))
                      }
                    />
                    {isOpen && (
                      <div className="grid gap-6 border-t border-[#EAEAEA] px-5 py-6 sm:grid-cols-2">
                        {g.items.map((it) => (
                          <div key={it.id} className="flex flex-col">
                            <div className="text-[14px] font-medium text-[#212529]">
                              {it.label}
                            </div>
                            <div className="mt-1 min-h-[16px] text-[11px] italic text-[#6C757D]">
                              {it.sublabel ?? " "}
                            </div>
                            <div className="mt-auto pt-2">
                              <CoverageDropdown
                                value={values[it.id]}
                                options={it.options}
                                onChange={(v) =>
                                  setValues((prev) => ({ ...prev, [it.id]: v }))
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/*
                Optional Forms (Existing Fire Exclusion, Locked Vehicle –
                Restricted Theft Coverage Endorsement, Crane Exclusion) are
                intentionally NOT shown in the UI:
                  – Locked Vehicle is auto-included for Great American quotes
                    silently on the backend
                  – Fire Exclusion and Crane Exclusion are never applied by
                    default
                Agents do not need to make this selection.
              */}
            </div>

            {/* Panel footer */}
            <div className="mt-8 flex items-center justify-between border-t border-[#EAEAEA] pt-6">
              <button
                type="button"
                onClick={reset}
                disabled={!dirty && !reratedPremium}
                className="inline-flex items-center justify-center rounded-[12px] bg-white text-[#212529] transition hover:bg-[#F5F5F5] disabled:opacity-40"
                style={{
                  fontSize: "17px",
                  fontWeight: 500,
                  padding: "8px 20px",
                  boxShadow: "0 5px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                Discard changes
              </button>

              <button
                type="button"
                onClick={handleReRate}
                disabled={!dirty || rerating}
                className="inline-flex items-center justify-center rounded-[12px] text-white transition disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  fontSize: "17px",
                  fontWeight: 500,
                  padding: "8px 20px",
                  backgroundImage: "linear-gradient(180deg, #ADD797 0%, #73C9B7 100%)",
                  boxShadow: "0 5px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                {rerating ? "Updating…" : "Update & Re-rate"}
              </button>
            </div>
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
