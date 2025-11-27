import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

// ---------- FORM ----------
const CheckoutForm: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setLoading(true);
        setError(null);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}`,
            },
        });

        if (error) {
            setError(error.message ?? "Error al procesar el pago.");
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
                {loading ? "Procesando..." : "Pagar"}
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
    );
};

export default CheckoutForm;
