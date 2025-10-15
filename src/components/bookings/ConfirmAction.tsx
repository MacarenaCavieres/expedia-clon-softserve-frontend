import type { BookingData } from "@/types/index";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
    title: string;
    message: string;
    confirmButtonText: string;
    reservationInfo: BookingData | undefined;
    buttonColor: string;
    handleClose: () => void;
};
function ConfirmAction({
    title,
    message,
    confirmButtonText,
    reservationInfo,
    buttonColor,
    handleClose,
}: Props) {
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
                    >
                        {confirmButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ConfirmAction;
