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
        <div className="group w-full flex items-center justify-between py-5 px-6 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer">
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
                <button
                    onClick={() => handleEdit(item.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg hover:cursor-pointer"
                >
                    <PencilSquareIcon className="h-5 w-5 text-gray-600 " />
                </button>

                {item.status === BookingStatus.PENDING && (
                    <button
                        onClick={() => handleCancel(item.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg hover:cursor-pointer"
                    >
                        <XCircleIcon className="h-5 w-5 text-yellow-600" />
                    </button>
                )}

                <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg hover:cursor-pointer"
                >
                    <TrashIcon className="h-5 w-5 text-red-600" />
                </button>

                <button onClick={(e) =>{
                        e.stopPropagation();
                        openDetails();
                    }} className="p-2 hover: bg-gray-100 rounded-lg hover:cursor-pointer">
                    <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition" />
                </button>
            </div>
        </div>
    );
}
