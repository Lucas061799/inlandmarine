import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Money, FooterNav } from "@/components/FormControls";

export default function PropertyCoveragePage() {
  return (
    <AppShell title="Property Coverage">
      <div className="grid max-w-4xl gap-8">
        <section>
          <div className="mb-1 flex items-center gap-2 text-[13px] text-ink">
            Office Contents <span className="h-2 w-2 rounded-full bg-brand-500" />
          </div>
          <div className="mb-4 text-[11px] text-ink-soft">
            (property within 100 feet of the listed location)
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Money label="Value" />
            <Money label="Equipment" />
            <Money label="Data &amp; Media" />
            <Money label="Extra Expense" />
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center gap-2 text-[13px] text-ink">
            <Link
              href="/coverage/property/computer-systems"
              className="underline decoration-brand-400 underline-offset-4"
            >
              Computer System / Electronic Data Processing Equipment
            </Link>
            <span className="h-2 w-2 rounded-full bg-brand-500" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Money label="Value" />
            <Money label="Equipment" />
            <Money label="Data &amp; Media" />
            <Money label="Extra Expense" />
          </div>
        </section>
      </div>

      <FooterNav back backHref="/coverage" next nextHref="/coverage/schedule-equipment" />
    </AppShell>
  );
}
