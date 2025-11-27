import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SetBookingDatesPayload, SetRoomInfoPayload } from "@/types/index";
import type { BookingData, SetBookingIdPayload } from "@/schemas/bookingSchemas";
import type { Room } from "@/schemas/hotelSchemas";

type BookingState = {
    roomId: Room["id"] | null;
    checkInDate: BookingData["checkInDate"] | null;
    checkOutDate: BookingData["checkOutDate"] | null;
    bookingId: BookingData["id"] | null;
    roomPrice: Room["pricePerNight"] | null;
};

const initialState: BookingState = {
    roomId: null,
    checkInDate: null,
    checkOutDate: null,
    bookingId: null,
    roomPrice: null,
};

const bookingSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {
        setRoomId: (state, action: PayloadAction<SetRoomInfoPayload>) => {
            state.roomId = action.payload.roomId;
            state.roomPrice = action.payload.roomPrice;
        },

        setBookingDates: (state, action: PayloadAction<SetBookingDatesPayload>) => {
            state.checkInDate = action.payload.checkInDate;
            state.checkOutDate = action.payload.checkOutDate;
        },

        setBookingId: (state, action: PayloadAction<SetBookingIdPayload>) => {
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
