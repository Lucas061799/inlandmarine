import Image from "next/image";

export function BtisLogo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/btis-logo.svg"
      alt="BTIS Marketplace"
      width={230}
      height={138}
      priority
      className={className}
    />
  );
}
