import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingCard from "@/components/bookings/BookingCard";
import ConfirmAction from "@/components/bookings/ConfirmAction";
import type { BookingData, Bookings } from "@/types/index";
import { useQuery } from "@apollo/client/react";
import { ALL_BOOKINGS_QUERY } from "@/services/bookingAPI";
import { useBookingActions } from "@/hooks/useBookingActions";

function TripsView() {
    const navigate = useNavigate();
    const { setBookingIdStore } = useBookingActions();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reservationInfo, setReservationInfo] = useState<BookingData | undefined>(undefined);
    const [isCancel, setIsCancel] = useState(false);

    const { loading: isLoading, error: isError, data } = useQuery<Bookings>(ALL_BOOKINGS_QUERY);

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

    const handleClose = () => {
        setIsModalOpen(false);
    };

    if (isLoading) return "Loading...";
    if (isError) return "Reservations could not be loaded";
    if (data)
        return (
            <>
                <h2 className="font-bold text-2xl mb-2">My Bookings</h2>
                <p className="font-semibold text-sm">
                    Need to make a change? Here, you can view your trip status, modify dates or details, and
                    cancel any reservation swiftly.
                </p>

                <section className="mt-10 space-y-2 max-w-3xl mx-auto ">
                    {data.allBookingsByUserId.length ? (
                        data.allBookingsByUserId.map((item) => (
                            <BookingCard
                                item={item}
                                key={item.id}
                                handleCancel={handleCancelTrip}
                                handleDelete={handleDeleteTrip}
                                handleEdit={handleEditTrip}
                            />
                        ))
                    ) : (
                        <h6 className="text-3xl text-center mt-10 font-bold">No trips booked yet</h6>
                    )}
                </section>
                {isModalOpen && (
                    <ConfirmAction
                        title={
                            isCancel
                                ? "Confirm cancellation of the reservation"
                                : "Confirm deletion of the reservation"
                        }
                        message={`Are you sure you want to  ${
                            isCancel ? "cancel" : "permanently delete"
                        } the reservation? This action cannot be undone.`}
                        confirmButtonText={isCancel ? "Cancel reservation" : "Delete reservation"}
                        reservationInfo={reservationInfo}
                        isCancel={isCancel}
                        buttonColor={
                            isCancel ? "bg-slate-600 hover:bg-slate-500" : "bg-red-600 hover:bg-red-700"
                        }
                        handleClose={handleClose}
                    />
                )}
            </>
        );
}
export default TripsView;
