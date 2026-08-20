export function Mascot({ className = "" }: { className?: string }) {
  return (
    <img
      src="/mascot.svg"
      alt="Chat mascot"
      width={150}
      height={134}
      className={`select-none ${className}`}
    />
  );
}
