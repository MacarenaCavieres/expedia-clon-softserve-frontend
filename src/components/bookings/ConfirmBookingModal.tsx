import type { PendingData } from "@/types/index";
import {
    LucideCheckCircle2,
    LucideX,
    LucideLoader2,
    LucideCalendar,
    LucideUsers,
    LucideTag,
} from "lucide-react";

type Props = {
    pendingData: PendingData;
    setIsConfirmOpen: (value: boolean) => void;
    handleConfirmBooking: () => Promise<void>;
    loading: boolean;
};

function ConfirmBookingModal({ pendingData, setIsConfirmOpen, handleConfirmBooking, loading }: Props) {
    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
            {/* CAMBIO 1: max-h-[90vh] asegura que el modal nunca ocupe más del 90% de la pantalla */}
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl w-full max-w-lg border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden">
                {/* Cabecera - flex-shrink-0 para que la imagen no se aplaste */}
                <div className="relative h-40 md:h-56 flex-shrink-0 flex flex-col items-center justify-center text-white text-center p-6 md:p-8 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjUyOXwwfDF8c2VhcmNofDR8fGhvdGVsJTIwcm9vbXxlbnwwfHx8fDE2NzMyNTQ1NDl8MA&ixlib=rb-4.0.3&q=80&w=600"
                        alt="Reserved Room"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/50 backdrop-extra-sm"></div>

                    <div className="relative z-10">
                        <LucideCheckCircle2 className="mx-auto mb-2 text-blue-400" size={36} />
                        <h2 className="text-xl md:text-2xl font-black drop-shadow-md">Verify your Trip</h2>
                        <p className="text-blue-50 text-xs md:text-sm mt-1 opacity-90 font-medium">
                            Review everything before we book
                        </p>
                    </div>

                    <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-white rounded-full z-20"></div>
                    <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-white rounded-full z-20"></div>
                </div>

                {/* CAMBIO 2: overflow-y-auto en el CUERPO del modal */}
                <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4 md:gap-6 bg-slate-50 p-5 md:p-6 rounded-3xl border border-dashed border-slate-200">
                        <div className="space-y-1">
                            <span className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1">
                                <LucideCalendar size={12} /> Check-In
                            </span>
                            <p className="font-bold text-slate-700 text-sm md:text-base">
                                {pendingData.checkInDate}
                            </p>
                        </div>
                        <div className="space-y-1 text-right">
                            <span className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1 justify-end">
                                <LucideCalendar size={12} /> Check-Out
                            </span>
                            <p className="font-bold text-slate-700 text-sm md:text-base">
                                {pendingData.checkOutDate}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1">
                                <LucideUsers size={12} /> Guests
                            </span>
                            <p className="font-bold text-slate-700 text-sm md:text-base">
                                {pendingData.totalGuests} People
                            </p>
                        </div>
                        <div className="space-y-1 text-right">
                            <span className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1 justify-end">
                                <LucideTag size={12} /> Total Price
                            </span>
                            <p className="font-black text-blue-600 text-lg md:text-xl">
                                USD ${pendingData.totalPrice}
                            </p>
                        </div>

                        <div className="col-span-2 border-t border-slate-200 my-1 pt-4">
                            <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">
                                Guest Names
                            </span>
                            <p className="text-sm font-medium text-slate-600 italic leading-relaxed">
                                "{pendingData.guestNames}"
                            </p>
                        </div>
                    </div>
                </div>

                {/* CAMBIO 3: Botones fijos al fondo (fuera del scroll del cuerpo) */}
                <div className="p-6 md:p-8 pt-0 flex-shrink-0 bg-white">
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={handleConfirmBooking}
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 md:py-4 rounded-2xl transition-all shadow-lg active:scale-[0.98] disabled:bg-slate-300 cursor-pointer flex items-center justify-center gap-2"
                        >
                            {loading ? <LucideLoader2 className="animate-spin" /> : "Confirm & Pay Later"}
                        </button>

                        <button
                            onClick={() => setIsConfirmOpen(false)}
                            disabled={loading}
                            className="w-full text-slate-400 hover:text-slate-600 font-bold py-1 md:py-2 text-sm transition-colors cursor-pointer flex items-center justify-center gap-1"
                        >
                            <LucideX size={16} /> Edit details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmBookingModal;
