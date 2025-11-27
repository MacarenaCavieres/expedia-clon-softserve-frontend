import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BookingDetailsModal from "@/components/bookings/BookingDetailsModal";
import BookingListItem from "@/components/bookings/BookingListItem";
import ConfirmAction from "@/components/bookings/ConfirmAction";
import type { BookingData, Bookings } from "@/schemas/bookingSchemas";
import { useQuery } from "@apollo/client/react";
import { ALL_BOOKINGS_QUERY } from "@/services/bookingAPI";
import { useBookingActions } from "@/hooks/useBookingActions";

function TripsView() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { setBookingIdStore } = useBookingActions();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reservationInfo, setReservationInfo] = useState<BookingData | undefined>(undefined);
    const [isCancel, setIsCancel] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

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
        refetch();
    }, []);

    if (isLoading) return "Loading...";
    if (isError) return "Reservations could not be loaded";
    if (data)
        return (
            <>
                {state?.message && (
                    <div className="bg-green-600 text-white p-3 rounded mb-4">{state.message}</div>
                )}
                <h2 className="font-bold text-3xl mb-3">My Bookings</h2>
                <p className="font-gray-600 text-sm mb-8">
                    View your reservation status, manage your bookings, or make changes anytime.
                </p>

                <section className="max-w.4xl mx-auto divide-y divide-gray-200 rounded-xl">
                    {data.allBookingsByUserId.length ? (
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
                        message={`Are you sure you want to  ${
                            isCancel ? "cancel" : "permanently delete"
                        } the reservation? This action cannot be undone.`}
                        confirmButtonText={isCancel ? "Cancel reservation" : "Delete reservation"}
                        reservationInfo={reservationInfo}
                        isCancel={isCancel}
                        buttonColor={
                            isCancel ? "bg-slate-600 hover:bg-slate-500" : "bg-red-600 hover:bg-red-700"
                        }
                        handleClose={() => setIsModalOpen(false)}
                    />
                )}
                {isDetailsOpen && reservationInfo && (
                    <BookingDetailsModal
                        reservationInfo={reservationInfo}
                        handleClose={() => setIsDetailsOpen(false)}
                    />
                )}
            </>
        );
}
export default TripsView;
