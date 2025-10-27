import { hotelDetailSchema, hotelsSearchedSchema, type HotelDetail, type SearchHotel } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function getSearchedHotels(formData: SearchHotel) {
    try {
        const queryString = `?city=${encodeURIComponent(formData.city)}&passengerCount=${
            formData.passengerCount
        }`;
        const { data } = await api.get(`/hotels${queryString}`);

        const result = hotelsSearchedSchema.safeParse(data);
        if (result.success) {
            return result.data;
        } else {
            console.error("Zod validation error:", result.error.issues);
            throw new Error("Received invalid data format from server.");
        }
    } catch (error) {
        console.error("Error fetching hotels:", error);
        if (isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.message || error.response.data.error || "Failed to fetch hotels"
            );
        } else if (error instanceof Error) {
            throw error;
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}

export async function getHotelById(id: HotelDetail["id"]) {
    try {
        const { data } = await api.get(`/hotels/${id}`);
        const result = hotelDetailSchema.safeParse(data);
        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
