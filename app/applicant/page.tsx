import { AppShell } from "@/components/AppShell";
import {
  Field,
  Select,
  DateField,
  Checkbox,
  FooterNav,
} from "@/components/FormControls";
import { Combobox } from "@/components/Combobox";
import { US_STATES } from "@/lib/states";
import {
  BUSINESS_TYPES,
  YEARS_IN_BUSINESS,
  INDUSTRY_EXPERIENCE,
} from "@/lib/business";

export default function ApplicantInfoPage() {
  return (
    <AppShell>
      <div className="grid gap-y-[45px] gap-x-[30px]">
        {/* First / Last */}
        <div className="grid gap-y-[45px] gap-x-[30px] sm:grid-cols-2">
          <Field label="Applicant First Name">
            <input placeholder="Enter Applicant Name" />
          </Field>
          <Field label="Applicant Last Name">
            <input placeholder="Enter Applicant Name" />
          </Field>
        </div>

        {/* Email / Phone */}
        <div className="grid gap-y-[45px] gap-x-[30px] sm:grid-cols-2">
          <Field label="Email">
            <input placeholder="Enter Email" type="email" />
          </Field>
          <Field label="Phone Number">
            <input placeholder="Enter Phone Number" type="tel" />
          </Field>
        </div>

        {/* DBA */}
        <Field label="DBA (Optional)">
          <input placeholder="Enter DBA(Optional)" />
        </Field>

        {/* Type / Effective Date */}
        <div className="grid gap-y-[45px] gap-x-[30px] sm:grid-cols-2">
          <Combobox
            label="Type of Business"
            placeholder="Select Type"
            options={BUSINESS_TYPES}
          />
          <DateField label="Effective Date" />
        </div>

        {/* Business Address / County */}
        <div className="grid gap-y-[45px] gap-x-[30px] sm:grid-cols-2">
          <Field label="Business Street Address">
            <input placeholder="Enter Business Address" />
          </Field>
          <Field label="County">
            <input placeholder="Enter County" />
          </Field>
        </div>

        {/* City / State / Zip */}
        <div className="grid gap-y-[45px] gap-x-[30px] sm:grid-cols-3">
          <Field label="City">
            <input placeholder="Enter City" />
          </Field>
          <Select label="State" placeholder="Select State" options={US_STATES} />
          <Field label="Zip Code">
            <input placeholder="Enter Zip Code" />
          </Field>
        </div>

        {/* Mailing same-as toggle */}
        <div className="pt-1">
          <Checkbox label="Mailing address is same as business" />
        </div>

        {/* Mailing Address / County */}
        <div className="grid gap-y-[45px] gap-x-[30px] sm:grid-cols-2">
          <Field label="Mailing Street Address">
            <input placeholder="Enter a location" />
          </Field>
          <Field label="County">
            <input placeholder="Enter County" />
          </Field>
        </div>

        {/* Mailing City / State / Zip */}
        <div className="grid gap-y-[45px] gap-x-[30px] sm:grid-cols-3">
          <Field label="City">
            <input placeholder="Enter City" />
          </Field>
          <Select label="State" placeholder="Select State" options={US_STATES} />
          <Field label="Zip Code">
            <input placeholder="Enter Zip Code" />
          </Field>
        </div>

        {/* Inspection contact toggle */}
        <div className="pt-1">
          <Checkbox label="Is the Inspection Contact same as the Applicant Contact?" />
        </div>

        {/* Inspection Contact First / Last */}
        <div className="grid gap-y-[45px] gap-x-[30px] sm:grid-cols-2">
          <Field label="Inspection Contact First Name">
            <input placeholder="Enter Inspection Contact First Name" />
          </Field>
          <Field label="Inspection Contact Last Name">
            <input placeholder="Enter Inspection Contact Last Name" />
          </Field>
        </div>

        {/* Inspection Email / Phone */}
        <div className="grid gap-y-[45px] gap-x-[30px] sm:grid-cols-2">
          <Field label="Inspection Contact Email">
            <input placeholder="Inspection Contact Email" type="email" />
          </Field>
          <Field label="Inspection Contact Phone">
            <input placeholder="Inspection Contact Phone" type="tel" />
          </Field>
        </div>

        {/* Years in Business / Industry Experience */}
        <div className="grid gap-y-[45px] gap-x-[30px] sm:grid-cols-2">
          <Combobox
            label="Years in Business"
            placeholder="Select Years In Business"
            options={YEARS_IN_BUSINESS}
          />
          <Combobox
            label="Industry Experience"
            placeholder="Select Industry Experience"
            options={INDUSTRY_EXPERIENCE}
          />
        </div>
      </div>

      <FooterNav back backHref="/" next nextHref="/coverage" />
    </AppShell>
  );
}
