"use client";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Combobox } from "@/components/Combobox";
import { ChevronDown, ChevronRight, Check } from "lucide-react";
import { INCLUDED_COVERAGES, OPTIONAL_ADDONS } from "@/lib/coverages";
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
      className={`relative flex flex-col rounded-2xl bg-white p-8 shadow-card ring-1 transition ${
        selected ? "ring-2 ring-[#73C9B7]" : "ring-black/5"
      }`}
      style={{ minWidth: "300px" }}
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

      <div className="mt-3 flex items-end justify-between">
        <div className="leading-none">
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
          className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-[14px] font-medium transition ${
            selected ? "bg-[#EAF6F2] text-[#3f8c66]" : "text-white"
          }`}
          style={
            selected
              ? undefined
              : { backgroundImage: "linear-gradient(180deg, #ADD797 0%, #73C9B7 100%)" }
          }
        >
          {selected && <Check className="h-4 w-4" strokeWidth={3} />}
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
  badgeTone = "muted",
  onToggle,
}: {
  open: boolean;
  title: string;
  badge: string;
  badgeTone?: "muted" | "brand";
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
          className={`rounded-full px-2.5 py-0.5 text-[12px] font-medium ${
            badgeTone === "brand"
              ? "text-[#3f8c66]"
              : "text-[#6C757D]"
          }`}
          style={{
            backgroundColor:
              badgeTone === "brand" ? "rgba(115, 201, 183, 0.16)" : "#F1F1F1",
          }}
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

/* ---------- Toggle switch ---------- */
function Toggle({
  checked,
  onChange,
  ariaLabel,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className="relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors"
      style={{ backgroundColor: checked ? "#73C9B7" : "#DCDCDC" }}
    >
      <span
        className="inline-block h-6 w-6 rounded-full bg-white shadow-md transition"
        style={{
          transform: checked ? "translateX(21px)" : "translateX(2px)",
          marginTop: "2px",
        }}
      />
    </button>
  );
}

/* ---------- Main page ---------- */
export default function ReviewPage() {
  const [selectedCarrier, setSelectedCarrier] = useState<"GA" | "NAV" | null>(null);

  // Optional add-on toggle state (all off by default)
  const [addOns, setAddOns] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(OPTIONAL_ADDONS.map((a) => [a.id, false])),
  );
  const [initialAddOns] = useState(addOns);

  const [includedOpen, setIncludedOpen] = useState(false);
  const [addOnsOpen, setAddOnsOpen] = useState(true);

  const [reratedPremium, setReratedPremium] = useState<string | null>(null);
  const [rerating, setRerating] = useState(false);

  const dirty = useMemo(
    () => Object.keys(addOns).some((k) => addOns[k] !== initialAddOns[k]),
    [addOns, initialAddOns],
  );

  const currentGAPrice = reratedPremium ?? "$1075";
  const gaSelected = selectedCarrier === "GA";
  const navSelected = selectedCarrier === "NAV";

  function handleReRate() {
    setRerating(true);
    setTimeout(() => {
      const delta = Object.values(addOns).filter(Boolean).length * 32;
      setReratedPremium("$" + (1075 + delta));
      setRerating(false);
    }, 800);
  }

  function reset() {
    setAddOns(initialAddOns);
    setReratedPremium(null);
  }

  return (
    <AppShell>
      <div className="grid gap-8">
        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2">
          <QuoteCard
            logo={<GreatAmericanLogo />}
            price={currentGAPrice}
            bullets={["Broader coverage options", "Admitted", "Agency Bill"]}
            badge="Enhanced Coverage"
            selected={gaSelected}
            updated={!!reratedPremium}
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
              <div>
                <h2 className="text-[22px] font-semibold text-btis-navy">
                  Add-On Coverages
                </h2>
                <p className="mt-1 text-[14px] text-[#6C757D]">
                  Customize your optional coverages.
                </p>
              </div>
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

            <div className="mt-6 space-y-4">
              {/* Included in your Enhanced Coverage */}
              <div className="rounded-xl border border-[#EAEAEA]">
                <AccordionHeader
                  open={includedOpen}
                  title="Included in your Enhanced Coverage"
                  badge={`${INCLUDED_COVERAGES.length} included`}
                  badgeTone="brand"
                  onToggle={() => setIncludedOpen((v) => !v)}
                />
                {includedOpen && (
                  <ul className="divide-y divide-[#EAEAEA] border-t border-[#EAEAEA]">
                    {INCLUDED_COVERAGES.map((c) => (
                      <li
                        key={c.label}
                        className="flex items-center justify-between px-5 py-4"
                      >
                        <div>
                          <div className="text-[15px] font-medium text-[#212529]">
                            {c.label}
                          </div>
                          <div className="mt-0.5 text-[13px] text-[#6C757D]">
                            {c.sublabel}
                          </div>
                        </div>
                        <span
                          className="rounded-full px-2.5 py-0.5 text-[12px] font-medium text-[#3f8c66]"
                          style={{ backgroundColor: "rgba(115, 201, 183, 0.16)" }}
                        >
                          Included
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Optional Add-Ons */}
              <div className="rounded-xl border border-[#EAEAEA]">
                <AccordionHeader
                  open={addOnsOpen}
                  title="Optional Add-Ons"
                  badge={`${OPTIONAL_ADDONS.length} available`}
                  onToggle={() => setAddOnsOpen((v) => !v)}
                />
                {addOnsOpen && (
                  <ul className="divide-y divide-[#EAEAEA] border-t border-[#EAEAEA]">
                    {OPTIONAL_ADDONS.map((a) => (
                      <li
                        key={a.id}
                        className="flex items-start justify-between gap-6 px-5 py-5"
                      >
                        <div className="min-w-0 pr-4">
                          <div className="text-[15px] font-semibold text-[#212529]">
                            {a.label}
                          </div>
                          <div className="mt-1 text-[13px] text-[#6C757D]">
                            {a.description}
                          </div>
                        </div>
                        <Toggle
                          checked={addOns[a.id]}
                          onChange={(v) =>
                            setAddOns((p) => ({ ...p, [a.id]: v }))
                          }
                          ariaLabel={a.label}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>

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
            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={reset}
                disabled={!dirty && !reratedPremium}
                className="inline-flex items-center justify-center rounded-[12px] bg-white text-[#212529] transition hover:bg-[#F5F5F5] disabled:opacity-40"
                style={{
                  fontSize: "17px",
                  fontWeight: 500,
                  padding: "8px 20px",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)",
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
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)",
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
