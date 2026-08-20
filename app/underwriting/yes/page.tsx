import { AppShell } from "@/components/AppShell";
import {
  YesNoRow,
  Field,
  Money,
  TextArea,
  FooterNav,
} from "@/components/FormControls";

export default function UnderwritingYesPage() {
  return (
    <AppShell title="Underwriting Questions">
      <div className="max-w-3xl space-y-6">
        <div className="divide-y divide-ink-faint/40">
          <YesNoRow label="Is the applicant involved in any recycling operations?" />

          {/* general contractor triggers */}
          <div className="py-3">
            <YesNoRow label="Is the applicant a general contractor?" />
            <div className="mt-3 grid gap-3 pl-4">
              <YesNoRow label="Does the applicant sub out 100%" />
              <YesNoRow label="Does the applicant have care, custody and control of the equipment at all times?" />
            </div>
          </div>

          {/* rent/loan triggers */}
          <div className="py-3">
            <YesNoRow label="Does the applicant rent or loan out equipment to others?" />
            <div className="mt-3 grid gap-4 pl-4 sm:grid-cols-2">
              <Money label="Rental Receipts" />
              <Field label="Copy of the rental contract">
                <div className="flex items-center gap-2">
                  <input placeholder="Rental Contract" />
                  <button className="btn-select">browse</button>
                </div>
              </Field>
            </div>
          </div>

          <div className="py-3">
            <YesNoRow label="Is the applicant involved in any of the following?" />
            <div className="mt-2 grid grid-cols-2 gap-y-1 gap-x-24 pl-4 text-[12px] text-ink-soft">
              <span>Crane Activities</span><span>Logging</span>
              <span>Asphalt Plants</span><span>Mining</span>
              <span>Bridge Building</span><span>Land Fields</span>
              <span>Dredging</span><span>Oilfields</span>
              <span>Waterways / Waterborne</span><span />
            </div>
            <div className="mt-4 pl-4">
              <TextArea label="Description of Operations" rows={4} />
            </div>
          </div>
        </div>
      </div>

      <FooterNav back backHref="/underwriting" next nextHref="/loss-payee/yes" />
    </AppShell>
  );
}
