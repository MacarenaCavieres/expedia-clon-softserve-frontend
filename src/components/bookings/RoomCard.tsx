import { useBookingActions } from "@/hooks/useBookingActions";
import type { Room } from "@/schemas/hotelSchemas";
import type { SetRoomInfoPayload } from "@/types/index";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    LucideBedDouble,
    LucideUsers,
    LucideMaximize2,
    LucideX,
    LucideArrowRight,
    LucideCheckCircle2,
} from "lucide-react";

type Props = {
    item: Room;
};

const bedEmoji: Record<string, string> = {
    KING: "👑🛏️",
    QUEEN: "👸🛏️",
    DOUBLE: "🛏️🛏️",
    TWIN: "👯‍♂️🛏️",
    SINGLE: "🛏️",
};

const capacityEmoji = (capacity: number) => {
    if (capacity === 1) return "🙂";
    if (capacity === 2) return "👫";
    if (capacity === 3) return "👨‍👩‍👦";
    if (capacity === 4) return "👨‍👩‍👧‍👦";
    return "👥";
};

export default function RoomCard({ item }: Props) {
    const navigate = useNavigate();
    const { setRoomInfoStore } = useBookingActions();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleBooking = () => {
        const bookingInfo: SetRoomInfoPayload = {
            roomId: item.id,
            roomPrice: item.pricePerNight,
        };
        setRoomInfoStore(bookingInfo);
        navigate("/create-booking");
    };

    return (
        <article className="group bg-white border border-slate-200 rounded-3xl overflow-hidden w-72 h-[480px] flex flex-col shadow-sm hover:shadow-xl transition-all duration-300">
            {/* --- CONTENEDOR DE IMAGEN --- */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={item.imageUrl}
                    alt={`Room ${item.name}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay de "Ampliar" */}
                <button
                    onClick={() => setSelectedImage(item.imageUrl)}
                    className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                    <div className="bg-white/90 p-2 rounded-full text-slate-800 shadow-lg">
                        <LucideMaximize2 size={20} />
                    </div>
                </button>
                {/* Badge de Precio Flotante */}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-xl shadow-lg">
                    <p className="text-blue-600 font-black text-lg">
                        ${item.pricePerNight}{" "}
                        <span className="text-[10px] text-slate-400 uppercase">/ night</span>
                    </p>
                </div>
            </div>

            {/* --- CONTENIDO --- */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex-1 space-y-4">
                    <h3 className="text-xl font-extrabold text-slate-800 leading-tight">{item.name}</h3>

                    {/* Especificaciones con Badges y Emojis */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-100">
                            <LucideBedDouble size={18} className="text-blue-500" />
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-slate-400">
                                    Bed Configuration
                                </span>
                                <span className="text-sm font-semibold text-slate-700">
                                    {bedEmoji[item.bedType]} {item.bedType}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-100">
                            <LucideUsers size={18} className="text-blue-500" />
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-slate-400">
                                    Max Capacity
                                </span>
                                <span className="text-sm font-semibold text-slate-700">
                                    {capacityEmoji(item.capacity)} {item.capacity} Guests
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Beneficio extra */}
                    <div className="flex items-center gap-2 text-green-600 text-xs font-bold">
                        <LucideCheckCircle2 size={14} />
                        <span>Free cancellation available</span>
                    </div>
                </div>

                {/* --- BOTÓN DE ACCIÓN --- */}
                <button
                    onClick={handleBooking}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-100 group/btn active:scale-95 cursor-pointer"
                >
                    Book Now
                    <LucideArrowRight
                        size={18}
                        className="group-hover/btn:translate-x-1 transition-transform"
                    />
                </button>
            </div>

            {/* --- MODAL DE IMAGEN --- */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="absolute -top-12 right-0 text-white hover:text-blue-400 transition-colors flex items-center gap-2 font-bold"
                            onClick={() => setSelectedImage(null)}
                        >
                            Close <LucideX size={24} />
                        </button>
                        <img
                            src={selectedImage}
                            className="w-full h-auto max-h-[85vh] object-contain rounded-3xl shadow-2xl border-4 border-white/10"
                            alt="Full view"
                        />
                    </div>
                </div>
            )}
        </article>
    );
}
