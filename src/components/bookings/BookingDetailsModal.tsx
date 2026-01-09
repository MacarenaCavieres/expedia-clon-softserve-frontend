import { BookingStatus, type BookingData } from "@/schemas/bookingSchemas";
import React from "react";

interface Props {
    reservationInfo: BookingData;
    handleClose: () => void;
}

const DetailRow: React.FC<{ label: string; value: string | number | React.ReactNode; emoji: string }> = ({
    label,
    value,
    emoji,
}) => (
    <div className="flex justify-between items-center py-1.5 border-b last:border-b-0 border-gray-100">
        <span className="text-sm font-medium text-gray-500 flex items-center">
            <span className="mr-3 text-lg">{emoji}</span>
            {label}
        </span>
        <span className="text-sm font-semibold text-gray-800">{value}</span>
    </div>
);

export default function BookingDetailsModal({ reservationInfo, handleClose }: Props) {
    const guests = reservationInfo.guestNames
        ? reservationInfo.guestNames.split(",").map((g) => g.trim())
        : [];

    let statusClass = "bg-gray-200 text-gray-700";
    if (reservationInfo.status === BookingStatus.PENDING) {
        statusClass = "bg-yellow-100 text-yellow-700 border border-yellow-300";
    } else if (reservationInfo.status === BookingStatus.CANCELLED) {
        statusClass = "bg-red-100 text-red-700 border border-red-300";
    } else if (reservationInfo.status === BookingStatus.CONFIRMED) {
        statusClass = "bg-green-100 text-green-700 border border-green-300";
    }

    const displayBookingId = (reservationInfo as any).id || "N/A";

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all duration-300 scale-100 opacity-100 flex flex-col max-h-full">
                <div className="relative flex-shrink-0">
                    <img
                        src={reservationInfo.hotelImage}
                        alt={`Image of ${reservationInfo.hotelName}`}
                        className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-start justify-end p-5">
                        <span className="mb-1 px-3 py-1 text-xs font-bold uppercase rounded-full tracking-wider text-white border border-white/50">
                            Booking ID: {displayBookingId}
                        </span>
                        <h2 className="text-2xl font-extrabold text-white tracking-wider">
                            {reservationInfo.hotelName}
                        </h2>
                    </div>
                </div>

                <div className="p-6 space-y-4 overflow-y-auto flex-1">
                    <div className={`text-center py-2 rounded-lg font-bold uppercase ${statusClass}`}>
                        Status: {reservationInfo.status}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-700 mb-2">Trip Summary:</h3>

                        <DetailRow label="Check-in Date" value={reservationInfo.checkInDate} emoji="➡️" />
                        <DetailRow label="Check-out Date" value={reservationInfo.checkOutDate} emoji="⬅️" />
                        <DetailRow
                            label="Total Guests"
                            value={`${reservationInfo.passengerCount || 1}`}
                            emoji="🧑‍🤝‍🧑"
                        />
                    </div>

                    <div className="p-4 bg-green-100 rounded-lg flex justify-between items-center border border-green-300">
                        <span className="text-base font-bold text-green-800">💰 Total Price:</span>
                        <span className="text-xl font-extrabold text-green-900">
                            USD {reservationInfo.totalPrice}
                        </span>
                    </div>

                    <div className="pt-3">
                        <h4 className="text-sm font-bold text-gray-700 mb-2 border-b pb-1">Guest Names:</h4>
                        {guests.length ? (
                            <ul className="text-sm text-gray-600 space-y-1 pl-4 list-disc">
                                {guests.map((name, idx) => (
                                    <li key={idx} className="leading-relaxed">
                                        {name}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-400 italic">No specific guest names provided.</p>
                        )}
                    </div>
                </div>

                <div className="p-6 pt-0">
                    <button
                        onClick={handleClose}
                        className="w-full bg-gray-800 text-white py-2.5 rounded-lg font-semibold hover:bg-gray-700 transition duration-150 cursor-pointer"
                    >
                        Close Details
                    </button>
                </div>
            </div>
        </div>
    );
}
