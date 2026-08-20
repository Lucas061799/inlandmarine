import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Money, FooterNav } from "@/components/FormControls";

export default function RentedLeasedPage() {
  return (
    <AppShell title="Rented / Leased Equipment">
      <div className="grid max-w-3xl gap-6">
        <div className="flex items-center gap-2 text-[13px] text-ink">
          <Link
            href="/coverage/rented-leased/info"
            className="underline decoration-brand-400 underline-offset-4"
          >
            Rented / Leased Equipment
          </Link>
          <span className="h-2 w-2 rounded-full bg-brand-500" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Money label="Rented Value" />
          <Money label="Est. Annual Rental Cost" />
        </div>
      </div>

      <FooterNav
        back
        backHref="/coverage/schedule-equipment"
        next
        nextHref="/coverage/misc-tools"
      />
    </AppShell>
  );
}
