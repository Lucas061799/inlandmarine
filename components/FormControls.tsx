import { ChevronDown, Trash2, Calendar as CalIcon, Plus } from "lucide-react";
import clsx from "clsx";

/* --- Field with tiny floating label (matches XD's outlined inputs) --- */
export function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={clsx("field", className)}>
      <label>{label}</label>
      {hint && <span className="field-hint">{hint}</span>}
      {children ?? <input type="text" />}
    </div>
  );
}

export function Select({
  label,
  hint,
  placeholder,
  options = [],
  className,
}: {
  label: string;
  hint?: string;
  placeholder?: string;
  options?: string[];
  className?: string;
}) {
  return (
    <div className={clsx("field relative", className)}>
      <label>{label}</label>
      {hint && <span className="field-hint">{hint}</span>}
      <select className="appearance-none pr-8">
        <option value="">{placeholder ?? ""}</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
    </div>
  );
}

export function DateField({ label, className }: { label: string; className?: string }) {
  return (
    <div className={clsx("field relative", className)}>
      <label>{label}</label>
      <input type="text" placeholder="" />
      <CalIcon className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-500" />
    </div>
  );
}

export function TextArea({
  label,
  className,
  rows = 6,
  placeholder,
}: {
  label: string;
  className?: string;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div className={clsx("field", className)}>
      <label>{label}</label>
      <textarea rows={rows} placeholder={placeholder ?? ""} />
    </div>
  );
}

export function Money({
  label,
  hint,
  className,
}: {
  label: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={clsx("field relative", className)}>
      <label>{label}</label>
      {hint && <span className="field-hint">{hint}</span>}
      <input type="text" defaultValue="$" />
    </div>
  );
}

export function YesNoRow({
  label,
  name,
  defaultValue = "no",
}: {
  label: string;
  name?: string;
  defaultValue?: "yes" | "no";
}) {
  const groupName = name || label;
  return (
    <div className="flex items-center justify-between gap-6 py-3">
      <span className="max-w-2xl text-[17px] text-[#212529]">{label}</span>
      <div className="flex shrink-0 items-center gap-8">
        <label className="inline-flex cursor-pointer items-center gap-2 text-[16px] text-[#212529]">
          <input
            type="radio"
            name={groupName}
            className="brand-radio"
            defaultChecked={defaultValue === "yes"}
          />
          Yes
        </label>
        <label className="inline-flex cursor-pointer items-center gap-2 text-[16px] text-[#212529]">
          <input
            type="radio"
            name={groupName}
            className="brand-radio"
            defaultChecked={defaultValue === "no"}
          />
          No
        </label>
      </div>
    </div>
  );
}

export function Checkbox({
  label,
  defaultChecked,
}: {
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="inline-flex items-center gap-3 text-[15px] text-ink">
      <input type="checkbox" className="brand" defaultChecked={defaultChecked} />
      {label}
    </label>
  );
}

export function DeleteIcon() {
  return <Trash2 className="h-4 w-4 text-accent-coral" />;
}
export function PlusIcon() {
  return <Plus className="h-4 w-4 text-brand-600" />;
}

export function FooterNav({
  back,
  next,
  nextHref,
  backHref,
  onNext,
}: {
  back?: boolean;
  next?: boolean;
  nextHref?: string;
  backHref?: string;
  onNext?: string;
}) {
  return (
    <div className="mt-10 flex items-center justify-between">
      {back ? (
        <a href={backHref ?? "#"} className="btn-back">
          back
        </a>
      ) : (
        <span />
      )}
      {next && (
        <a href={nextHref ?? "#"} className="btn-next">
          {onNext ?? "next"}
        </a>
      )}
    </div>
  );
}
