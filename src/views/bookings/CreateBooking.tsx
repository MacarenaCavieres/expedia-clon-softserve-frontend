import { useForm } from "@tanstack/react-form";
import { useMutation, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { createBooking, getBookingById } from "@/services/bookingAPI";
import {toast, ToastContainer} from "react-toastify";
import { useNavigate } from "react-router-dom";

const queryClient = new QueryClient();

const reservationFormSchema = z.object({
  totalGuests: z.number().min(1, "At least 1 guest is required"),
  guestNames: z.string().min(3, "Guest names are required"),
});

type ReservationFormData = z.infer<typeof reservationFormSchema>;

function ReservationForm() {
  const navigate = useNavigate();
  // Data from the Redux store
  const { roomId, checkInDate, checkOutDate, bookingId } = useSelector(
    (state: RootState) => state.bookings
  );

  const {data: existingBooking, isLoading: isLoadingBooking} = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBookingById(bookingId!),
    enabled: !!bookingId,
  });

  const mutation = useMutation({
    mutationFn: async (data: ReservationFormData) => {
      if (!roomId || !checkInDate || !checkOutDate) {
        throw new Error("Missing booking details");
      }

      const payload = {
        roomId,
        checkInDate,
        checkOutDate,
        totalGuests: data.totalGuests,
        guestNames: data.guestNames,
      };

      return createBooking(payload);
    },
    onSuccess: (data) => {
      console.log("Booking created!", data);
      toast.success("Booking created succesfully!");
      setTimeout(() => {
        navigate("/my-trips");
      }, 2500);   
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create booking.");
    },
  });

  


  const form = useForm({
    defaultValues: {
      totalGuests: existingBooking?.totalGuests ?? 1,
      guestNames: existingBooking?.guestNames ??"",
    },
    onSubmit: ({ value }) => mutation.mutate(value),
  });

  if (isLoadingBooking) return <p>Loading booking info...</p>;

  return (
    <>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 space-y-4"
    >
      <h1 className="text-xl font-semibold">Guest Information</h1>

      <div>
        <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
        <form.Field name="totalGuests">
          {(field) => (
            <input
              type="number"
              min={1}
              value={field.state.value}
              onChange={(e) => field.handleChange(Number(e.target.value))}
              className="border p-2 w-full rounded"
            />
          )}
        </form.Field>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Guest Names</label>
        <form.Field name="guestNames">
          {(field) => (
            <input
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="e.g. John Smith, Jane Doe"
              className="border p-2 w-full rounded"
            />
          )}
        </form.Field>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Booking..." : "Confirm Booking"}
      </button>

      {mutation.isError && (
        <p className="text-red-500 mt-2">{(mutation.error as Error).message}</p>
      )}
      {mutation.isSuccess && <p className="text-green-500 mt-2">Booking successful!</p>}
    </form>

    <ToastContainer position="top-right" autoClose={2000} theme = "colored"/>
    </>
  );
}

export default function CreateBooking() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReservationForm />
    </QueryClientProvider>
  );
}
