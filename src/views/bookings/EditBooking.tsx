import { useForm } from "@tanstack/react-form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { BOOKING_BY_ID_QUERY, UPDATE_BOOKING_MUTATION } from "@/services/bookingAPI";
import { useQuery, useMutation } from "@apollo/client/react";
import type { BookingById } from "@/schemas/bookingSchemas";

export default function EditBookingForm() {
    const navigate = useNavigate();
    const { bookingId } = useParams<{ bookingId: string }>();

    const {
        loading: isLoadingBooking,
        error: isError,
        data: existingBooking,
    } = useQuery<BookingById>(BOOKING_BY_ID_QUERY, {
        variables: { id: Number(bookingId) },
        fetchPolicy: "network-only",
    });

    const [updateBooking, { loading: updating, error: updateError }] = useMutation(UPDATE_BOOKING_MUTATION, {
        onCompleted: () => {
            toast.success("Reservation updated successfully");
            setTimeout(() => navigate("/my-trips"), 500);
        },
        onError: (err) => {
            toast.error(err.message || "Failed to update reservation.");
        },
    });

    const form = useForm({
        defaultValues: {
            totalGuests: existingBooking?.bookingById.passengerCount ?? 1,
            guestNames: existingBooking?.bookingById.guestNames ?? "",
        },
        onSubmit: async ({ value }) => {
            if (!existingBooking) {
                toast.error("Could not load data for update.");
                return;
            }

            await updateBooking({
                variables: {
                    id: Number(existingBooking.bookingById.id),
                    input: {
                        roomId: Number(existingBooking.bookingById.roomId),
                        passengerCount: Number(value.totalGuests),
                        checkInDate: existingBooking.bookingById.checkInDate,
                        checkOutDate: existingBooking.bookingById.checkOutDate,
                        guestNames: value.guestNames,
                    },
                },
            });
        },
    });

    if (isLoadingBooking) return <p className="text-center mt-8">Loading reservation information...</p>;
    if (isError) return <p className="text-center mt-8 text-red-600">Reservation not found.</p>;

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
            className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 space-y-4"
        >
            <h1 className="text-xl font-semibold">Edit Reservation #{bookingId}</h1>

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
                disabled={updating}
            >
                {updating ? "Saving..." : "Save Changes"}
            </button>

            {updateError && <p className="text-red-500 mt-2">{updateError.message}</p>}
        </form>
    );
}
