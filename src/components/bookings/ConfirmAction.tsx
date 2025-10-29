import { useMutation } from "@apollo/client/react";
import { CANCEL_TRIP_MUTATION, DELETE_TRIP_MUTATION, ALL_BOOKINGS_QUERY } from "@/services/bookingAPI";
import { BookingStatus, type BookingData } from "@/types/index";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

type Props = {
    title: string;
    message: string;
    confirmButtonText: string;
    reservationInfo: BookingData | undefined;
    isCancel: boolean;
    buttonColor: string;
    handleClose: () => void;
};
function ConfirmAction({
    title,
    message,
    confirmButtonText,
    reservationInfo,
    isCancel,
    buttonColor,
    handleClose,
}: Props) {
    const [cancelTrip] = useMutation(CANCEL_TRIP_MUTATION, {
        onCompleted: () => {
            toast.success("Reservation successfully canceled");
            handleClose();
        },
        onError: (err) => toast.error(err.message),
    });

    const [deleteTrip] = useMutation(DELETE_TRIP_MUTATION, {
        refetchQueries: [{ query: ALL_BOOKINGS_QUERY }],
        onCompleted: () => {
            toast.success("Reservation successfully deleted");
            handleClose();
        },
        onError: (err) => toast.error(err.message),
    });

    const handleConfirm = async () => {
        if (!reservationInfo) return;

        if (isCancel) {
            await cancelTrip({
                variables: {
                    bookingId: reservationInfo.id,
                    status: BookingStatus.CANCELLED,
                },
            });
        } else {
            await deleteTrip({
                variables: { id: reservationInfo.id },
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/70 bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-xl w-full transform transition-all duration-300 scale-100 opacity-100">
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                    <button
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-150 cursor-pointer"
                        aria-label="Close modal"
                        onClick={handleClose}
                    >
                        <XMarkIcon className="h-8 w-8" />
                    </button>
                </div>

                <div className="p-4">
                    <h5 className="text-xl underline mb-3">Reservation Information</h5>
                    <p>Hotel: {reservationInfo?.hotelName}</p>
                    <p>
                        From: {reservationInfo?.checkInDate} To: {reservationInfo?.checkOutDate}
                    </p>
                    <p className="">Price: USD {reservationInfo?.totalPrice}</p>
                    <p className="text-gray-600 mt-5">{message}</p>
                </div>

                <div className="flex justify-end gap-3 p-4 border-gray-200">
                    <button
                        className="px-4 py-2 text-sm font-medium text-gray-700 cursor-pointer bg-white border border-gray-300 rounded-md hover:bg-gray-50  transition-colors duration-150"
                        onClick={handleClose}
                    >
                        Close
                    </button>

                    <button
                        className={`px-4 py-2 text-sm font-medium text-white cursor-pointer ${buttonColor} border border-transparent rounded-md   transition-colors duration-150`}
                        onClick={handleConfirm}
                    >
                        {confirmButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ConfirmAction;
