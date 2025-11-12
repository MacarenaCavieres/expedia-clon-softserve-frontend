import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SetBookingDatesPayload, SetRoomIdPayload } from "@/types/index";
import type { BookingData, setBookingIdPayload } from "@/schemas/bookingSchemas";
import type { Room } from "@/schemas/hotelSchemas";

type BookingState = {
    roomId: Room["id"] | null;
    checkInDate: BookingData["checkInDate"] | null;
    checkOutDate: BookingData["checkOutDate"] | null;
    bookingId: BookingData["id"] | null;
};

const initialState: BookingState = {
    roomId: null,
    checkInDate: null,
    checkOutDate: null,
    bookingId: null,
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

        setBookingId: (state, action: PayloadAction<setBookingIdPayload>) => {
            state.bookingId = action.payload.bookingId;
        },

        clearBookingDetails: (state) => {
            state.roomId = null;
            state.checkInDate = null;
            state.checkOutDate = null;
        },

        clearBookingId: (state) => {
            state.bookingId = null;
        },
    },
});

export const { setRoomId, setBookingDates, setBookingId, clearBookingDetails, clearBookingId } =
    bookingSlice.actions;
export default bookingSlice.reducer;
