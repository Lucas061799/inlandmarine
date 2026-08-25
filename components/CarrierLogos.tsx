/* Carrier logos (PNG assets in /public). Rivet is the Navigators brand used
   on this program, cropped out of the original quote-progress composite. */

export function GreatAmericanLogo({ className = "h-auto w-48" }: { className?: string }) {
  return (
    <img
      src="/great-american.png"
      alt="Great American Insurance Group"
      width={322}
      height={156}
      className={`${className} select-none`}
    />
  );
}

export function NavigatorsLogo({ className = "h-auto w-48" }: { className?: string }) {
  return (
    <img
      src="/rivet.png"
      alt="Rivet by Navigators"
      width={474}
      height={181}
      className={`${className} select-none`}
    />
  );
}

export function CarrierLogo({
  id,
  className,
}: {
  id: "GA" | "NAV";
  className?: string;
}) {
  return id === "GA" ? (
    <GreatAmericanLogo className={className} />
  ) : (
    <NavigatorsLogo className={className} />
  );
}
