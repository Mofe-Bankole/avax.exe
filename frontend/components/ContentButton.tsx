import { ReactNode } from "react";

export default function ContentButton({ children , bold }: { children: ReactNode , bold : boolean }) {
    return (
        <button
            className={bold ? `cta-button w-full cursor-pointer rounded-sm px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/40 md:w-auto` :`w-full rounded-sm border border-neutral-700 bg-neutral-950/60 px-6 py-3 text-sm font-medium cursor-pointer text-neutral-100 hover:border-neutral-500 hover:bg-neutral-900 md:w-auto` }
        
        >
            {children}
        </button>
    );
}