import {
    clearBookingDetails,
    clearBookingId,
    setBookingDates,
    setBookingId,
    setRoomId,
} from "@/store/bookingSlice";
import { useAppDispatch } from "./storeHook";
import type { BookingData, SetBookingDatesPayload } from "@/schemas/bookingSchemas";
import type { SetRoomInfoPayload } from "../types";
export const useBookingActions = () => {
    const dispatch = useAppDispatch();

    const setBookingDatesStore = (bookingDates: SetBookingDatesPayload) => {
        dispatch(setBookingDates(bookingDates));
    };

    const setRoomInfoStore = (roomInfo: SetRoomInfoPayload) => {
        dispatch(setRoomId(roomInfo));
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
        setRoomInfoStore,
        setBookingIdStore,
        clearBookingStored,
        clearBookingIdStored,
    };
};
