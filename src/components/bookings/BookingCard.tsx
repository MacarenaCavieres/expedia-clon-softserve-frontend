import type { BookingData } from "@/types/index";
import { PencilSquareIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";

type Props = {
    item: BookingData;
    handleCancel: (id: BookingData["id"]) => void;
    handleDelete: (id: BookingData["id"]) => void;
    handleEdit: (id: BookingData["id"]) => void;
};
function BookingCard({ item, handleCancel, handleDelete, handleEdit }: Props) {
    return (
        <>
            <article className="bg-[#EEEEEE] border border-slate-300 rounded-2xl grid grid-cols-1 md:grid-cols-2 shadow-md pr-5">
                <div>
                    <img src={item.src} alt={item.name} className="w-64 rounded-bl-2xl rounded-tl-2xl h-44" />
                </div>
                <div className="flex flex-col justify-center">
                    <h6 className="text-2xl font-semibold mb-2 ml-5">{item.status}</h6>
                    <h5>
                        Hotel: <span className="font-semibold">{item.name}</span>
                    </h5>
                    <p>
                        From <span className="font-semibold">{item.fromDate}</span> To{" "}
                        <span className="font-semibold">{item.toDate}</span>
                    </p>
                    <p>
                        Price: <span className="font-semibold">{item.price}</span>
                    </p>
                    {item.status === "Upcoming Trip" ? (
                        <div className="flex gap-3 mt-2">
                            <button
                                aria-label="Edit booking"
                                className="bg-blue-800 hover:bg-blue-900 h-10 w-1/2 rounded-lg text-slate-100 flex items-center justify-center gap-2 uppercase cursor-pointer font-semibold"
                                onClick={() => handleEdit(item.id)}
                            >
                                <PencilSquareIcon className="h-6 w-6" />
                                Edit
                            </button>
                            <button
                                aria-label="Cancel booking"
                                className="bg-slate-600 hover:bg-slate-500 h-10 w-1/2 rounded-lg text-slate-100 flex items-center justify-center gap-2 cursor-pointer uppercase font-semibold"
                                onClick={() => handleCancel(item.id)}
                            >
                                <XCircleIcon className="h-6 w-6" />
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            aria-label="Delete booking"
                            className="bg-red-600 hover:bg-red-700 h-10 w-1/2 rounded-lg text-slate-100 flex items-center justify-center gap-2 cursor-pointer uppercase font-semibold mt-3"
                            onClick={() => handleDelete(item.id)}
                        >
                            <TrashIcon className="h-6 w-6" />
                            Delete
                        </button>
                    )}
                </div>
            </article>
        </>
    );
}
export default BookingCard;
