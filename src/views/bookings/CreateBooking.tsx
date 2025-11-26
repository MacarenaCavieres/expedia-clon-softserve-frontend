import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { CREATE_BOOKING_MUTATION, ALL_BOOKINGS_QUERY } from "@/services/bookingAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Errors from "@/components/Errors";
import type { ReservationFormData } from "@/schemas/bookingSchemas";
import { reservationFormSchema } from "@/schemas/bookingSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

function CreateBooking() {
    const navigate = useNavigate();
    const { roomId, checkInDate, checkOutDate } = useSelector((state: RootState) => state.bookings);

    //Confirm modal state
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [pendingData, setPendingData] = useState<any>(null);

    const [createBooking, { loading, error }] = useMutation(CREATE_BOOKING_MUTATION, {
        refetchQueries: [{ query: ALL_BOOKINGS_QUERY }],
        onCompleted: () => {
            toast.success("Reservation created successfully");
            setTimeout(() => navigate("/my-trips"), 500);
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ReservationFormData>({
        resolver: zodResolver(reservationFormSchema),
        defaultValues: { totalGuests: "1", guestNames: "" },
        mode: "onChange",
        reValidateMode: "onChange",
    });

    const onSubmit = (formData: ReservationFormData) => {
        if (!roomId || !checkInDate || !checkOutDate) {
            toast.error("Reservation details (room or dates) are missing.");
            return;
        }

        setPendingData({
            roomId: roomId,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            totalGuests: +formData.totalGuests,
            guestNames: formData.guestNames,
        });
        setIsConfirmOpen(true);
    };

    const handleConfirmBooking = async () => {
        if (!pendingData) return;

        await createBooking({
            variables: {
                input: {
                    roomId: +pendingData.roomId,
                    checkInDate: pendingData.checkInDate,
                    checkOutDate: pendingData.checkOutDate,
                    passengerCount: pendingData.totalGuests,
                    guestNames: pendingData.guestNames,
                },
            },
        });
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 space-y-4"
            >
                <h1 className="text-xl font-semibold">Guest Details (New Reservation)</h1>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
                    <input className="border p-2 w-full rounded" {...register("totalGuests")}></input>
                    {errors.totalGuests && <Errors>{errors.totalGuests.message}</Errors>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Guest Names</label>
                    <input
                        className="border p-2 w-full rounded"
                        {...register("guestNames")}
                        placeholder="e.g. John Smith, Jane Doe"
                    ></input>
                    {errors.guestNames && <Errors>{errors.guestNames.message}</Errors>}
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Confirming..." : "Confirm Reservation"}
                </button>

                {error && <Errors>{error.message}</Errors>}
            </form>
            {isConfirmOpen && pendingData && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
                        <h2 className="text-xl font-bold">Confirm Reservation</h2>

                        <div className="text-sm text-gray-700 space-y-1">
                            <p>
                                <strong>Room:</strong> {pendingData.roomId}
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
                                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                                onClick={handleConfirmBooking}
                                disabled={loading}
                            >
                                {loading ? "Booking…" : "Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CreateBooking;
