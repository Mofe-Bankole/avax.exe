import { FeatureCardProps } from "@/lib/types";

export function FeatureCard({ title, accent, description, children }: FeatureCardProps) {
    return (
      <div
        className="flex h-full flex-col justify-between rounded-2xl border p-4 avalanche-border avalanche-background"

      >
        <div className="space-y-3">
          <span className="inline-flex rounded-full bg-red-500/20 px-2 py-0.5 text-[11px] font-medium text-red-200">
            {accent}
          </span>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-neutral-300">{description}</p>
        </div>
        {children && <div className="mt-4">{children}</div>}
      </div>
    );
  }3
  
  