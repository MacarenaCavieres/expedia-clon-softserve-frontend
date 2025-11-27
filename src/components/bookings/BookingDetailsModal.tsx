import type { BookingData } from "@/schemas/bookingSchemas";
import { BanknotesIcon } from "@heroicons/react/24/solid";

interface Props {
    reservationInfo: BookingData;
    handleClose: () => void;
}

export default function BookingDetailsModal({ reservationInfo, handleClose }: Props) {
    const guests = reservationInfo.guestNames
        ? reservationInfo.guestNames.split(",").map((g) => g.trim())
        : [];
    return (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-xl transform transition-all duration-300 scale-100 opacity-100">
                <h2 className="text-xl font-semibold mb-4">{reservationInfo.hotelName}</h2>

                <p className="text-sm text-gray-600 mb-2">
                    📅 {reservationInfo.checkInDate} → {reservationInfo.checkOutDate}
                </p>

                <p className="text-sm text-gray-600 mb-2 flex">
                    <BanknotesIcon className="h-6 w-6" />
                    <span>USD {reservationInfo.totalPrice}</span>
                </p>

                <p className="text-sm text-gray-600 mb-2">
                    🧑‍🤝‍🧑 {reservationInfo.passengerCount || 1} guest
                    {reservationInfo.passengerCount > 1 ? "s" : ""}
                </p>

                {/* ✅ GUEST LIST */}
                <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Guest Names:</h4>

                    {guests.length ? (
                        <ul className="text-sm text-gray-600 space-y-1">
                            {guests.map((name, idx) => (
                                <li key={idx}>• {name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-400 italic">No guest names provided</p>
                    )}
                </div>

                <p className="text-sm text-gray-600 mb-4">
                    Status: <strong>{reservationInfo.status}</strong>
                </p>

                <button
                    onClick={handleClose}
                    className="w-full mt-4 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 cursor-pointer"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
