import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router-dom";

const CheckoutForm: React.FC = () => {
    const { bookingId } = useParams();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setLoading(true);
        setError(null);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });

        if (error) {
            setError(error.message ?? "An error occurred while processing your payment.");
            setLoading(false);
            return;
        }

        if (paymentIntent?.status === "succeeded") {
            sessionStorage.setItem(
                "paidBookingId",
                JSON.stringify({
                    id: bookingId,
                })
            );
            navigate("/my-trips");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <PaymentElement />
            <button
                type="submit"
                disabled={!stripe || loading}
                className="mt-4 w-full bg-blue-600 text-white p-2 rounded"
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
    );
};

export default CheckoutForm;
