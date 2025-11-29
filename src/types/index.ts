import type { BookingData } from "@/schemas/bookingSchemas";
import type { Room } from "@/schemas/hotelSchemas";

export enum BookingStatus {
    "CANCELLED" = "CANCELLED",
    "PENDING" = "PENDING",
    "CONFIRMED" = "CONFIRMED",
    "PAID" = "PAID",
}

export type SearchHotel = {
    city: string;
    arrivalDate: string;
    exitDate: string;
    passengerCount: number;
};

export type SetRoomInfoPayload = {
    roomId: Room["id"];
    roomPrice: Room["pricePerNight"];
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

export type LoginUserResponse = {
    loginUser: {
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            name: string;
            lastname: string;
            email: string;
        };
    };
};

export type User = {
    id?: string;
    name?: string;
    lastname?: string;
    email?: string;
};

export type AuthState = {
    accessToken?: string | null;
    refreshToken?: string | null;
    user?: User | null;
};

export type AuthContextValue = {
    auth: AuthState;
    setAuth: (next: AuthState) => void; //Login
    clearAuth: () => void; //Logout
};

export type PendingData = {
    roomId: string;
    checkInDate: string;
    checkOutDate: string;
    totalGuests: number;
    guestNames: string;
    totalPrice: number;
};

export interface AlertProps {
    message: string;
    status: "SUCCESS" | "CONFIRMING" | "WARNING";
}

export interface PaymentIntentResponse {
    clientSecret: string;
    amount: number;
    currency: string;
}
