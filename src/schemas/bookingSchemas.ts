import z from "zod";

export enum BookingStatus {
    "CANCELLED" = "CANCELLED",
    "PENDING" = "PENDING",
    "CONFIRMED" = "CONFIRMED",
}

export type SetBookingDatesPayload = {
    checkInDate: BookingData["checkInDate"];
    checkOutDate: BookingData["checkOutDate"];
};

export type SetBookingIdPayload = {
    bookingId: BookingData["id"];
};

export type SetRoomPrice = {
    roomPrice: BookingData["totalPrice"];
};

export type createBookingPayload = {
    roomId: number;
    checkInDate: string;
    checkOutDate: string;
    passengerCount: number;
    guestNames: string;
};

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
    allBookingsByUserId: z.array(singleBookingDataSchema),
});

export const bookingsSchema = z.array(bookingSchema);

export const bookingByIdSchema = z.object({
    bookingById: singleBookingDataSchema,
});

export const reservationFormSchema = z
    .object({
        totalGuests: z.int().min(1, { message: "Must be at least 1 guest" }),
        guestNames: z
            .string()
            .min(1, { message: "Guest names are required" })
            .refine((value) => /^[a-zA-Z\s,.'-áéíóúÁÉÍÓÚñÑ]+$/.test(value), {
                message: "Invalid characters in guest names",
            }),
        arrivalDate: z.string().optional(),
        exitDate: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        if (!data.arrivalDate || !data.exitDate) return;

        const arrival = new Date(data.arrivalDate);
        const exit = new Date(data.exitDate);

        arrival.setHours(0, 0, 0, 0);
        exit.setHours(0, 0, 0, 0);

        if (exit <= arrival) {
            ctx.addIssue({
                path: ["exitDate"],
                message: "Departure date must be after arrival date",
                code: "custom",
            });
        }
    });

export type BookingData = z.infer<typeof singleBookingDataSchema>;
export type BookingById = z.infer<typeof bookingByIdSchema>;
export type Bookings = z.infer<typeof bookingSchema>;
export type CancelTripInfo = Pick<BookingData, "id" | "status">;
export type ReservationFormData = z.infer<typeof reservationFormSchema>;
