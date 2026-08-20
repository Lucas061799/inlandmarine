"use client";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { DateField, TextArea, FooterNav } from "@/components/FormControls";
import { Combobox } from "@/components/Combobox";

const CANCEL_REASONS = [
  "Non-payment of premium",
  "Claims",
  "Carrier Non-Renewal",
];

export default function UnderwritingPage() {
  const [bankruptcy, setBankruptcy] = useState<"yes" | "no">("no");
  const [canceled, setCanceled] = useState<"yes" | "no">("no");
  const [paidLosses, setPaidLosses] = useState<"yes" | "no">("no");

  return (
    <AppShell>
      <div className="grid gap-6">
        <YesNoRowControlled
          label="Has the applicant filed for bankruptcy within the past 3 years?"
          value={bankruptcy}
          onChange={setBankruptcy}
        />

        <YesNoRowControlled
          label="Has the applicant had any Inland Marine policy coverage canceled or non-renewed within the past 3 years?"
          value={canceled}
          onChange={setCanceled}
        />

        {canceled === "yes" && (
          <div className="grid gap-y-[45px] gap-x-[30px] sm:grid-cols-2 pl-2">
            <Combobox
              label="Select the reason"
              placeholder="Select the reason"
              options={CANCEL_REASONS}
            />
            <DateField label="Loss Date" />
            <div className="sm:col-span-2">
              <TextArea
                label="Loss Description"
                placeholder="Enter Loss Description"
                rows={4}
              />
            </div>
          </div>
        )}

        <YesNoRowControlled
          label="Have there been any paid inland marine losses in the past 4 years?"
          value={paidLosses}
          onChange={setPaidLosses}
        />
      </div>

      <FooterNav back backHref="/coverage" next nextHref="/loss-payee" />
    </AppShell>
  );
}

/* Controlled version of YesNoRow with state */
function YesNoRowControlled({
  label,
  value,
  onChange,
}: {
  label: string;
  value: "yes" | "no";
  onChange: (v: "yes" | "no") => void;
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-3">
      <span className="max-w-2xl text-[17px] text-[#212529]">{label}</span>
      <div className="flex shrink-0 items-center gap-8">
        <label className="inline-flex cursor-pointer items-center gap-2 text-[16px] text-[#212529]">
          <input
            type="radio"
            className="brand-radio"
            checked={value === "yes"}
            onChange={() => onChange("yes")}
          />
          Yes
        </label>
        <label className="inline-flex cursor-pointer items-center gap-2 text-[16px] text-[#212529]">
          <input
            type="radio"
            className="brand-radio"
            checked={value === "no"}
            onChange={() => onChange("no")}
          />
          No
        </label>
      </div>
    </div>
  );
}
