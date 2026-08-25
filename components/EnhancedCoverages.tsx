"use client";
import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Combobox } from "@/components/Combobox";
import { ENHANCED_COVERAGE_GROUPS, type CoverageGroup } from "@/lib/coverages";

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
    <Combobox options={options} value={value} onChange={onChange} searchable={false} />
  );
}

/* ---------- Limits grid for one coverage group ---------- */
function LimitsGrid({
  items,
  values,
  onChange,
  className = "",
}: {
  items: CoverageGroup["items"];
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
  className?: string;
}) {
  return (
    <div className={`grid gap-6 sm:grid-cols-2 ${className}`}>
      {items.map((it) => (
        <div key={it.id} className="flex flex-col">
          <div className="text-[14px] font-medium text-[#212529]">{it.label}</div>
          <div className="mt-1 min-h-[16px] text-[11px] italic text-[#6C757D]">
            {it.sublabel ?? " "}
          </div>
          <div className="mt-auto pt-2">
            <CoverageDropdown
              value={values[it.id]}
              options={it.options}
              onChange={(v) => onChange(it.id, v)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Unsaved changes pill ---------- */
function UnsavedPill() {
  return (
    <span
      className="inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1 text-[13px] font-medium text-[#8a5a1f]"
      style={{ backgroundColor: "rgba(240, 160, 64, 0.14)" }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: "#F0A040" }}
      />
      Unsaved changes
    </span>
  );
}

/*
  Optional Forms (Existing Fire Exclusion, Locked Vehicle – Restricted Theft
  Coverage Endorsement, Crane Exclusion) are intentionally NOT shown in the UI:
    – Locked Vehicle is auto-included for Great American quotes silently on
      the backend
    – Fire Exclusion and Crane Exclusion are never applied by default
  Agents do not need to make this selection.
*/

/**
 * The Great American Enhanced Coverage limits, shared by the review layouts.
 * Owns the limit selections and the fake re-rate; the host page only needs to
 * know the resulting premium. Groups render as an accordion or as tabs.
 */
export function EnhancedCoverages({
  basePremium = 1075,
  onRerate,
  onDiscard,
  heading = "Great American Enhanced Coverages",
  subtitle = "Review and customize your coverage limits. Changes require re-rating.",
  variant = "accordion",
}: {
  basePremium?: number;
  onRerate: (premium: number) => void;
  onDiscard: () => void;
  /** Pass null when the host already names the carrier. */
  heading?: string | null;
  /** Pass null when the host writes its own intro line. */
  subtitle?: string | null;
  /** How the four coverage groups are presented. */
  variant?: "accordion" | "tabs";
}) {
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

  const [activeTab, setActiveTab] = useState(ENHANCED_COVERAGE_GROUPS[0].id);
  const [rerating, setRerating] = useState(false);
  const [hasRerated, setHasRerated] = useState(false);

  const dirty = useMemo(
    () => Object.keys(values).some((k) => values[k] !== initialValues[k]),
    [values, initialValues],
  );

  function handleReRate() {
    setRerating(true);
    setTimeout(() => {
      // Fake re-rate: bump premium a bit based on # of edits
      const delta =
        Object.keys(values).filter((k) => values[k] !== initialValues[k]).length * 18;
      onRerate(basePremium + delta);
      setHasRerated(true);
      setRerating(false);
    }, 800);
  }

  function reset() {
    setValues(initialValues);
    setHasRerated(false);
    onDiscard();
  }

  return (
    <div>
      {heading ? (
        <div className="flex items-start justify-between gap-4 border-b border-[#EAEAEA] pb-5">
          <h2 className="text-[22px] font-semibold text-btis-navy">{heading}</h2>
          {dirty && <UnsavedPill />}
        </div>
      ) : null}

      {(subtitle || (!heading && dirty)) && (
        <div
          className={`flex items-start justify-between gap-4 ${heading ? "mt-5" : ""}`}
        >
          {subtitle && <p className="text-[14px] text-[#6C757D]">{subtitle}</p>}
          {!heading && dirty && <UnsavedPill />}
        </div>
      )}

      {/* Coverage groups */}
      {variant === "tabs" ? (
        <div className="mt-5">
          <div
            role="tablist"
            className="flex flex-wrap gap-x-1 gap-y-2 border-b border-[#EAEAEA]"
          >
            {ENHANCED_COVERAGE_GROUPS.map((g) => {
              const active = activeTab === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(g.id)}
                  className={`-mb-px flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-2.5 text-[15px] transition ${
                    active
                      ? "border-[#73C9B7] font-semibold text-btis-navy"
                      : "border-transparent font-medium text-[#6C757D] hover:text-btis-navy"
                  }`}
                >
                  {g.title}
                  <span
                    className="rounded-full px-2 py-0.5 text-[11px] font-medium text-[#3f8c66]"
                    style={{ backgroundColor: "rgba(115, 201, 183, 0.16)" }}
                  >
                    {g.items.length}
                  </span>
                </button>
              );
            })}
          </div>

          {ENHANCED_COVERAGE_GROUPS.filter((g) => g.id === activeTab).map((g) => (
            <LimitsGrid
              key={g.id}
              items={g.items}
              values={values}
              onChange={(id, v) => setValues((prev) => ({ ...prev, [id]: v }))}
              className="pt-6"
            />
          ))}
        </div>
      ) : (
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
                  <LimitsGrid
                    items={g.items}
                    values={values}
                    onChange={(id, v) => setValues((prev) => ({ ...prev, [id]: v }))}
                    className="border-t border-[#EAEAEA] px-5 py-6"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}


      {/* Panel footer */}
      <div className="mt-8 flex items-center justify-between border-t border-[#EAEAEA] pt-6">
        <button
          type="button"
          onClick={reset}
          disabled={!dirty && !hasRerated}
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
    </div>
  );
}
