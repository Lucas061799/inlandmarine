import { AppShell } from "@/components/AppShell";
import { InfoModal } from "@/components/InfoModal";

export default function InstallationFloaterInfoPage() {
  return (
    <AppShell title="Installation Floater">
      <div className="max-w-4xl text-ink-soft text-[13px]">(background)</div>
      <InfoModal onClose="/coverage/installation-floater">
        <p>
          This coverage applies to materials and supplies intended for installation, while in
          transit and at the job sites or at premises owned or leased by the insured if the
          material is designated for installation at a specific job site.
        </p>
      </InfoModal>
    </AppShell>
  );
}
