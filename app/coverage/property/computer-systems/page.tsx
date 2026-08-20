import { AppShell } from "@/components/AppShell";
import { InfoModal } from "@/components/InfoModal";

export default function ComputerSystemsInfoPage() {
  return (
    <AppShell title="Property Coverage">
      <div className="max-w-4xl text-ink-soft text-[13px]">(background)</div>
      <InfoModal onClose="/coverage/property">
        <p>
          <span className="font-semibold">Computer Systems - Hardware:</span> this coverage
          applies to the applicant&apos;s programmable electronic equipment that is used to store,
          retrieve and process data and other associated equipment such as printers.
        </p>
        <p>
          <span className="font-semibold">Computer Systems - Data &amp; Media:</span> this
          coverage applies to data stored on media and programmable records used for electronics
          data processing or electronically controlled equipment. Media includes such items as
          software, files, tapes, discs, drums or cells.
        </p>
        <p>
          <span className="font-semibold">Computer Systems - Extra Expense:</span> this coverage is
          intended to cover those extra expenses required to avoid or minimize the suspension of
          business and continue business operations.
        </p>
      </InfoModal>
    </AppShell>
  );
}
