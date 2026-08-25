/* The two carriers quoting this Inland Marine submission. Shared by the
   review layouts so every option shows identical numbers. */

export type CarrierQuote = {
  id: "GA" | "NAV";
  name: string;
  /** Annual premium before any enhanced-coverage re-rate. */
  premium: number;
  commission: string;
  badge?: string;
  bullets: string[];
};

export const CARRIER_QUOTES: CarrierQuote[] = [
  {
    id: "GA",
    name: "Great American",
    premium: 1075,
    commission: "15% Commission",
    badge: "Enhanced Coverage",
    bullets: ["Broader coverage options", "Admitted", "Agency Bill"],
  },
  {
    id: "NAV",
    name: "Navigators",
    premium: 675,
    commission: "15% Commission",
    bullets: ["BTIS Proprietary Carrier", "Admitted", "Agency Bill"],
  },
];
