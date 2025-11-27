import type { PendingData } from "@/types/index";

type Props = {
    pendingData: PendingData;
    setIsConfirmOpen: (value: boolean) => void;
    handleConfirmBooking: () => Promise<void>;
    loading: boolean;
};
function ConfirmBookingModal({ pendingData, setIsConfirmOpen, handleConfirmBooking, loading }: Props) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
                <h2 className="text-xl font-bold">Confirm Reservation</h2>

                <div className="text-sm text-gray-700 space-y-1">
                    <p>
                        <strong>Room:</strong> {pendingData.roomId}
                    </p>
                    <p>
                        <strong>Total Price:</strong> USD {pendingData.totalPrice}
                    </p>
                    <p>
                        <strong>Check-in:</strong> {pendingData.checkInDate}
                    </p>
                    <p>
                        <strong>Check-out:</strong> {pendingData.checkOutDate}
                    </p>
                    <p>
                        <strong>Guests:</strong> {pendingData.totalGuests}
                    </p>
                    <p>
                        <strong>Guest Names:</strong> {pendingData.guestNames}
                    </p>
                </div>

                <div className="flex justify-end gap-3 pt-3">
                    <button
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
                        onClick={() => setIsConfirmOpen(false)}
                    >
                        Cancel
                    </button>

                    <button
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer disabled:bg-slate-600 disabled:cursor-not-allowed"
                        onClick={handleConfirmBooking}
                        disabled={loading}
                    >
                        {loading ? "Booking…" : "Confirm"}
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ConfirmBookingModal;
