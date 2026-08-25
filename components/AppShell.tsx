import { Sidebar } from "./Sidebar";
import { BtisLogo } from "./BtisLogo";
import { QuoteInProgress } from "./QuoteInProgress";

/*
  The sidebar and the right-hand rail hold fixed widths, so they take 896px
  before the form gets any. Below 1280px there is not enough left for a quote
  card — and because the rail is positioned against the viewport rather than
  the layout, it would sit on top of the content instead of pushing it. Drop
  the rail and the logo at that point and give the form their gutter.
*/
const RAIL_BREAKPOINT = "min-[1280px]:block";
const PAD_LEFT = "pl-10 min-[1280px]:pl-[108px]";
const PAD_RIGHT = "pr-10 min-[1280px]:pr-[575px]"; // rail + generous gutter
const PAD_RIGHT_WIDE = "pr-10 min-[1280px]:pr-[423px]"; // rail + small gutter

export function AppShell({
  title: _title,
  children,
  progress = 25,
  wide = false,
}: {
  title?: string;
  children: React.ReactNode;
  progress?: number;
  /** Reclaim most of the right-hand gutter — the fixed rail is only 375px wide. */
  wide?: boolean;
}) {
  return (
    <div className="relative min-h-screen w-full bg-white">
      {/* BTIS logo pinned top-right, horizontally centered with the Quote card below */}
      <div
        className={`fixed top-0 z-50 hidden ${RAIL_BREAKPOINT}`}
        style={{ right: "62.5px" }}
      >
        <BtisLogo />
      </div>

      {/* Quote in Progress card — flush to the viewport's right edge, vertically centered */}
      <div
        className={`fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 ${RAIL_BREAKPOINT}`}
      >
        <QuoteInProgress />
      </div>

      <div className="flex min-h-screen w-full">
        <Sidebar progress={progress} />

        <main
          className={`relative flex min-w-0 flex-1 flex-col pb-12 pt-24 ${PAD_LEFT} ${
            wide ? PAD_RIGHT_WIDE : PAD_RIGHT
          }`}
        >
          <div className="flex-1">{children}</div>
        </main>
      </div>
    </div>
  );
}
