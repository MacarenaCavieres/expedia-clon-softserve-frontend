import { useMutation } from "@apollo/client/react";
import { useForm } from "@tanstack/react-form";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { CREATE_BOOKING_MUTATION, ALL_BOOKINGS_QUERY } from "@/services/bookingAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Errors from "@/components/Errors";
import { useState } from "react";

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

    const form = useForm({
        defaultValues: { totalGuests: 1, guestNames: "" },
        onSubmit: async ({ value }) => {
            if (!roomId || !checkInDate || !checkOutDate) {
                toast.error("Reservation details (room or dates) are missing.");
                return;
            }

            setPendingData({
                roomId,
                checkInDate,
                checkOutDate,
                totalGuests: value.totalGuests,
                guestNames: value.guestNames,
            });
            //Open Modal
            setIsConfirmOpen(true);

            // await createBooking({
            //     variables: {
            //         input: {
            //             roomId: +roomId,
            //             checkInDate,
            //             checkOutDate,
            //             passengerCount: value.totalGuests,
            //             guestNames: value.guestNames,
            //         },
            //     },
            // });
        },
    });

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
                className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 space-y-4"
            >
                <h1 className="text-xl font-semibold">Guest Details (New Reservation)</h1>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
                    <form.Field name="totalGuests">
                        {(field) => (
                            <input
                                type="number"
                                min={1}
                                value={field.state.value}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="border p-2 w-full rounded"
                            />
                        )}
                    </form.Field>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Guest Names</label>
                    <form.Field name="guestNames">
                        {(field) => (
                            <input
                                type="text"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder="e.g. John Smith, Jane Doe"
                                className="border p-2 w-full rounded"
                            />
                        )}
                    </form.Field>
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
                                onClick={async () => {
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
                                }}
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
