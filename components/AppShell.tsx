import { Sidebar } from "./Sidebar";
import { BtisLogo } from "./BtisLogo";
import { QuoteInProgress } from "./QuoteInProgress";

const RIGHT_COL_WIDTH = 375; // reserved space for logo + quote card column (355 card + gutter)
const RIGHT_COL_GUTTER = 200; // extra breathing room on the right of the form
const RIGHT_COL_GUTTER_WIDE = 48; // for content that needs the width (e.g. side-by-side quote cards)

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
      <div className="fixed top-0 z-50" style={{ right: "62.5px" }}>
        <BtisLogo />
      </div>

      {/* Quote in Progress card — flush to the viewport's right edge, vertically centered */}
      <div className="fixed right-0 top-1/2 z-40 -translate-y-1/2">
        <QuoteInProgress />
      </div>

      <div className="flex min-h-screen w-full">
        <Sidebar progress={progress} />

        <main
          className="relative flex min-w-0 flex-1 flex-col pb-12 pt-24"
          style={{
            paddingLeft: "108px",
            paddingRight: `${
              RIGHT_COL_WIDTH + (wide ? RIGHT_COL_GUTTER_WIDE : RIGHT_COL_GUTTER)
            }px`,
          }}
        >
          <div className="flex-1">{children}</div>
        </main>
      </div>
    </div>
  );
}
