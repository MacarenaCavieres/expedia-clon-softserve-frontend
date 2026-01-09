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
import {
    LucideUserPlus,
    LucideUsers,
    LucideCalendar,
    LucideInfo,
    LucideArrowRight,
    LucideMapPin,
    LucideHotel,
    LucideLoader2,
} from "lucide-react";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";

export default function EditBookingForm() {
    const navigate = useNavigate();
    const { bookingId } = useParams<{ bookingId: string }>();

    const {
        loading: isLoadingBooking,
        error: isError,
        data: existingBooking,
        refetch,
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
        formState: { errors, isValid },
    } = useForm<ReservationFormData>({
        resolver: zodResolver(reservationFormSchema),
        defaultValues: {
            totalGuests: 1,
            guestNames: "",
            arrivalDate: "",
            exitDate: "",
        },
        mode: "onChange",
    });

    useEffect(() => {
        if (existingBooking?.bookingById) {
            reset({
                totalGuests: existingBooking.bookingById.passengerCount,
                guestNames: existingBooking.bookingById.guestNames,
                arrivalDate: existingBooking.bookingById.checkInDate,
                exitDate: existingBooking.bookingById.checkOutDate,
            });
        }
    }, [existingBooking, reset]);

    if (isLoadingBooking) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-slate-500">
                <Loader />
            </div>
        );
    }

    if (isError || !existingBooking) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <ErrorMessage message="Reservation not found" onRetry={refetch} />
            </div>
        );
    }

    const booking = existingBooking.bookingById;

    const onSubmit = async (data: ReservationFormData) => {
        await updateBooking({
            variables: {
                id: Number(booking.id),
                input: {
                    roomId: Number(booking.roomId),
                    passengerCount: Number(data.totalGuests),
                    checkInDate: data.arrivalDate,
                    checkOutDate: data.exitDate,
                    guestNames: data.guestNames,
                },
            },
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* --- COLUMNA IZQUIERDA: FORMULARIO --- */}
                <section className="md:col-span-2 space-y-6 order-2 md:order-1">
                    <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-200">
                                <LucideUserPlus size={24} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-slate-800">Edit Guests</h1>
                                <p className="text-slate-500 text-sm">
                                    Update the details for your stay at {booking.hotelName}.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 gap-8">
                                {/* Arrival */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-3">
                                        <label
                                            className="text-xs font-black uppercase text-slate-400 ml-1 flex items-center gap-2 tracking-wider"
                                            htmlFor="arrivalDate"
                                        >
                                            <LucideCalendar size={18} strokeWidth={2.5} /> Check-in
                                        </label>
                                        <input
                                            type="date"
                                            {...register("arrivalDate")}
                                            className="w-full border-none bg-slate-100 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none text-slate-700"
                                        />
                                        {errors.arrivalDate && <Errors>{errors.arrivalDate.message}</Errors>}
                                    </div>
                                    <div className="space-y-3">
                                        <label
                                            className="text-xs font-black uppercase text-slate-400 ml-1 flex items-center gap-2 tracking-wider"
                                            htmlFor="exitDate"
                                        >
                                            <LucideCalendar size={18} strokeWidth={2.5} /> Check-out
                                        </label>
                                        <input
                                            type="date"
                                            {...register("exitDate")}
                                            className="w-full border-none bg-slate-100 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none text-slate-700"
                                        />
                                        {errors.exitDate && <Errors>{errors.exitDate.message}</Errors>}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase text-slate-400 ml-1 flex items-center gap-2 tracking-wider">
                                        <LucideUsers size={14} /> Total Guests
                                    </label>
                                    <input
                                        className={`w-full bg-slate-50 border-2 ${
                                            errors.totalGuests ? "border-red-200" : "border-slate-100"
                                        } rounded-2xl p-4 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700`}
                                        {...register("totalGuests", {
                                            required: "Number of guests is required",
                                            valueAsNumber: true,
                                        })}
                                        type="number"
                                    />
                                    {errors.totalGuests && <Errors>{errors.totalGuests.message}</Errors>}
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase text-slate-400 ml-1 flex items-center gap-2 tracking-wider">
                                        <LucideInfo size={14} /> Guest Full Names
                                    </label>
                                    <textarea
                                        rows={4}
                                        className={`w-full bg-slate-50 border-2 ${
                                            errors.guestNames ? "border-red-200" : "border-slate-100"
                                        } rounded-2xl p-4 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-600 resize-none`}
                                        {...register("guestNames")}
                                        placeholder="Enter all names separated by commas..."
                                    />
                                    {errors.guestNames && <Errors>{errors.guestNames.message}</Errors>}
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <button
                                    type="submit"
                                    disabled={!isValid || updating}
                                    className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 group disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    {updating ? (
                                        <LucideLoader2 className="animate-spin" />
                                    ) : (
                                        <>
                                            Save Changes
                                            <LucideArrowRight
                                                size={20}
                                                className="group-hover:translate-x-1 transition-transform"
                                            />
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigate("/my-trips")}
                                    className="text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors cursor-pointer"
                                >
                                    Cancel and go back
                                </button>
                            </div>
                            {updateError && <Errors>{updateError.message}</Errors>}
                        </form>
                    </div>
                </section>

                {/* --- COLUMNA DERECHA: RESUMEN DEL VIAJE --- */}
                <aside className="md:col-span-1 order-1 md:order-2">
                    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 sticky top-10">
                        {/* Imagen del Hotel */}
                        <div className="relative h-48">
                            <img
                                src={booking.hotelImage}
                                alt={booking.hotelName}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-6 right-6">
                                <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-1">
                                    Current Booking
                                </p>
                                <h2 className="text-white text-xl font-black leading-tight">
                                    {booking.hotelName}
                                </h2>
                            </div>
                        </div>

                        <div className="p-8 space-y-6">
                            {/* Ubicación */}
                            <div className="flex items-center gap-3 text-slate-500">
                                <LucideMapPin size={18} className="text-blue-600" />
                                <span className="text-sm font-bold">{booking.hotelCity}</span>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Fechas */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                                        Check-in
                                    </p>
                                    <div className="flex items-center gap-2 text-slate-700">
                                        <LucideCalendar size={14} className="text-blue-600" />
                                        <span className="text-sm font-bold">{booking.checkInDate}</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                                        Check-out
                                    </p>
                                    <div className="flex items-center gap-2 text-slate-700">
                                        <LucideCalendar size={14} className="text-blue-600" />
                                        <span className="text-sm font-bold">{booking.checkOutDate}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Status Badge */}
                            <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between">
                                <span className="text-xs font-black text-slate-400 uppercase">Status</span>
                                <span className="bg-yellow-100 text-yellow-700 text-[10px] font-black px-3 py-1 rounded-full uppercase">
                                    {booking.status}
                                </span>
                            </div>

                            {/* Precio Total */}
                            <div className="pt-4 border-t border-slate-100">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">Total to Pay</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">
                                            Taxes included
                                        </p>
                                    </div>
                                    <span className="text-3xl font-black text-blue-600">
                                        ${booking.totalPrice}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-2xl flex items-start gap-3">
                                <LucideHotel size={18} className="text-blue-600 mt-0.5" />
                                <p className="text-[11px] text-blue-700 font-medium leading-relaxed">
                                    You are editing the guest list for Room{" "}
                                    <span className="font-bold">#{booking.roomId}</span>. Room type cannot be
                                    changed from this form.
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
