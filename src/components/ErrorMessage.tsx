import { LucideAlertCircle, LucideRefreshCcw } from "lucide-react";

type Props = {
    message: string;
    onRetry?: () => void;
};

export default function ErrorMessage({ message, onRetry }: Props) {
    return (
        <div className="min-h-[60vh] w-full flex flex-col items-center justify-center p-6 animate-in zoom-in-95 duration-300">
            <div className="max-w-md w-full bg-red-50 border border-red-100 p-8 rounded-[2.5rem] flex flex-col items-center text-center shadow-xl shadow-red-900/5">
                <div className="bg-red-100 text-red-600 p-4 rounded-3xl mb-6">
                    <LucideAlertCircle size={48} strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-black text-red-900 uppercase tracking-tighter mb-2">
                    Something went wrong
                </h3>

                <p className="text-red-700/70 text-sm font-medium leading-relaxed mb-8">
                    {message || "We couldn't process your request at this time. Please try again later."}
                </p>

                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all hover:shadow-lg active:scale-95"
                    >
                        <LucideRefreshCcw size={14} />
                        Try Again
                    </button>
                )}
            </div>

            <img src="/logo.svg" alt="Logo" className="w-24 mt-12 opacity-20 grayscale" />
        </div>
    );
}
