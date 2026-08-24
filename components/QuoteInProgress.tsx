/* Carrier logos are cropped out of the original composite so each one can be
   sized independently (public/quote-progress.png is kept as the source). */
const LOGOS = [
  { src: "/levanta.png", alt: "levanta", width: 150 },
  { src: "/rivet.png", alt: "Rivet by Navigators", width: 140 },
  { src: "/great-american.png", alt: "Great American Insurance Group", width: 172 },
];

export function QuoteInProgress() {
  return (
    <div
      className="flex flex-col items-center justify-between rounded-2xl bg-white px-6 py-7 shadow-card ring-1 ring-black/5"
      style={{ width: "355px", height: "370px" }}
    >
      <img
        src="/quote-progress-header.png"
        alt="Quote in Progress…"
        className="h-auto select-none"
        style={{ width: "200px" }}
      />

      {LOGOS.map((l) => (
        <img
          key={l.src}
          src={l.src}
          alt={l.alt}
          className="h-auto select-none"
          style={{ width: `${l.width}px` }}
        />
      ))}
    </div>
  );
}
