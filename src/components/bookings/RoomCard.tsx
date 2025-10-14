import type { Room } from "@/types/index";
import { useNavigate } from "react-router-dom";

type Props = {
    item: Room;
};
export default function RoomCard({ item }: Props) {
    const navigate = useNavigate();
    return (
        <article className="border border-slate-400 rounded-2xl pb-3 space-y-2 w-72">
            <img
                src={item.imageUrl}
                alt={`Room with bed type:${item.bedType}`}
                className="rounded-t-2xl w-xl h-52"
            />
            <div className="px-3 space-y-1">
                <p className="text-xl font-bold">{item.name}</p>
                <p className="font-semibold">Bed Type: {item.bedType}</p>
                <p>Capacity: {item.capacity} people</p>

                <div className="flex justify-end">
                    <p className="font-bold text-xl">USD {item.pricePerNight}</p>
                </div>
                <button
                    className="bg-[#1668e3] rounded-4xl p-2 w-full text-slate-100 mt-3 cursor-pointer"
                    onClick={() => navigate("/create-booking")}
                >
                    Reserve
                </button>
            </div>
        </article>
    );
}
