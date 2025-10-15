import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BookingData, SetBookingDatesPayload, SetRoomIdPayload } from "@/types/index";

type BookingState = {
    roomId: BookingData["id"] | null;
    checkInDate: BookingData["checkInDate"] | null;
    checkOutDate: BookingData["checkOutDate"] | null;
};

const initialState: BookingState = {
    roomId: null,
    checkInDate: null,
    checkOutDate: null,
};

const bookingSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {
        setRoomId: (state, action: PayloadAction<SetRoomIdPayload>) => {
            state.roomId = action.payload.roomId;
        },

        setBookingDates: (state, action: PayloadAction<SetBookingDatesPayload>) => {
            state.checkInDate = action.payload.checkInDate;
            state.checkOutDate = action.payload.checkOutDate;
        },

        clearBookingDetails: (state) => {
            state.roomId = null;
            state.checkInDate = null;
            state.checkOutDate = null;
        },
    },
});

export const { setRoomId, setBookingDates, clearBookingDetails } = bookingSlice.actions;
export default bookingSlice.reducer;
