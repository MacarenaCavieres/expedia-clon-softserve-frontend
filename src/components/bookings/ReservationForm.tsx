import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { createBooking } from "@/services/bookingAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { createBookingPayload, ReservationFormData } from "@/types/index";
import { getOrGenerateSessionId } from "@/utils/sesionUtils";

export default function CreateBookingForm() {
    const navigate = useNavigate();
    const { roomId, checkInDate, checkOutDate } = useSelector((state: RootState) => state.bookings);

    const mutation = useMutation({
        mutationFn: async (data: ReservationFormData) => {
            if (!roomId || !checkInDate || !checkOutDate) {
                throw new Error("Reservation details (room or dates) are missing.");
            }

            // --- OBTENER SESSION ID ---
            const sessionId = getOrGenerateSessionId(); // <-- OBTENER ID

            // --- CONSTRUIR PAYLOAD ---
            const payload: createBookingPayload = {
                // <-- Usar el tipo actualizado
                sessionId: sessionId, // <-- AÑADIR SESSION ID
                roomId,
                checkInDate,
                checkOutDate,
                passengerCount: data.totalGuests,
                guestNames: data.guestNames,
            };

            // Llamar a la API con el payload completo
            return createBooking(payload);
        },
        onSuccess: () => {
            toast.success("Reservation created successfully");
            setTimeout(() => {
                navigate("/my-trips");
            }, 1000);
        },
        onError: (error) => {
            toast.error(error.message || "Failed to create reservation");
        },
    });

    const form = useForm({
        defaultValues: {
            totalGuests: 1,
            guestNames: "",
        },
        onSubmit: ({ value }) => mutation.mutate(value),
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
                disabled={mutation.isPending}
            >
                {mutation.isPending ? "Confirming..." : "Confirm Reservation"}
            </button>

            {mutation.isError && <p className="text-red-500 mt-2">{(mutation.error as Error).message}</p>}
            {mutation.isSuccess && <p className="text-green-500 mt-2">Reservation created successfully!</p>}
        </form>
    );
}
