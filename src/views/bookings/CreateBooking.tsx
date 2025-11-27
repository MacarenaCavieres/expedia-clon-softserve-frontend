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
import type { PendingData } from "@/types/index";
import ConfirmBookingModal from "@/components/bookings/ConfirmBookingModal";

function CreateBooking() {
    const navigate = useNavigate();
    const { roomId, checkInDate, checkOutDate, roomPrice } = useSelector(
        (state: RootState) => state.bookings
    );

    //Confirm modal state
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [pendingData, setPendingData] = useState<PendingData>();

    const [createBooking, { loading, error }] = useMutation(CREATE_BOOKING_MUTATION, {
        refetchQueries: [{ query: ALL_BOOKINGS_QUERY }],
        onCompleted: () => {
            toast.success("Reservation created successfully");
            navigate("/my-trips");
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

    const calculateTotal = (): number => {
        if (!checkInDate || !checkOutDate || !roomPrice || +roomPrice <= 0) {
            return 0;
        }
        const startDate = new Date(checkInDate);
        const endDate = new Date(checkOutDate);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return 0;
        }
        const timeDiff = endDate.getTime() - startDate.getTime();
        const dayDiff = Math.round(timeDiff / (1000 * 60 * 60 * 24));

        if (dayDiff <= 0) {
            return 0;
        }
        return dayDiff * +roomPrice;
    };

    const totalPrice = calculateTotal();

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
            totalPrice: totalPrice,
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
                <ConfirmBookingModal
                    pendingData={pendingData}
                    handleConfirmBooking={handleConfirmBooking}
                    setIsConfirmOpen={setIsConfirmOpen}
                    loading={loading}
                />
            )}
        </>
    );
}

export default CreateBooking;
