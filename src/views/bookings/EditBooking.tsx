import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
// 🚨 Ensure updateBooking is available in bookingAPI
import { getBookingById, updateBooking } from "@/services/bookingAPI";
import type { ReservationFormData, BookingData } from "@/types/index";

export default function EditBookingForm() {
    const navigate = useNavigate();
    const { bookingId } = useParams<{ bookingId: string }>();

    const { data: existingBooking, isLoading: isLoadingBooking } = useQuery<BookingData>({
        queryKey: ["booking", bookingId],
        queryFn: () => getBookingById(+(bookingId ?? "0")),
        enabled: !!bookingId,
    });

    const mutation = useMutation({
        mutationFn: async (data: ReservationFormData) => {
            if (!existingBooking || !bookingId) {
                throw new Error("Could not load data for update.");
            }

            const payload = {
                roomId: existingBooking.roomId,
                checkInDate: existingBooking.checkInDate,
                checkOutDate: existingBooking.checkOutDate,
                totalGuests: data.totalGuests,
                guestNames: data.guestNames,
            };

            const { id } = existingBooking;

            return updateBooking(payload, id);
        },
        onSuccess: () => {
            toast.success("Reservation updated successfully");
            setTimeout(() => {
                navigate("/my-trips");
            }, 1500);
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update reservation.");
        },
    });

    const form = useForm({
        defaultValues: {
            totalGuests: existingBooking?.totalGuests ?? 1,
            guestNames: existingBooking?.guestNames ?? "",
        },
        onSubmit: ({ value }) => mutation.mutate(value),
    });

    if (isLoadingBooking) return <p className="text-center mt-8">Loading reservation information...</p>;
    if (!existingBooking) return <p className="text-center mt-8 text-red-600">Reservation not found.</p>;

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
                disabled={mutation.isPending}
            >
                {mutation.isPending ? "Saving..." : "Save Changes"}
            </button>

            {mutation.isError && <p className="text-red-500 mt-2">{(mutation.error as Error).message}</p>}
            {mutation.isSuccess && <p className="text-green-500 mt-2">Reservation updated successfully!</p>}
        </form>
    );
}
