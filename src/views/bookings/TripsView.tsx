import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingDetailsModal from "@/components/bookings/BookingDetailsModal";
import BookingListItem from "@/components/bookings/BookingListItem";
import ConfirmAction from "@/components/bookings/ConfirmAction";
import { BookingStatus, type BookingData, type Bookings } from "@/schemas/bookingSchemas";
import { useQuery } from "@apollo/client/react";
import { ALL_BOOKINGS_QUERY } from "@/services/bookingAPI";
import { useBookingActions } from "@/hooks/useBookingActions";
import PaymentStatusAlert from "@/components/payment/PaymentStatusAlert";

function TripsView() {
    const navigate = useNavigate();
    const { setBookingIdStore } = useBookingActions();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reservationInfo, setReservationInfo] = useState<BookingData | undefined>(undefined);
    const [isCancel, setIsCancel] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const [alert, setAlert] = useState<{
        message: string | null;
        status: "SUCCESS" | "CONFIRMING" | "WARNING";
    } | null>(null);

    const { loading: isLoading, error: isError, data, refetch } = useQuery<Bookings>(ALL_BOOKINGS_QUERY);

    const handleCancelTrip = (id: BookingData["id"]) => {
        const booking = data?.allBookingsByUserId.find((item) => item.id === id);
        setIsModalOpen(true);
        setReservationInfo(booking);
        setIsCancel(true);
    };

    const handleDeleteTrip = (id: BookingData["id"]) => {
        const booking = data?.allBookingsByUserId.find((item) => item.id === id);
        setIsModalOpen(true);
        setReservationInfo(booking);
        setIsCancel(false);
    };

    const handleEditTrip = (id: BookingData["id"]) => {
        setBookingIdStore(id);
        navigate(`/edit-booking/${id}`);
    };

    const handleConfirmBooking = (id: BookingData["id"]) => {
        navigate(`/checkout/${id}`);
    };

    useEffect(() => {
        const saved = sessionStorage.getItem("paidBookingId");

        if (!saved) return;

        const { id } = JSON.parse(saved);

        setAlert({ message: "Payment successful. Confirming your reservation...", status: "CONFIRMING" });

        let attempts = 0;

        const interval = setInterval(async () => {
            attempts++;
            const result = await refetch();
            const updatedBooking = result.data?.allBookingsByUserId.find((booking) => booking.id === id);
            if (updatedBooking?.status === BookingStatus.CONFIRMED) {
                setAlert({ message: "Your reservation is confirmed and ready!", status: "SUCCESS" });
                sessionStorage.removeItem("paidBookingId");
                clearInterval(interval);

                setTimeout(() => setAlert(null), 5000);
            }
            if (attempts > 6) {
                setAlert({
                    message:
                        "Payment received, but confirmation is taking longer than expected. Please check your bookings list shortly.",
                    status: "WARNING",
                });
                sessionStorage.removeItem("paidBookingId");
                clearInterval(interval);
            }
        }, 1500);

        return () => clearInterval(interval);
    }, [refetch]);

    if (isLoading) return "Loading...";
    if (isError) return "Reservations could not be loaded";

    return (
        <div className="md:max-w-7xl mx-auto px-5 md:px-10 mt-10 min-h-screen">
            {alert && <PaymentStatusAlert message={alert.message!} status={alert.status} />}

            <h2 className="font-bold text-3xl mb-3">My Bookings</h2>
            <p className="font-gray-600 text-sm mb-8">
                View your reservation status, manage your bookings, or make changes anytime.
            </p>

            <section className="max-w.4xl mx-auto divide-y divide-gray-200 rounded-xl">
                {data?.allBookingsByUserId.length ? (
                    data.allBookingsByUserId.map((item) => (
                        <BookingListItem
                            item={item}
                            key={item.id}
                            handleCancel={handleCancelTrip}
                            handleDelete={handleDeleteTrip}
                            handleEdit={handleEditTrip}
                            openDetails={() => {
                                setReservationInfo(item);
                                setIsCancel(false);
                                setIsDetailsOpen(true);
                            }}
                            handleConfirm={handleConfirmBooking}
                        />
                    ))
                ) : (
                    <h6 className="text-center py-20 text-gray-500 text-lg">No trips booked yet</h6>
                )}
            </section>

            {isModalOpen && (
                <ConfirmAction
                    title={isCancel ? "Confirm cancellation" : "Confirm deletion"}
                    message={`Are you sure you want to ${
                        isCancel ? "cancel" : "permanently delete"
                    } the reservation? This action cannot be undone.`}
                    confirmButtonText={isCancel ? "Cancel reservation" : "Delete reservation"}
                    reservationInfo={reservationInfo}
                    isCancel={isCancel}
                    buttonColor={isCancel ? "bg-slate-600 hover:bg-slate-500" : "bg-red-600 hover:bg-red-700"}
                    handleClose={() => setIsModalOpen(false)}
                />
            )}
            {isDetailsOpen && reservationInfo && (
                <BookingDetailsModal
                    reservationInfo={reservationInfo}
                    handleClose={() => setIsDetailsOpen(false)}
                />
            )}
        </div>
    );
}

export default TripsView;
