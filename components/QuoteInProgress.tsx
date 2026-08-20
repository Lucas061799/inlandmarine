export function QuoteInProgress() {
  return (
    <div
      className="rounded-2xl bg-white shadow-card ring-1 ring-black/5"
      style={{ width: "355px", height: "370px" }}
    >
      <img
        src="/quote-progress.png"
        alt="Quote in Progress — levanta, Rivet by Navigators"
        className="h-full w-full rounded-2xl object-contain object-top pt-2"
      />
    </div>
  );
}
