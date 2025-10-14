import { hotelDetailSchema, hotelsSearchedSchema, type HotelDetail, type SearchHotel } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function getSearchedHotels(formData: SearchHotel) {
    try {
        const { data } = await api.get(`/hotels?city=${formData.destination}&passengerCount=2`);
        const result = hotelsSearchedSchema.safeParse(data);
        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
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
