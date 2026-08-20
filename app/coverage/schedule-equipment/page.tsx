import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Field, Select, Money, FooterNav } from "@/components/FormControls";

export default function ScheduleEquipmentPage() {
  return (
    <AppShell title="Schedule Equipment">
      <div className="grid max-w-4xl gap-6">
        <div className="flex items-center gap-2 text-[13px] text-ink">
          <Link
            href="/coverage/schedule-equipment/info"
            className="underline decoration-brand-400 underline-offset-4"
          >
            Schedule Equipment
          </Link>
          <span className="h-2 w-2 rounded-full bg-brand-500" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Select
            label="Light/Medium/Heavy"
            options={["Light", "Medium", "Heavy"]}
          />
          <Field label="Model Year" />
          <Field label="Serial Number" />
          <Money label="Limit of Insurance" />
        </div>

        <Field label="Equipment Description (make &amp; model)" />
      </div>

      <FooterNav back backHref="/coverage" next nextHref="/coverage/rented-leased" />
    </AppShell>
  );
}
