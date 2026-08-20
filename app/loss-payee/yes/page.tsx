import { AppShell } from "@/components/AppShell";
import { Field, Select, Checkbox, FooterNav } from "@/components/FormControls";
import { US_STATES } from "@/lib/states";

function LossPayeeBlock({ n }: { n: number }) {
  return (
    <div className="space-y-4">
      <div className="text-[13px] font-semibold text-ink">Loss Payee #{n}</div>
      <Field label="Loss Payee Name" />
      <Field label="Loan Number" />
      <Field label="Business Address" />
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="City" />
        <Select label="State" options={US_STATES} />
        <Field label="Zip Code" />
      </div>
    </div>
  );
}

export default function LossPayeeYesPage() {
  return (
    <AppShell title="Loss Payee">
      <div className="max-w-3xl space-y-8">
        <Checkbox label="Does the applicant have any losses?" defaultChecked />

        <LossPayeeBlock n={1} />
        <Checkbox label="More Losses?" defaultChecked />
        <LossPayeeBlock n={2} />
        <Checkbox label="More Losses?" />
      </div>

      <FooterNav back backHref="/underwriting" next nextHref="/review" />
    </AppShell>
  );
}
