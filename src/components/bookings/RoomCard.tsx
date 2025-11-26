import { useBookingActions } from "@/hooks/useBookingActions";
import type { SetRoomIdPayload, Room } from "@/schemas/hotelSchemas";
import { useNavigate } from "react-router-dom";
import {useState} from "react";

type Props = {
    item: Room;
};

// Emojis per bed type
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
    const { setRoomIdStore } = useBookingActions();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleClick = () => {
        const bookingInfo: SetRoomIdPayload = {
            roomId: item.id,
        };
        setRoomIdStore(bookingInfo);
        navigate("/create-booking");
    };

    return (
        <article className="border border-slate-400 rounded-2xl pb-3 space-y-2 w-72">
            <img
                src={item.imageUrl}
                alt={`Room with bed type:${item.bedType}`}
                className="rounded-t-2xl w-xl h-52 hover:cursor-pointer"
                onClick={() =>setSelectedImage(item.imageUrl)}
            />
            <div className="px-3 space-y-1">
                <p className="text-xl font-bold">{item.name}</p>

                <p className="font-semibold">Bed Type: {bedEmoji[item.bedType]} {item.bedType}</p>
                <p>Capacity: {capacityEmoji(item.capacity)} {item.capacity} people</p>

                <div className="flex justify-end">
                    <p className="font-bold text-xl">USD ${item.pricePerNight}</p>
                </div>
                <button
                    className="bg-[#1668e3] rounded-4xl p-2 w-full text-slate-100 mt-3 cursor-pointer flex items-center justify-center gap-2"
                    onClick={handleClick}
                >
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z" clip-rule="evenodd"/>
                        </svg>
                    Book Now 
                </button>
            </div>
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                        {/* Close button */}
                        <button
                            className="absolute top-3 right-3 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl hover:bg-black/80 transition cursor-pointer"
                            onClick={() => setSelectedImage(null)}
                        >
                            x
                        </button>
                        <img
                            src={selectedImage}
                            className="max-w-4xl max-h-[90vh] rounded-2xl"
                        />
                    </div>
                </div>
                
            )}
        </article>
    );
}
