import { ChevronDown } from "lucide-react";

/**
 * The policy-level Limits / Deductible control. Visual only — the option
 * lists for these two are not in the data, so it renders as a static field.
 *
 * "lg" is the stacked treatment the card layout uses; "sm" fits a row of
 * controls laid out across the width.
 */
export function PolicyField({
  label,
  value,
  size = "lg",
}: {
  label: string;
  value: string;
  size?: "lg" | "sm";
}) {
  const small = size === "sm";
  return (
    <div className={`field relative ${small ? "min-w-[150px] flex-1" : ""}`}>
      <label>{label}</label>
      <button
        type="button"
        className={`flex w-full items-center justify-between rounded-[14px] border border-[#EAEAEA] bg-white text-left text-[#212529] ${
          small ? "text-[16px]" : "text-[18px]"
        }`}
        style={{
          padding: small ? "0.6rem 0.9rem" : "0.85rem 1.1rem",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        <span className={small ? "truncate" : undefined}>{value}</span>
        <ChevronDown
          className={`h-4 w-4 text-ink-soft ${small ? "ml-2 shrink-0" : ""}`}
        />
      </button>
    </div>
  );
}

/** Limits + Deductible as a pair, since every layout shows them together. */
export function PolicyFields({ size = "lg" }: { size?: "lg" | "sm" }) {
  return (
    <>
      <PolicyField label="Limits" value="$1M/$2M/$2M" size={size} />
      <PolicyField label="Deductible" value="$1,500" size={size} />
    </>
  );
}
