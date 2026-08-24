"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mascot } from "./Mascot";

type Item = { label: string; href: string; children?: Item[] };

const NAV: Item[] = [
  { label: "Class Code Information", href: "/" },
  { label: "Applicant Information", href: "/applicant" },
  { label: "Coverage Options", href: "/coverage" },
  { label: "Underwriting Questions", href: "/underwriting" },
  { label: "Loss Payee", href: "/loss-payee" },
  {
    label: "Review & Select Payment",
    href: "/review",
    children: [
      { label: "Option 1", href: "/review" },
      { label: "Option 2", href: "/review/option-2" },
    ],
  },
  { label: "Sign and Request to Bind", href: "/sign-bind" },
];

export function Sidebar({ progress = 25 }: { progress?: number }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
  const showCoverageChildren = pathname.startsWith("/coverage");

  return (
    <aside
      aria-label="Sidebar navigation"
      className="sticky top-0 flex h-screen w-[365px] shrink-0 flex-col self-start overflow-hidden text-btis-navy"
      style={{
        backgroundColor: "#92CFA4",
        backgroundImage: "url(/b-watermark.svg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom",
        backgroundSize: "75%",
        paddingTop: "70px",
      }}
    >

      <div className="relative z-10 flex-1 px-5">
        <div className="text-[20px] font-medium tracking-[0.02em] text-white">
          SUBMISSION NUMBER
        </div>
        <div className="mt-1 text-[30px] font-medium leading-none tracking-wide text-btis-navy">
          QNI987654321
        </div>

        {/* progress */}
        <div className="mt-3 flex items-center gap-3">
          <div className="h-1.5 flex-1 rounded-full bg-white/80">
            <div
              className="h-full rounded-full"
              style={{ width: `${progress}%`, backgroundColor: "#FCDF50" }}
            />
          </div>
          <span className="text-[14px] font-medium text-btis-navy">{progress}%</span>
        </div>

        <nav className="mt-3 space-y-6">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={
                    active
                      ? "block whitespace-nowrap text-[24px] font-medium leading-tight text-btis-navy"
                      : "block whitespace-nowrap text-[24px] font-medium leading-tight text-white hover:text-btis-navy transition"
                  }
                >
                  {item.label}
                </Link>
                {item.children && (active || showCoverageChildren) && (
                  <div className="ml-2 mt-3 space-y-2 border-l-2 border-white/40 pl-3">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className={
                          pathname === c.href
                            ? "block text-[17px] font-semibold text-btis-navy"
                            : "block text-[17px] font-medium text-white hover:text-btis-navy transition"
                        }
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Mascot anchored to the bottom of the sidebar, sitting over the
          background-image b-watermark. */}
      <div className="relative z-10 mb-16 flex justify-center pl-14">
        <Mascot />
      </div>
    </aside>
  );
}
