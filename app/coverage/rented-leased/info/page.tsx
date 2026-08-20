import { AppShell } from "@/components/AppShell";
import { InfoModal } from "@/components/InfoModal";

export default function RentedLeasedInfoPage() {
  return (
    <AppShell title="Rented / Leased Equipment">
      <div className="max-w-4xl text-ink-soft text-[13px]">(background)</div>
      <InfoModal onClose="/coverage/rented-leased">
        <p>
          This coverage applies to equipment rented or leased from others. This lease or rental on
          the equipment cannot exceed 12 consecutive months.
        </p>
      </InfoModal>
    </AppShell>
  );
}
