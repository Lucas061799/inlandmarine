import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Money, FooterNav } from "@/components/FormControls";

export default function MiscToolsPage() {
  return (
    <AppShell title="Miscellaneous Tools">
      <div className="grid max-w-2xl gap-6">
        <div className="flex items-center gap-2 text-[13px] text-ink">
          <Link
            href="/coverage/misc-tools/info"
            className="underline decoration-brand-400 underline-offset-4"
          >
            Miscellaneous Tools
          </Link>
          <span className="h-2 w-2 rounded-full bg-brand-500" />
        </div>

        <Money label="Value" className="w-56" />
      </div>

      <FooterNav
        back
        backHref="/coverage/rented-leased"
        next
        nextHref="/coverage/installation-floater"
      />
    </AppShell>
  );
}
