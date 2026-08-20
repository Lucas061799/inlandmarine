import { AppShell } from "@/components/AppShell";
import { Mascot } from "@/components/Mascot";
import Link from "next/link";

export default function ChatPage() {
  return (
    <AppShell title="Chat">
      <div className="mx-auto max-w-md rounded-2xl bg-brand-gradient p-8 shadow-card">
        <div className="mb-6 flex justify-center">
          <Mascot />
        </div>
        <div className="space-y-4">
          <div className="mx-auto w-fit rounded-2xl bg-white px-5 py-3 text-[15px] shadow-soft">
            hello
          </div>
          <div className="mx-auto w-fit rounded-2xl bg-white/85 px-5 py-3 text-[15px] shadow-soft">
            chat window
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-start">
        <Link href="/review" className="btn-back">
          back
        </Link>
      </div>
    </AppShell>
  );
}
