import type { HotelData } from "@/schemas/hotelSchemas";
import {
    LucideMapPin,
    LucideStar,
    LucideHeart,
    LucideWifi,
    LucideCoffee,
    LucideShieldCheck,
} from "lucide-react";

type Props = {
    item: HotelData;
    handleClick: (id: HotelData["id"]) => void;
};

function HotelCard({ item, handleClick }: Props) {
    return (
        <article
            className="group bg-white border border-slate-200 rounded-3xl overflow-hidden cursor-pointer w-[276px] h-[420px] flex flex-col hover:shadow-lg"
            onClick={() => handleClick(item.id)}
        >
            {/* --- IMAGEN CON BADGE Y FAVORITO --- */}
            <div className="relative h-52 overflow-hidden">
                <img
                    src={item.mainImage}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Botón de favorito (estético) */}
                <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-600 hover:text-red-500 transition-colors">
                    <LucideHeart size={18} />
                </button>
                {/* Badge de "Recomendado" */}
                {item.rating >= 4.5 && (
                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold uppercase px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg">
                        <LucideShieldCheck size={12} /> Top Rated
                    </div>
                )}
            </div>

            {/* --- CONTENIDO --- */}
            <div className="p-4 flex flex-col flex-1 justify-between">
                <div className="space-y-2">
                    {/* Título y Rating */}
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-slate-800 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {item.name}
                        </h3>
                        <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                            <LucideStar size={14} className="fill-green-600 text-green-600" />
                            <span className="text-xs font-bold text-green-700">{item.rating}</span>
                        </div>
                    </div>

                    {/* Ubicación */}
                    <p className="text-slate-500 text-sm flex items-center gap-1">
                        <LucideMapPin size={14} className="text-blue-500" />
                        {item.city}
                    </p>

                    {/* Amenities (Iconos de relleno para diseño) */}
                    <div className="flex gap-3 text-slate-400 pt-1">
                        <LucideWifi size={16} strokeWidth={1.5} />
                        <LucideCoffee size={16} strokeWidth={1.5} />
                    </div>

                    <p className="text-xs italic text-slate-400 line-clamp-1">"{item.comment}"</p>
                </div>

                {/* --- PRECIO --- */}
                <div className="border-t border-slate-100 pt-3 mt-2 flex justify-between items-end">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-slate-400 leading-none">
                            Price per night
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-sm font-bold text-blue-600">USD</span>
                            <span className="text-2xl font-black text-slate-900">${item.pricePerNight}</span>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default HotelCard;
