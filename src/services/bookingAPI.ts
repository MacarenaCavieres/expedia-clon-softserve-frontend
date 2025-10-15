import api from "@/lib/axios";
import { bookingsSchema, type BookingData } from "@/types/index";
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

export async function cancelTrip(id: BookingData["id"]) {
    console.log(id);
}
