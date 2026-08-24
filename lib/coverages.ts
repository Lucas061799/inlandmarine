export type CoverageItem = {
  id: string;
  label: string;
  sublabel?: string;
  options: string[];
  defaultValue: string;
};

export type CoverageGroup = {
  id: string;
  title: string;
  items: CoverageItem[];
};

export const ENHANCED_COVERAGE_GROUPS: CoverageGroup[] = [
  {
    id: "equipment",
    title: "Equipment",
    items: [
      {
        id: "leased-rented-borrowed",
        label: "Equipment Leased, Rented, Borrowed from Others",
        sublabel: "Any One Item / All Equipment",
        options: ["$25,000/$50,000", "$50,000/$100,000", "$100,000/$250,000", "$250,000/$500,000"],
        defaultValue: "$50,000/$100,000",
      },
      {
        id: "annual-rental-cost",
        label: "Est. Annual Rental Costs for Leased / Rented Equipment",
        options: ["$10,000", "$25,000", "$50,000", "$100,000", "$250,000"],
        defaultValue: "$50,000",
      },
      {
        id: "office-furniture",
        label: "Office Furniture, Fixtures and Equipment",
        sublabel: "Any One Item / All Items",
        options: ["$2,500/$5,000", "$5,000/$10,000", "$10,000/$25,000", "$25,000/$50,000"],
        defaultValue: "$5,000/$10,000",
      },
      {
        id: "employee-tools",
        label: "Employee Tools and Work Clothing",
        sublabel: "Any One Employee / All Equipment",
        options: ["$1,000/$2,500", "$2,500/$5,000", "$5,000/$10,000", "$10,000/$25,000"],
        defaultValue: "$2,500/$5,000",
      },
      {
        id: "newly-acquired",
        label: 'Newly Acquired or "Upgraded" Equipment',
        sublabel: "Any One Item",
        options: ["$100,000", "$250,000", "$500,000", "$1,000,000"],
        defaultValue: "$250,000",
      },
    ],
  },
  {
    id: "rental-expenses",
    title: "Rental Expenses",
    items: [
      {
        id: "continuing-rental",
        label: "Continuing Rental Expense",
        sublabel: "Any One Month / Any One Policy Year",
        options: ["$2,500/$5,000", "$5,000/$10,000", "$10,000/$25,000"],
        defaultValue: "$5,000/$10,000",
      },
      {
        id: "substitute-rental",
        label: "Rental Expense of Substitute Equipment",
        sublabel: "Any Working Day / Any One Policy Year",
        options: ["$250/$2,500", "$500/$5,000", "$1,000/$10,000"],
        defaultValue: "$500/$5,000",
      },
    ],
  },
  {
    id: "property-protection",
    title: "Property Protection",
    items: [
      {
        id: "protection-preservation",
        label: "Protection and Preservation of Property",
        options: ["$25,000", "$50,000", "$100,000"],
        defaultValue: "$50,000",
      },
      {
        id: "consequential-loss",
        label: "Consequential Loss to Undamaged Attachments",
        sublabel: "Not more than 25% of amount paid for direct physical loss",
        options: ["$5,000", "$10,000", "$25,000"],
        defaultValue: "$10,000",
      },
      {
        id: "spare-parts",
        label: "Spare Parts and Supplies",
        options: ["$5,000", "$10,000", "$25,000"],
        defaultValue: "$10,000",
      },
      {
        id: "expediting",
        label: "Expediting Expense",
        options: ["$10,000", "$25,000", "$50,000"],
        defaultValue: "$25,000",
      },
      {
        id: "fire-dept",
        label: "Fire Department Service Charge",
        options: ["$10,000", "$25,000", "$50,000"],
        defaultValue: "$25,000",
      },
    ],
  },
  {
    id: "additional-coverage",
    title: "Additional Coverage",
    items: [
      {
        id: "crime-reward",
        label: "Crime Reward",
        options: ["$1,000", "$5,000", "$10,000"],
        defaultValue: "$5,000",
      },
      {
        id: "loss-data-prep",
        label: "Loss Data Preparation Expense",
        options: ["$5,000", "$10,000", "$25,000"],
        defaultValue: "$10,000",
      },
      {
        id: "pollutant",
        label: "Pollutant Clean Up and Removal",
        options: ["$10,000", "$25,000", "$50,000"],
        defaultValue: "$25,000",
      },
      {
        id: "warranty",
        label: "Warranty or Service Contract",
        options: ["$5,000", "$10,000", "$25,000"],
        defaultValue: "$10,000",
      },
      {
        id: "fire-extinguish",
        label: "Recharge of Fire Extinguishing Equipment",
        options: ["$25,000", "$50,000", "$100,000"],
        defaultValue: "$50,000",
      },
      {
        id: "leased-loaned",
        label: "Equipment Leased, Rented or Loaned to Others",
        sublabel: "Any One Item / All Equipment",
        options: ["$25,000/$50,000", "$50,000/$100,000", "$100,000/$250,000"],
        defaultValue: "$50,000/$100,000",
      },
      {
        id: "inflation",
        label: "Inflation Protection",
        options: ["0%", "3%", "5%", "10%"],
        defaultValue: "3%",
      },
      {
        id: "debris-removal",
        label: "Debris Removal",
        options: ["$25,000", "$50,000", "$75,000", "$100,000"],
        defaultValue: "$75,000",
      },
    ],
  },
];

/**
 * Optional Forms — NOT shown to the agent.
 *
 * Backend behavior for Great American quotes:
 *   – "Locked Vehicle - Restricted Theft Coverage Endorsement" is always
 *     silently included in the API call. No agent action required.
 *   – "Existing Fire Exclusion" is never applied by default.
 *   – "Crane Exclusion" is never applied by default.
 *
 * Kept here for reference / API mapping; do not render in the UI.
 */
export const OPTIONAL_FORMS = [
  "Existing Fire Exclusion",
  "Locked Vehicle - Restricted Theft Coverage Endorsement",
  "Crane Exclusion",
];

export const AUTO_INCLUDED_OPTIONAL_FORMS = [
  "Locked Vehicle - Restricted Theft Coverage Endorsement",
];

/* ---------- Great American "Enhanced Coverage" package model ---------- */

/**
 * Coverages already bundled inside the Enhanced Coverage tier — shown
 * to the agent as a read-only summary. No premium impact when reviewed.
 */
export type IncludedCoverage = { label: string; sublabel: string };
export const INCLUDED_COVERAGES: IncludedCoverage[] = [
  { label: "Equipment Leased, Rented, Borrowed from Others", sublabel: "$50,000 / $100,000" },
  { label: "Office Furniture, Fixtures and Equipment", sublabel: "$5,000 / $10,000" },
  { label: "Employee Tools and Work Clothing", sublabel: "$2,500 / $5,000" },
  { label: "Continuing Rental Expense", sublabel: "$5,000 / $10,000" },
  { label: "Protection and Preservation of Property", sublabel: "$50,000" },
  { label: "Debris Removal", sublabel: "$75,000" },
];

/**
 * Optional coverages the agent can toggle on. Each on/off change should
 * trigger a re-rate.
 */
export type AddOn = {
  id: string;
  label: string;
  description: string;
};
export const OPTIONAL_ADDONS: AddOn[] = [
  {
    id: "hnoa",
    label: "Hired & Non-Owned Auto (HNOA)",
    description:
      "Covers liability when employees drive personal or rented vehicles for business purposes.",
  },
  {
    id: "newly-acquired-boost",
    label: "Newly Acquired Equipment Boost",
    description:
      "Automatically covers new equipment up to $500,000 for 90 days after purchase.",
  },
  {
    id: "inflation-guard",
    label: "Inflation Guard",
    description:
      "Annually increases equipment values by 5% to keep pace with replacement cost trends.",
  },
];
