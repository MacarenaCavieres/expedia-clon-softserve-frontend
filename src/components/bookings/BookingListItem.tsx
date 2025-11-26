import { BookingStatus, type BookingData } from "@/schemas/bookingSchemas";
import {
    ChevronRightIcon,
    PencilSquareIcon,
    TrashIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";

interface Props {
    item: BookingData;
    handleCancel: (id: BookingData["id"]) => void;
    handleDelete: (id: BookingData["id"]) => void;
    handleEdit: (id: BookingData["id"]) => void;
    openDetails: () => void;
}

export default function BookingListItem({
    item,
    handleCancel,
    handleDelete,
    handleEdit,
    openDetails,
}: Props) {
    const statusColor =
        item.status === BookingStatus.PENDING
            ? "bg-yellow-100 text-yellow-700"
            : item.status === BookingStatus.CANCELLED
            ? "bg-red-100 text-red-700"
            : "bg-green-100 text-green-700";

    return (
        <div className="group w-full flex items-center justify-between 
            gap-6 p-6 mb-4 rounded-xl border border-gray-200 bg-white shadow-sm hover: shadow-md transition-all cursor-pointer">
            {/* MAIN CONTENT */}
            <div className="flex flex-col cursor-pointer" onClick={openDetails}>
                <span className="text-lg font-semibold">{item.hotelName}</span>

                <span className="text-sm text-gray-500">
                    {item.checkInDate} → {item.checkOutDate}
                </span>

                <span className="text-sm text-gray-500 mt-1">
                    🧑‍🤝‍🧑 {item.passengerCount || 1} guest{item.passengerCount > 1 ? "s" : ""}
                </span>

                <span
                    className={`mt-2 text-xs font-semibold px-2 py-1 rounded-full w-fit ${statusColor}`}
                >
                    {item.status}
                </span>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">
                {/* Edit button */}
                <div className="relative group/icon">
                    <button
                        onClick={() => handleEdit(item.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg hover:cursor-pointer"
                    >
                        <PencilSquareIcon className="h-5 w-5 text-gray-600 " />
                    </button>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover/icon:opacity-100 transition pointer-events-none whitespace-nowrap">
                    Edit booking</span>
                </div>

                {/* Cancel button */}
                <div className="relative group/icon">
                {item.status === BookingStatus.PENDING && (
                    <button
                        onClick={() => handleCancel(item.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg hover:cursor-pointer"
                    >
                        <XCircleIcon className="h-5 w-5 text-yellow-600" />
                    </button>
                )}
                    <span
                        className="
                            absolute -top-8 left-1/2 -translate-x-1/2
                            bg-black text-white text-xs px-2 py-1 rounded opacity-0
                            group-hover/icon:opacity-100 transition whitespace-nowrap
                        "
                    > Cancel booking</span>
                </div>

                {/*Delete button */}
                <div className="relative group/icon">
                    <button
                        onClick={() => item.status === BookingStatus.CANCELLED && handleDelete(item.id)}
                        disabled={item.status !== BookingStatus.CANCELLED}
                        className={`
                            p-2 rounded-lg
                            ${item.status === BookingStatus.CANCELLED 
                                ? "hover:bg-gray-100 cursor-pointer" 
                                : "opacity-40 cursor-not-allowed"
                            }
                        `}
                    >
                        <TrashIcon className="h-5 w-5 text-red-600" />
                    </button>

                    <span
                        className="
                            absolute -top-8 left-1/2 -translate-x-1/2
                            bg-black text-white text-xs px-2 py-1 rounded opacity-0
                            group-hover/icon:opacity-100 transition whitespace-nowrap
                        "
                    >
                        {item.status === BookingStatus.CANCELLED 
                            ? "Delete booking"
                            : "Cancel first to delete"}
                    </span>
                </div>

                {/*Details button */}
                <div className="relative group/icon">
                    <button onClick={(e) =>{
                            e.stopPropagation();
                            openDetails();
                        }} className="p-2 hover: bg-gray-100 rounded-lg hover:cursor-pointer">
                        <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition" />
                    </button>
                    <span
                        className="
                            absolute -top-8 left-1/2 -translate-x-1/2
                            bg-black text-white text-xs px-2 py-1 rounded opacity-0
                            group-hover/icon:opacity-100 transition whitespace-nowrap
                        "
                    > Details</span>
                </div>
            </div>
        </div>
    );
}
