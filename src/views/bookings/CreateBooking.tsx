import { useMutation } from "@apollo/client/react";
import { useForm } from "@tanstack/react-form";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { CREATE_BOOKING_MUTATION, ALL_BOOKINGS_QUERY } from "@/services/bookingAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Errors from "@/components/Errors";

function CreateBooking() {
    const navigate = useNavigate();
    const { roomId, checkInDate, checkOutDate } = useSelector((state: RootState) => state.bookings);

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

            await createBooking({
                variables: {
                    input: {
                        roomId: +roomId,
                        checkInDate,
                        checkOutDate,
                        passengerCount: value.totalGuests,
                        guestNames: value.guestNames,
                    },
                },
            });
        },
    });

    return (
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
    );
}

export default CreateBooking;
