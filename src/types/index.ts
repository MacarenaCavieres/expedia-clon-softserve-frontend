import z from "zod";

export enum BookingStatus {
    "CANCELLED" = "CANCELLED",
    "PENDING" = "PENDING",
    "CONFIRMED" = "CONFIRMED",
}

export type SearchHotel = {
    city: string;
    arrivalDate: string;
    exitDate: string;
    passengerCount: number;
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
    passengerCount: number;
    guestNames: string;
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

export const singleBookingDataSchema = z.object({
    id: z.string(),
    checkInDate: z.string(),
    checkOutDate: z.string(),
    passengerCount: z.number(),
    guestNames: z.string(),
    totalPrice: z.number(),
    status: z.string(),
    hotelName: z.string(),
    hotelCity: z.string(),
    hotelImage: z.string(),
    roomId: z.string(),
});

export const bookingSchema = z.object({
    allBookings: z.array(singleBookingDataSchema),
});

export const bookingsSchema = z.array(bookingSchema);

export const bookingByIdSchema = z.object({
    bookingById: singleBookingDataSchema,
});

export const reservationFormSchema = z.object({
    totalGuests: z.number().min(1, { message: "Must be at least 1 guest" }),
    guestNames: z.string().min(1, { message: "Guest names are required" }),
});

export type HotelData = z.infer<typeof hotelSearchedSchema>;
export type SearchHotelsQueryResponse = z.infer<typeof hotelsSearchedSchema>;
export type HotelDetail = z.infer<typeof hotelDetailSchema>;
export type Room = z.infer<typeof roomSchema>;
export type BookingData = z.infer<typeof singleBookingDataSchema>;
export type BookingById = z.infer<typeof bookingByIdSchema>;
export type Bookings = z.infer<typeof bookingSchema>;
export type CancelTripInfo = Pick<BookingData, "id" | "status">;
export type ReservationFormData = z.infer<typeof reservationFormSchema>;
