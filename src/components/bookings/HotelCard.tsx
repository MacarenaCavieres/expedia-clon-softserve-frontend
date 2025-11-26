import type { HotelData } from "@/schemas/hotelSchemas";

type Props = {
    item: HotelData;
    handleClick: (id: HotelData["id"]) => void;
};
function HotelCard({ item, handleClick }: Props) {
    return (
        <article
            className="border border-slate-400 rounded-2xl pb-3 space-y-2 cursor-pointer w-72 h-96 flex flex-col"
            onClick={() => handleClick(item.id)}
        >
            <img src={item.mainImage} alt={item.name} className="rounded-t-2xl w-full h-52 object-cover" />
            <div className="px-3 space-y-1">
                <p className="font-bold">{item.name}</p>
                <p>{item.city}</p>
                <div className="flex items-center gap-1">
                    <p className="border rounded-lg p-2 text-xs font-bold bg-green-700 text-slate-100">
                        {item.rating}
                    </p>
                    <span className="text-sm font-semibold">{item.comment}</span>
                </div>

                <div className="flex flex-col items-end">
                    <p className="font-bold text-xl">USD {item.pricePerNight}</p>
                    <p className="font-ligth text-sm">Price per Nigth</p>
                </div>
            </div>
        </article>
    );
}
export default HotelCard;
