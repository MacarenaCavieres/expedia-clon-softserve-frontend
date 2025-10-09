import type { BookingData } from "@/types/index";
import bookingsInfo from "@/static/bookinsInfo.json";

export async function getBookings() {
    try {
        const bookings = bookingsInfo;
        return bookings;
    } catch (error) {
        // if (isAxiosError(error) && error.response) {
        //     throw new Error(error.response.data.error);
        // }
        console.log("Error ====> ", error);
    }
}

export async function cancelTrip(id: BookingData["id"]) {
    console.log(id);
}
