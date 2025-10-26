import { hotelDetailSchema, hotelsSearchedSchema, type HotelDetail, type SearchHotel } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

// FUNCIÓN ACTUALIZADA ---
export async function getSearchedHotels(formData: SearchHotel) { // formData ahora tiene passengerCount
    try {
        // Construye la URL dinámicamente usando los datos del formulario
        const queryString = `?city=${encodeURIComponent(formData.city)}&passengerCount=${formData.passengerCount}`;
        const { data } = await api.get(`/hotels${queryString}`);

        // Validación con Zod (sin cambios)
        const result = hotelsSearchedSchema.safeParse(data);
        if (result.success) {
            return result.data;
        } else {
            // Loguear el error de validación puede ser útil
            console.error("Zod validation error:", result.error.issues);
            throw new Error("Received invalid data format from server.");
        }
    } catch (error) {
        console.error("Error fetching hotels:", error); // Loguear el error
        if (isAxiosError(error) && error.response) {
            // Intenta devolver el mensaje de error del backend si existe
            throw new Error(error.response.data.message || error.response.data.error || 'Failed to fetch hotels');
        } else if (error instanceof Error) {
            throw error; // Relanzar otros errores (como el de Zod)
        } else {
            throw new Error('An unknown error occurred');
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
