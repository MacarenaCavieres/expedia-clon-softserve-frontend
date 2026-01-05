import { z } from "zod";

export type SearchHotel = {
    city: string;
    arrivalDate: string;
    exitDate: string;
    passengerCount: number;
};

export type DateForm = {
    arrivalDate: string;
    exitDate: string;
};

export const roomSchema = z.object({
    id: z.string(),
    capacity: z.number(),
    name: z.string(),
    bedType: z.string(),
    pricePerNight: z.string(),
    imageUrl: z.string(),
    description: z.string(),
});

export const hotelSearchedSchema = z.object({
    id: z.string(),
    name: z.string(),
    city: z.string(),
    mainImage: z.string(),
    pricePerNight: z.string(),
    rating: z.number(),
    comment: z.string(),
});

export const hotelsSearchedSchema = z.object({
    searchHotels: z.array(hotelSearchedSchema),
});

export const hotelDetailSchema = z.object({
    hotelDetailsById: z.object({
        id: z.string(),
        name: z.string(),
        rating: z.number(),
        comment: z.string(),
        description: z.string(),
        city: z.string(),
        latitude: z.number(),
        longitude: z.number(),
        address: z.string(),
        images: z.array(z.string()),
        rooms: z.array(roomSchema),
    }),
});

export type HotelData = z.infer<typeof hotelSearchedSchema>;
export type SearchHotelsQueryResponse = z.infer<typeof hotelsSearchedSchema>;
export type HotelDetail = z.infer<typeof hotelDetailSchema>;
export type Room = z.infer<typeof roomSchema>;
