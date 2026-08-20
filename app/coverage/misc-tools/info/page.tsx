import { AppShell } from "@/components/AppShell";
import { InfoModal } from "@/components/InfoModal";

export default function MiscToolsInfoPage() {
  return (
    <AppShell title="Miscellaneous Tools">
      <div className="max-w-4xl text-ink-soft text-[13px]">(background)</div>
      <InfoModal onClose="/coverage/misc-tools">
        <p>
          This coverage is intended to cover hand tools, compressors, generators, nails guns,
          paint sprayers, cell phones and similar items. The maximum value of any one tool is
          $1,500.
        </p>
      </InfoModal>
    </AppShell>
  );
}
