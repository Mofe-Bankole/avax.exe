import { StatPillProps } from "@/lib/types";

export function StatPill({ label, value, caption }: StatPillProps) {
    return (
      <div className="rounded-2xl border border-neutral-800 bg-black/80 p-4">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
          {label}
        </p>
        <p className="mt-1 text-xl font-semibold text-white">{value}</p>
        <p className="mt-1 text-xs text-neutral-400">{caption}</p>
      </div>
    );
  }
  