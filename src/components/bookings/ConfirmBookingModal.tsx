import type { PendingData } from "@/types/index";

type Props = {
    pendingData: PendingData;
    setIsConfirmOpen: (value: boolean) => void;
    handleConfirmBooking: () => Promise<void>;
    loading: boolean;
};

const DetailRow: React.FC<{ label: string; value: string | number; emoji: string }> = ({
    label,
    value,
    emoji,
}) => (
    <div className="flex justify-between items-center py-1.5 border-b last:border-b-0 border-gray-100">
        <span className="text-sm font-medium text-gray-500 flex items-center">
            <span className="mr-2">{emoji}</span>
            {label}
        </span>
        <span className="text-sm font-semibold text-gray-800">{value}</span>
    </div>
);

function ConfirmBookingModal({ pendingData, setIsConfirmOpen, handleConfirmBooking, loading }: Props) {
    const roomImageUrl =
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjUyOXwwfDF8c2VhcmNofDR8fGhvdGVsJTIwcm9vbXxlbnwwfHx8fDE2NzMyNTQ1NDl8MA&ixlib=rb-4.0.3&q=80&w=400";

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
                <div className="relative">
                    <img
                        src={roomImageUrl}
                        alt="Image of the reserved room"
                        className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <h2 className="text-2xl font-extrabold text-white tracking-wider">
                            🎉 Booking Confirmation
                        </h2>{" "}
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    {" "}
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-md">
                        {" "}
                        <p className="text-sm text-blue-800 font-semibold">
                            You are about to confirm! Please review the details.
                        </p>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-lg font-bold text-gray-700 mb-2">Reservation Details:</h3>{" "}
                        <DetailRow label="Room" value={pendingData.roomId} emoji="🏨" />
                        <DetailRow label="Guests" value={pendingData.totalGuests} emoji="👨‍👩‍👧‍👦" />
                        <DetailRow label="Guest Names" value={pendingData.guestNames} emoji="🏷️" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-lg font-bold text-gray-700 mb-2">Stay Dates:</h3>{" "}
                        <DetailRow label="Check-in" value={pendingData.checkInDate} emoji="➡️" />
                        <DetailRow label="Check-out" value={pendingData.checkOutDate} emoji="⬅️" />
                    </div>
                    <div className="p-4 bg-green-100 rounded-lg flex justify-between items-center border border-green-300">
                        <span className="text-base font-bold text-green-800">💰 Total Price:</span>
                        <span className="text-xl font-extrabold text-green-900">
                            USD {pendingData.totalPrice}
                        </span>
                    </div>
                </div>

                <div className="p-4 bg-gray-50 flex justify-end gap-3 border-t">
                    {" "}
                    <button
                        className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition duration-150 cursor-pointer"
                        onClick={() => setIsConfirmOpen(false)}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-150 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                        onClick={handleConfirmBooking}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Booking…
                            </>
                        ) : (
                            "Confirm Booking"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmBookingModal;
