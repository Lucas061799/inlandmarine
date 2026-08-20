"use client";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { FooterNav } from "@/components/FormControls";
import { Info } from "lucide-react";

function SectionHeader({ title }: { title: string }) {
  return (
    <div>
      <h2 className="text-[22px] font-medium" style={{ color: "#73C9B7" }}>
        {title}
      </h2>
      <div className="mt-2 h-px w-full bg-[#EAEAEA]" />
    </div>
  );
}

function InfoIcon() {
  return (
    <span
      className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
      style={{ backgroundColor: "#73C9B7" }}
      aria-hidden
    >
      i
    </span>
  );
}

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
      className="relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full transition-colors"
      style={{ backgroundColor: checked ? "#73C9B7" : "#DCDCDC" }}
    >
      <span
        className="inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition"
        style={{ transform: checked ? "translateX(21px)" : "translateX(2px)", marginTop: "2px" }}
      />
    </button>
  );
}

function CoverageOption({
  label,
  defaultOn = false,
}: {
  label: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(defaultOn);
  const [value, setValue] = useState("");

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[17px] font-medium text-[#212529]">
          <span>{label}</span>
          <InfoIcon />
        </div>
        <Toggle checked={on} onChange={setOn} ariaLabel={label} />
      </div>

      {on && (
        <div className="mt-4 max-w-md">
          <div className="field relative">
            <label>Value</label>
            <input
              type="text"
              inputMode="numeric"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="pl-7"
              placeholder=""
            />
            <span
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[18px] text-[#212529]"
              aria-hidden
            >
              $
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CoverageOptionsPage() {
  return (
    <AppShell>
      <div className="grid gap-12">
        <section>
          <SectionHeader title="Property Coverage" />
          <CoverageOption label="Office Contents" />
        </section>

        <section>
          <SectionHeader title="Miscellaneous Articles Coverage" />
          <CoverageOption label="Other Portable Personal Property" />
        </section>
      </div>

      <FooterNav back backHref="/applicant" next nextHref="/underwriting" />
    </AppShell>
  );
}
