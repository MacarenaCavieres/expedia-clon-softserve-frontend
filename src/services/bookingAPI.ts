import api from "@/lib/axios";
import {
    bookingSchema,
    bookingsSchema,
    type BookingData,
    type CancelTripInfo,
    type createBookingPayload,
} from "@/types/index";
import { isAxiosError } from "axios";

export async function getBookings() {
    try {
        const { data } = await api.get(`/bookings`);
        const result = bookingsSchema.safeParse(data);
        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getBookingById(id: BookingData["id"]) {
    try {
        const { data } = await api.get(`/bookings/${id}`);
        const result = bookingSchema.safeParse(data);
        if (result.success) {
            return result.data;
        }
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function createBooking(bookingData: createBookingPayload) {
    try {
        const { data } = await api.post("/bookings", bookingData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error("Unexpected error while creating booking");
        }
    }
}

export async function updateBooking(bookingData: createBookingPayload, bookingId: BookingData["id"]) {
    try {
        const { data } = await api.put(`/bookings/${bookingId}`, bookingData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error("Unexpected error while creating booking");
        }
    }
}

export async function cancelTrip(info: CancelTripInfo) {
    try {
        await api.patch(`/bookings/${info.id}/status`, {
            status: info.status,
        });
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteTrip(id: BookingData["id"]) {
    try {
        await api.delete(`/bookings/${id}`);
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
