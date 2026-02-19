import { LeaderboardRowProps } from "@/lib/types";
import Image from "next/image";

export function LeaderboardRow({ rank, name, mmr, wr, highlight, imageUrl }: LeaderboardRowProps) {
    return (
      <div
        className={`grid grid-cols-[1.5fr,0.7fr,0.7fr] items-center gap-2 rounded-xl px-3 py-2 ${
          highlight
            ? "bg-red-500/15 text-red-50 border border-red-500/50"
            : "text-neutral-200 hover:bg-neutral-900/70"
        }`}
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <Image src={imageUrl} alt="Profile Picture" width={50} height={50} className="rounded-full"/>
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
              highlight ? "bg-red-500/80 text-black" : "bg-neutral-900 text-neutral-200"
            }`}
          >
            {rank}
          </span>
          <span className="truncate text-xs font-medium">{name}</span>
        </div>
        <span className="text-right text-xs">{mmr}</span>
        <span className="text-right text-xs">{wr}</span>
      </div>
    );
  }