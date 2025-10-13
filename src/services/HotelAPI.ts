import type { HotelDetail, SearchHotel } from "../types";
import hotelSearch from "@/static/hotelsSearch.json";
import hotelDetail from "@/static/hotelDetail.json";

export async function getSearchedHotels(data: SearchHotel) {
    try {
        console.log(data);
        const search = hotelSearch;
        return search;
    } catch (error) {
        // if (isAxiosError(error) && error.response) {
        //     throw new Error(error.response.data.error);
        // }
        console.log("Error ====> ", error);
    }
}

export async function getHotelById(id: HotelDetail["id"]) {
    try {
        console.log(id);
        const hotel = hotelDetail;
        return hotel;
    } catch (error) {
        console.log("Error ====> ", error);
    }
}
