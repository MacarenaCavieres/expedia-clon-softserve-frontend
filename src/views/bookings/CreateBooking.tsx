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
import {
    LucideUserPlus,
    LucideUsers,
    LucideCalendar,
    LucideCreditCard,
    LucideInfo,
    LucideCheckCircle,
    LucideArrowLeft,
} from "lucide-react";

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

    const calculateNights = (): number => {
        if (!checkInDate || !checkOutDate) return 0;
        const start = new Date(checkInDate);
        const end = new Date(checkOutDate);
        const diff = end.getTime() - start.getTime();
        return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
    };

    const nights = calculateNights();

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
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Botón Volver */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 font-semibold transition-colors cursor-pointer"
                >
                    <LucideArrowLeft size={20} /> Back to room selection
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* --- COLUMNA IZQUIERDA: FORMULARIO --- */}
                    <section className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                                    <LucideUserPlus size={24} />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-black text-slate-800">Guest Information</h1>
                                    <p className="text-slate-500 text-sm">
                                        Please enter the details of the people staying.
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-slate-400 ml-1 flex items-center gap-2">
                                            <LucideUsers size={14} /> Total Guests
                                        </label>
                                        <input
                                            className={`w-full bg-slate-50 border-2 ${
                                                errors.totalGuests ? "border-red-200" : "border-slate-100"
                                            } rounded-2xl p-4 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium`}
                                            {...register("totalGuests")}
                                            placeholder="Number of people"
                                        />
                                        {errors.totalGuests && <Errors>{errors.totalGuests.message}</Errors>}
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold uppercase text-slate-400 ml-1 flex items-center gap-2">
                                            <LucideInfo size={14} /> Full Names
                                        </label>
                                        <textarea
                                            rows={3}
                                            className={`w-full bg-slate-50 border-2 ${
                                                errors.guestNames ? "border-red-200" : "border-slate-100"
                                            } rounded-2xl p-4 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium resize-none`}
                                            {...register("guestNames")}
                                            placeholder="e.g. John Doe, Jane Smith..."
                                        />
                                        {errors.guestNames && <Errors>{errors.guestNames.message}</Errors>}
                                    </div>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-2xl flex gap-3 items-start">
                                    <LucideCheckCircle className="text-blue-600 mt-1 shrink-0" size={18} />
                                    <p className="text-sm text-blue-800">
                                        <strong>Almost there!</strong> Your reservation is held for 30
                                        minutes. No payment is required right now.
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2 group disabled:bg-slate-300"
                                >
                                    {loading ? (
                                        "Processing..."
                                    ) : (
                                        <>
                                            Continue to Confirmation
                                            <LucideCreditCard
                                                size={20}
                                                className="group-hover:rotate-12 transition-transform"
                                            />
                                        </>
                                    )}
                                </button>
                                {error && <Errors>{error.message}</Errors>}
                            </form>
                        </div>
                    </section>

                    {/* --- COLUMNA DERECHA: RESUMEN --- */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 sticky top-28">
                            <h2 className="text-lg font-bold text-slate-800 mb-4">Price Summary</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 flex items-center gap-2">
                                        <LucideCalendar size={16} /> {nights} nights
                                    </span>
                                    <span className="font-semibold text-slate-700">
                                        USD ${totalPrice.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Taxes & Fees</span>
                                    <span className="font-semibold text-green-600">Included</span>
                                </div>

                                <hr className="border-slate-100" />

                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">Total Price</p>
                                        <p className="text-[10px] text-slate-400 uppercase font-bold">
                                            All inclusive
                                        </p>
                                    </div>
                                    <span className="text-3xl font-black text-blue-600">
                                        USD ${totalPrice}
                                    </span>
                                </div>
                            </div>

                            {/* Detalle de Fechas */}
                            <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                                        Check-in
                                    </span>
                                    <span className="font-bold text-slate-700">
                                        {checkInDate || "Not selected"}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                                        Check-out
                                    </span>
                                    <span className="font-bold text-slate-700">
                                        {checkOutDate || "Not selected"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {isConfirmOpen && pendingData && (
                <ConfirmBookingModal
                    pendingData={pendingData}
                    handleConfirmBooking={handleConfirmBooking}
                    setIsConfirmOpen={setIsConfirmOpen}
                    loading={loading}
                />
            )}
        </div>
    );
}

export default CreateBooking;
