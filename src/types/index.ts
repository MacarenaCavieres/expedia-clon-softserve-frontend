import type { BookingData } from "@/schemas/bookingSchemas";
import type { Room } from "@/schemas/hotelSchemas";

export enum BookingStatus {
    "CANCELLED" = "CANCELLED",
    "PENDING" = "PENDING",
    "CONFIRMED" = "CONFIRMED",
}

export type SearchHotel = {
    city: string;
    arrivalDate: string;
    exitDate: string;
    passengerCount: number;
};

export type SetRoomIdPayload = {
    roomId: Room["id"];
};

export type SetBookingDatesPayload = {
    checkInDate: BookingData["checkInDate"];
    checkOutDate: BookingData["checkOutDate"];
};

export type SetBookingIdPayload = {
    bookingId: BookingData["id"];
};

export type CreateBookingPayload = {
    roomId: number;
    checkInDate: string;
    checkOutDate: string;
    passengerCount: number;
    guestNames: string;
};

export type UserInfoForm = {
    name?: string;
    lastname?: string;
    email?: string;
    phone?: string;
};
