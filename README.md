# Inland Marine UI

Next.js + Tailwind CSS replica of the BTIS Marketplace "Inland Marine" submission
flow prototype ([Adobe XD source](https://xd.adobe.com/view/05a9048e-8ec4-416c-b36b-de13add65e61-50fa/)).

All 23 prototype screens are reproduced as individual routes under the App Router.

## Run

```bash
npm install
npm run dev
```

Then open http://localhost:3000 (or whichever port Next.js picks).

Visit `/index` for a link-list of every screen.

## Screen map

| # | Route | Prototype screen |
|---|-------|------------------|
| 1 | `/` | Class Code Information |
| 2 | `/class-description` | Class Description modal |
| 3 | `/applicant` | Applicant Information |
| 4 | `/coverage` | Coverage Options selector |
| 5 | `/underwriting` | Underwriting Questions – all no |
| 6 | `/loss-payee` | Loss Payee – no |
| 7 | `/review` | Review & Select Payment |
| 8 | `/review/calendar` | Effective date calendar |
| 9 | `/chat` | Chat window |
| 10 | `/state-picker` | State list dropdown |
| 11 | `/underwriting/yes` | Underwriting Questions – yes triggers |
| 12 | `/loss-payee/yes` | Loss Payee – yes (1–4) |
| 13 | `/coverage/property` | Property Coverage – Office Contents |
| 14 | `/coverage/property/computer-systems` | Computer Systems tooltip |
| 15 | `/coverage/schedule-equipment` | Schedule Equipment form |
| 16 | `/coverage/schedule-equipment/info` | Scheduled Equipment tooltip |
| 17 | `/coverage/rented-leased` | Rented / Leased Equipment form |
| 18 | `/coverage/rented-leased/info` | Rented / Leased tooltip |
| 19 | `/coverage/misc-tools` | Miscellaneous Tools form |
| 20 | `/coverage/misc-tools/info` | Miscellaneous Tools tooltip |
| 21 | `/coverage/installation-floater` | Installation Floater form |
| 22 | `/coverage/installation-floater/info` | Installation Floater tooltip |

## Structure

- `app/` – route pages (23 screens)
- `components/` – `AppShell`, `Sidebar`, `BtisLogo`, `Mascot`, `FormControls`, `InfoModal`
- `lib/states.ts` – US state list
- `tailwind.config.ts` – brand palette sampled from the prototype
- `app/globals.css` – shared field, button, checkbox styles
