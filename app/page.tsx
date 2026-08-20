import { AppShell } from "@/components/AppShell";
import { Combobox } from "@/components/Combobox";
import { TextArea, FooterNav } from "@/components/FormControls";
import { CLASS_CODES } from "@/lib/classcodes";

export default function ClassCodeInformationPage() {
  return (
    <AppShell>
      <div className="grid gap-8">
        <Combobox
          label="Class Code"
          placeholder="Select Class Code"
          options={CLASS_CODES}
        />

        <TextArea
          label="Class Code Description (must be at least 10 words)"
          placeholder="Enter the class code description here"
          rows={6}
        />
      </div>

      <FooterNav next nextHref="/applicant" />
    </AppShell>
  );
}
