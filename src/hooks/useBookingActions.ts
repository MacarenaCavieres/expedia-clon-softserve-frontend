import { clearBookingDetails, setBookingDates, setRoomId } from "@/store/bookingSlice";
import { useAppDispatch } from "./storeHook";
import type { SetBookingDatesPayload, SetRoomIdPayload } from "@/types/index";

export const useBookingActions = () => {
    const dispatch = useAppDispatch();

    const setBookingDatesStore = (bookingDates: SetBookingDatesPayload) => {
        dispatch(setBookingDates(bookingDates));
    };

    const setRoomIdStore = (bookinRommId: SetRoomIdPayload) => {
        dispatch(setRoomId(bookinRommId));
    };

    const clearBookingStored = () => {
        dispatch(clearBookingDetails());
    };

    return {
        setBookingDatesStore,
        setRoomIdStore,
        clearBookingStored,
    };
};
