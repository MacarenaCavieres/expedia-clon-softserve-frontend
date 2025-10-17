import ReservationForm from "@/components/bookings/ReservationForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function CreateBooking() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReservationForm />
        </QueryClientProvider>
    );
}

export default CreateBooking;
