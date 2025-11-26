import { BookingStatus, type BookingData } from "@/schemas/bookingSchemas";
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
            <article className="bg-[#EEEEEE] border border-slate-300 rounded-2xl grid grid-cols-1 md:grid-cols-2 shadow-md md:pr-5 pb-5 md:pb-0 w-full max-w-sm md:max-w-3xl mx-auto">
                <div>
                    <img
                        src={item.hotelImage}
                        alt={item.hotelName}
                        className="md:rounded-tr-none md:rounded-bl-2xl rounded-tl-2xl rounded-tr-2xl w-full md:w-3/4 md:h-full"
                    />
                </div>
                <div className="flex flex-col justify-center pl-2 md:pl-0 mx-auto md:mx-0 mt-5 md:mt-0 py-3">
                    <h6 className="text-2xl font-semibold mb-2 ml-5">{item.status}</h6>
                    <h5>
                        Hotel: <span className="font-semibold">{item.hotelName}</span>
                    </h5>
                    <p>
                        From <span className="font-semibold">{item.checkInDate}</span> To{" "}
                        <span className="font-semibold">{item.checkOutDate}</span>
                    </p>
                    <p>
                        Total Guests: <span className="font-semibold">{item.passengerCount}</span>
                    </p>
                    <p>
                        Guest Name: <span className="font-semibold">{item.guestNames}</span>
                    </p>

                    <p>
                        Price: <span className="font-semibold">USD ${item.totalPrice}</span>
                    </p>
                    {item.status === BookingStatus.PENDING ? (
                        <div className="flex gap-2 mt-2">
                            <button
                                aria-label="Edit booking"
                                className="bg-blue-800 hover:bg-blue-900 h-10 w-full rounded-lg text-slate-100 flex items-center justify-center gap-2 uppercase cursor-pointer font-semibold"
                                onClick={() => handleEdit(item.id)}
                            >
                                <PencilSquareIcon className="h-6 w-6" />
                                Edit
                            </button>
                            <button
                                aria-label="Cancel booking"
                                className="bg-slate-600 hover:bg-slate-500 h-10 w-full rounded-lg text-slate-100 flex items-center justify-center gap-2 cursor-pointer uppercase font-semibold"
                                onClick={() => handleCancel(item.id)}
                            >
                                <XCircleIcon className="h-6 w-6" />
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-center md:flex-none md:justify-normal">
                            <button
                                aria-label="Delete booking"
                                className="bg-red-600 hover:bg-red-700 h-10 w-1/2 rounded-lg text-slate-100 flex items-center justify-center gap-2 cursor-pointer uppercase font-semibold mt-3"
                                onClick={() => handleDelete(item.id)}
                            >
                                <TrashIcon className="h-6 w-6" />
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </article>
        </>
    );
}
export default BookingCard;
