"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import clsx from "clsx";

type Props = {
  label?: string;
  options: string[];
  placeholder?: string;
  hint?: string;
  className?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (v: string) => void;
  searchable?: boolean;
};

export function Combobox({
  label,
  options,
  placeholder = "Select…",
  hint,
  className,
  defaultValue = "",
  value: controlledValue,
  onChange,
  searchable = true,
}: Props) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internal;
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter((o) => o.toLowerCase().includes(q));
  }, [query, options]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  // Focus search on open
  useEffect(() => {
    if (open) requestAnimationFrame(() => searchRef.current?.focus());
  }, [open]);

  const pick = (v: string) => {
    setInternal(v);
    setQuery("");
    setOpen(false);
    onChange?.(v);
  };

  return (
    <div ref={containerRef} className={clsx(label ? "field" : "", "relative", className)}>
      {label && <label>{label}</label>}
      {hint && <span className="field-hint">{hint}</span>}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-[14px] border border-[#EAEAEA] bg-white text-left text-[18px] text-[#212529] focus:border-btis-teal focus:outline-none focus:ring-2 focus:ring-btis-teal/25"
        style={{ padding: "0.85rem 1.1rem", fontFamily: "Montserrat, sans-serif" }}
      >
        <span className={value ? "" : "text-[#6C757D]"}>{value || placeholder}</span>
        <ChevronDown className="h-4 w-4 text-ink-soft" />
      </button>

      {open && (
        <div
          className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-[14px] border border-[#EAEAEA] bg-white shadow-lg"
          role="listbox"
        >
          {/* Search */}
          {searchable && (
            <div className="border-b border-[#EAEAEA] p-3">
              <div className="relative">
                <input
                  ref={searchRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder=""
                  className="w-full rounded-md border border-[#EAEAEA] py-2 pl-3 pr-9 text-[15px] outline-none focus:border-btis-teal focus:ring-2 focus:ring-btis-teal/25"
                />
                <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
              </div>
            </div>
          )}

          {/* Options list */}
          <ul className="max-h-[360px] overflow-auto py-1">
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-[15px] text-ink-soft">No results</li>
            )}
            {filtered.map((opt) => {
              const selected = opt === value;
              return (
                <li key={opt}>
                  <button
                    type="button"
                    onClick={() => pick(opt)}
                    className={clsx(
                      "block w-full px-5 py-2.5 text-left text-[16px] text-[#3b3b3b] transition",
                      selected ? "bg-[#E3F2FD]" : "hover:bg-[#F5F5F5]",
                    )}
                  >
                    {opt}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
