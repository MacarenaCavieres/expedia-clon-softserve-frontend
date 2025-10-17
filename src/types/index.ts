import z from "zod";

export enum BookingStatus {
    "CANCELED" = "CANCELED",
    "PENDING" = "PENDING",
    "CONFIRMED" = "CONFIRMED",
}

export type SearchHotel = {
    destination: string;
    arrivalDate: string;
    exitDate: string;
};

export type SetRoomIdPayload = {
    roomId: Room["id"];
};

export type SetBookingDatesPayload = {
    checkInDate: BookingData["checkInDate"];
    checkOutDate: BookingData["checkOutDate"];
};

export type setBookingIdPayload = {
    bookingId: BookingData["id"];
};

export type createBookingPayload = {
    roomId: number;
    checkInDate: string;
    checkOutDate: string;
    totalGuests: number;
    guestNames: string;
};

export const roomSchema = z.object({
    id: z.number(),
    capacity: z.number(),
    name: z.string(),
    bedType: z.string(),
    pricePerNight: z.number(),
    imageUrl: z.string(),
});

export const hotelSearchedSchema = z.object({
    id: z.number(),
    name: z.string(),
    city: z.string(),
    mainImage: z.string(),
    pricePerNight: z.number(),
    rating: z.number(),
    comment: z.string(),
});

export const hotelsSearchedSchema = z.array(hotelSearchedSchema);

export const hotelDetailSchema = z.object({
    id: z.number(),
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
});

export const bookingSchema = z.object({
    id: z.number(),
    checkInDate: z.string(),
    checkOutDate: z.string(),
    totalGuests: z.number(),
    guestNames: z.string(),
    totalPrice: z.number(),
    status: z.string(),
    hotelName: z.string(),
    hotelCity: z.string(),
    hotelImage: z.string(),
    roomId: z.number(),
});

export const bookingsSchema = z.array(bookingSchema);
export const reservationFormSchema = z.object({
    totalGuests: z.number(),
    guestNames: z.string(),
});

export type HotelData = z.infer<typeof hotelSearchedSchema>;
export type HotelDetail = z.infer<typeof hotelDetailSchema>;
export type Room = z.infer<typeof roomSchema>;
export type BookingData = z.infer<typeof bookingSchema>;
export type CancelTripInfo = Pick<BookingData, "id" | "status">;
export type ReservationFormData = z.infer<typeof reservationFormSchema>;
