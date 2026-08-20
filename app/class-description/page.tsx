import { AppShell } from "@/components/AppShell";
import { InfoModal } from "@/components/InfoModal";

export default function ClassDescriptionPage() {
  return (
    <AppShell title="Class Code Information">
      <div className="max-w-3xl text-ink-soft text-[13px]">
        (background page)
      </div>
      <InfoModal onClose="/">
        <div className="font-semibold">The following operations are included in this classification:</div>
        <ul className="ml-2 space-y-1">
          <li>· Electrical work inside buildings</li>
          <li>· Incidental exterior work (no more than 10% of annual gross receipts)</li>
          <li>· Electrical work up to 480 volts</li>
          <li>· Work up to 12 feet below grade level</li>
        </ul>
        <div className="pt-4 font-semibold">
          The following operations are not included in this classification:
        </div>
        <ul className="ml-2 space-y-1">
          <li>· Power line or power pole construction/maintenance</li>
          <li>· Transformer or generator installation, service or repair</li>
          <li>· Burglar or fire alarm/emergency systems work</li>
          <li>· Electrical machinery, auxiliary apparatus or production line work</li>
          <li>· Traffic signal or traffic control work</li>
          <li>· Fire suppression work including extinguishing systems over cooking areas</li>
          <li>· Industrial work</li>
          <li>· Solar energy panel work</li>
          <li>· Work on security cameras or closed circuit TVs</li>
          <li>· Cell tower work</li>
          <li>· Nurse call stations or emergency communications lines</li>
          <li>· Swimming pool, spa or pond equipment work</li>
          <li>· Dam or levee</li>
          <li>· Public street, road, bridge, highway or overpass work on parking lot lighting</li>
          <li>· Underground work</li>
          <li>· Sauna or steam rooms</li>
          <li>· Street or highway lighting</li>
          <li>· Any operations beneath ground surface without verification of underground utilities by a locating service</li>
        </ul>
      </InfoModal>
    </AppShell>
  );
}
