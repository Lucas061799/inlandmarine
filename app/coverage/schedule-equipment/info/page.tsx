import { AppShell } from "@/components/AppShell";
import { InfoModal } from "@/components/InfoModal";

export default function ScheduleEquipmentInfoPage() {
  return (
    <AppShell title="Scheduled Equipment">
      <div className="max-w-4xl text-ink-soft text-[13px]">(background)</div>
      <InfoModal onClose="/coverage/schedule-equipment">
        <p>
          <span className="font-semibold">Scheduled Equipment - Light/Medium:</span> this
          coverage is intended to cover equipment such as tractors, fork lifts, compressors,
          portable generators, scaffolding, portable welders, portable concrete mixers, light
          plants, job site trailers and those small tools valued more than $1,500. Items will
          be specifically listed and scheduled on the policy.
        </p>
        <p>
          <span className="font-semibold">Scheduled Equipment - Heavy:</span> this coverage is
          intended to cover equipment such as loaders, bulldozers, graders, scrapers, and power
          shovels. Equipment used in asphalt plants, demolition, dredging, farming, logging,
          mining, oil field, landfill, roofing scrap yards or cranes, booms, material handling
          conveyer equipment are types of equipment that are not eligible for coverage.
        </p>
      </InfoModal>
    </AppShell>
  );
}
