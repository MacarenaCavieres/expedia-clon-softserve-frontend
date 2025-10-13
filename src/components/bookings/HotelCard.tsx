import type { HotelData } from "@/types/index";
import { useNavigate } from "react-router-dom";

type Props = {
    item: HotelData;
};
function HotelCard({ item }: Props) {
    const navigate = useNavigate();
    return (
        <article
            className="border border-slate-400 rounded-2xl pb-3 space-y-2 cursor-pointer w-72"
            onClick={() => navigate(`/${item.id}`)}
        >
            <img src={item.src} alt={item.name} className="rounded-t-2xl w-xl h-52" />
            <div className="px-3 space-y-1">
                <p className="font-bold">{item.name}</p>
                <p>{item.city}</p>
                <div className="flex items-center gap-1">
                    <p className="border rounded-lg p-2 text-xs font-bold bg-green-700 text-slate-100">
                        {item.score}
                    </p>
                    <span className="text-sm font-semibold">{item.comment}</span>
                </div>

                <div className="flex justify-end">
                    <p className="font-bold text-xl">{item.price}</p>
                </div>
            </div>
        </article>
    );
}
export default HotelCard;
