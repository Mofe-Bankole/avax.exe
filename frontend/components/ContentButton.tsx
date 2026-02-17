import { ReactNode } from "react";

export default function ContentButton({ children }: { children: ReactNode }) {
    return (
        <button
            className="cta-button w-full cursor-pointer rounded-sm px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/40 md:w-auto"
        
        >
            {children}
        </button>
    );
}