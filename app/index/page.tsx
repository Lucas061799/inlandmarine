import Link from "next/link";

const SCREENS: [string, string][] = [
  ["/", "1. Class Code Information"],
  ["/class-description", "2. Class Description modal"],
  ["/applicant", "3. Applicant Information"],
  ["/coverage", "4. Coverage Options"],
  ["/underwriting", "5. Underwriting Questions (all no)"],
  ["/loss-payee", "6. Loss Payee (no)"],
  ["/review", "7. Review & Select Payment"],
  ["/review/calendar", "8. Effective date calendar"],
  ["/chat", "9. Chat window"],
  ["/state-picker", "10. State list dropdown"],
  ["/underwriting/yes", "11. Underwriting Questions (yes triggers)"],
  ["/loss-payee/yes", "12. Loss Payee (yes, 1–4)"],
  ["/coverage/property", "13. Property Coverage – Office Contents"],
  ["/coverage/property/computer-systems", "14. Computer Systems tooltip"],
  ["/coverage/schedule-equipment", "15. Schedule Equipment form"],
  ["/coverage/schedule-equipment/info", "16. Scheduled Equipment tooltip"],
  ["/coverage/rented-leased", "17. Rented / Leased Equipment form"],
  ["/coverage/rented-leased/info", "18. Rented / Leased tooltip"],
  ["/coverage/misc-tools", "19. Miscellaneous Tools form"],
  ["/coverage/misc-tools/info", "20. Miscellaneous Tools tooltip"],
  ["/coverage/installation-floater", "21. Installation Floater form"],
  ["/coverage/installation-floater/info", "22. Installation Floater tooltip"],
];

export default function Index() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-semibold">Inland Marine UI — screen index</h1>
      <p className="mt-2 text-ink-soft">
        Direct-link list of every screen replicated from the Adobe XD prototype.
      </p>
      <ul className="mt-8 space-y-2">
        {SCREENS.map(([href, label]) => (
          <li key={href}>
            <Link
              href={href}
              className="text-brand-600 underline decoration-brand-400 underline-offset-2 hover:text-brand-700"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
