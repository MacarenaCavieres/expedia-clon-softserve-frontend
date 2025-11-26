import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { BOOKING_BY_ID_QUERY, UPDATE_BOOKING_MUTATION } from "@/services/bookingAPI";
import { useQuery, useMutation } from "@apollo/client/react";
import type { BookingById, ReservationFormData } from "@/schemas/bookingSchemas";
import { reservationFormSchema } from "@/schemas/bookingSchemas";
import Errors from "@/components/Errors";

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
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ReservationFormData>({
        resolver: zodResolver(reservationFormSchema),
        defaultValues: {
            totalGuests: "1",
            guestNames: "",
        },
        mode: "onChange",
        reValidateMode: "onChange",
    });

    // Cargar datos cuando llega la reserva
    useEffect(() => {
        if (existingBooking?.bookingById) {
            reset({
                totalGuests: existingBooking.bookingById.passengerCount.toString(),
                guestNames: existingBooking.bookingById.guestNames,
            });
        }
    }, [existingBooking, reset]);

    const onSubmit = async (data: ReservationFormData) => {
        if (!existingBooking) {
            toast.error("Unable to update reservation.");
            return;
        }

        await updateBooking({
            variables: {
                id: Number(existingBooking.bookingById.id),
                input: {
                    roomId: Number(existingBooking.bookingById.roomId),
                    passengerCount: Number(data.totalGuests),
                    checkInDate: existingBooking.bookingById.checkInDate,
                    checkOutDate: existingBooking.bookingById.checkOutDate,
                    guestNames: data.guestNames,
                },
            },
        });
    };

    if (isLoadingBooking) return <p className="text-center mt-8">Loading reservation information...</p>;
    if (isError) return <p className="text-center mt-8 text-red-600">Reservation not found.</p>;

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 space-y-4"
        >
            <h1 className="text-xl font-semibold">Edit Reservation #{bookingId}</h1>

            <div>
                <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
                <input
                    type="number"
                    min={1}
                    className="border p-2 w-full rounded"
                    {...register("totalGuests")}
                />
                {errors.totalGuests && <Errors>{errors.totalGuests.message}</Errors>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Guest Names</label>
                <input
                    type="text"
                    className="border p-2 w-full rounded"
                    {...register("guestNames")}
                    placeholder="e.g. John Smith, Jane Doe"
                />
                {errors.guestNames && <Errors>{errors.guestNames.message}</Errors>}
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full cursor-pointer"
                disabled={updating}
            >
                {updating ? "Saving..." : "Save Changes"}
            </button>

            {updateError && <Errors>{updateError.message}</Errors>}
        </form>
    );
}
