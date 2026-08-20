"use client";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Field, Select, FooterNav } from "@/components/FormControls";
import { Combobox } from "@/components/Combobox";
import { US_STATES } from "@/lib/states";
import { Plus } from "lucide-react";

const COVERAGE_TYPES = [
  "Office Contents",
  "Other Portable Personal Property",
];

function LossPayeeBlock({ n }: { n: number }) {
  return (
    <section className="grid gap-y-[45px] gap-x-[30px]">
      <h3 className="text-[18px] font-semibold text-btis-navy">
        Loss Payee #{n}
      </h3>

      <Combobox
        label="Coverage Type"
        placeholder="Select Coverage Type"
        options={COVERAGE_TYPES}
      />

      <Field label="Loss Payee Name">
        <input placeholder="Enter Loss Payee Name" />
      </Field>

      <Field label="Loan Number">
        <input placeholder="Enter Loan Number" />
      </Field>

      <div className="grid gap-y-[45px] gap-x-[30px] sm:grid-cols-2">
        <Field label="Address">
          <input placeholder="Enter Address" />
        </Field>
        <Field label="Suite/Apt.(Optional)">
          <input placeholder="Enter Suite/Apt.(Optional)" />
        </Field>
      </div>

      <div className="grid gap-y-[45px] gap-x-[30px] sm:grid-cols-3">
        <Field label="City">
          <input placeholder="Enter City" />
        </Field>
        <Select label="State" placeholder="Select State" options={US_STATES} />
        <Field label="Zip Code">
          <input placeholder="Enter Zip Code" />
        </Field>
      </div>
    </section>
  );
}

function YesNoControlled({
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

export default function LossPayeePage() {
  const [addLossPayee, setAddLossPayee] = useState<"yes" | "no">("yes");
  const [count, setCount] = useState(1);

  return (
    <AppShell>
      <div className="grid gap-8">
        <YesNoControlled
          label="Does the applicant want to add a Loss Payee to their policy?"
          value={addLossPayee}
          onChange={setAddLossPayee}
        />

        {addLossPayee === "yes" && (
          <>
            {Array.from({ length: count }, (_, i) => (
              <LossPayeeBlock key={i} n={i + 1} />
            ))}

            {count < 4 && (
              <button
                type="button"
                onClick={() => setCount((c) => Math.min(c + 1, 4))}
                className="inline-flex w-fit items-center gap-1.5 text-[16px] font-medium"
                style={{ color: "#73C9B7" }}
              >
                <Plus className="h-4 w-4" strokeWidth={2.5} />
                Add More
              </button>
            )}
          </>
        )}
      </div>

      <FooterNav
        back
        backHref="/underwriting"
        next
        nextHref="/review"
      />
    </AppShell>
  );
}
