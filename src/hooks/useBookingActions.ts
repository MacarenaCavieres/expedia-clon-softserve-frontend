import {
    clearBookingDetails,
    clearBookingId,
    setBookingDates,
    setBookingId,
    setRoomId,
} from "@/store/bookingSlice";
import { useAppDispatch } from "./storeHook";
import type { BookingData, SetBookingDatesPayload} from "@/schemas/bookingSchemas";
import type { SetRoomIdPayload } from "@/schemas/hotelSchemas";
export const useBookingActions = () => {
    const dispatch = useAppDispatch();

    const setBookingDatesStore = (bookingDates: SetBookingDatesPayload) => {
        dispatch(setBookingDates(bookingDates));
    };

    const setRoomIdStore = (bookingRoomId: SetRoomIdPayload) => {
        dispatch(setRoomId(bookingRoomId));
    };

    const setBookingIdStore = (bookingId: BookingData["id"]) => {
        dispatch(setBookingId({ bookingId }));
    };

    const clearBookingStored = () => {
        dispatch(clearBookingDetails());
    };

    const clearBookingIdStored = () => {
        dispatch(clearBookingId());
    };

    return {
        setBookingDatesStore,
        setRoomIdStore,
        setBookingIdStore,
        clearBookingStored,
        clearBookingIdStored,
    };
};
