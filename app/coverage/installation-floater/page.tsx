import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Money, FooterNav } from "@/components/FormControls";

export default function InstallationFloaterPage() {
  return (
    <AppShell title="Installation Floater">
      <div className="grid max-w-3xl gap-6">
        <div className="flex items-center gap-2 text-[13px] text-ink">
          <Link
            href="/coverage/installation-floater/info"
            className="underline decoration-brand-400 underline-offset-4"
          >
            Installation Floater
          </Link>
          <span className="h-2 w-2 rounded-full bg-brand-500" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Money label="Installation Value" />
          <Money label="Est. Annual Installation Receipts" />
        </div>
      </div>

      <FooterNav
        back
        backHref="/coverage/misc-tools"
        next
        nextHref="/underwriting"
      />
    </AppShell>
  );
}
