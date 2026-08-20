import Image from "next/image";

export default function ReferencePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1920px]">
        <div className="relative w-full" style={{ aspectRatio: "1920 / 1205" }}>
          <Image
            src="/screen-classcode.svg"
            alt="Production design reference"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>
    </main>
  );
}
