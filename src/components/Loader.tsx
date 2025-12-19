import { Loader2 } from "lucide-react";

function Loader() {
    return (
        <div className="min-h-[60vh] w-full flex flex-col items-center justify-center gap-8 p-8 animate-in fade-in duration-500">
            <img src="/logo.svg" alt="Logo" className="w-32 md:w-40 drop-shadow-sm" />

            <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-12 w-12 animate-spin text-slate-900" strokeWidth={1.5} />
                <p className="text-slate-400 text-sm font-medium animate-pulse">Loading experience...</p>
            </div>
        </div>
    );
}
export default Loader;
