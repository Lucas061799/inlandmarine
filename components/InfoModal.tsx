export function InfoModal({
  title,
  children,
  onClose,
}: {
  title?: string;
  children: React.ReactNode;
  onClose?: string; // href to close (route to page without ?info)
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/10 p-6">
      <div className="max-h-[80vh] w-full max-w-xl overflow-auto rounded-2xl bg-brand-gradient p-8 text-white shadow-card">
        {title && <div className="mb-4 text-lg font-semibold">{title}</div>}
        <div className="space-y-3 text-[13px] leading-relaxed">{children}</div>
        {onClose && (
          <div className="mt-6 flex justify-end">
            <a
              href={onClose}
              className="rounded-md bg-white/90 px-4 py-1 text-[12px] text-brand-700 hover:bg-white"
            >
              close
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
