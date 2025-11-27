import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import type { StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Errors from "@/components/Errors";

// Stripe init
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY as string);

// Tipado de respuesta del backend
interface PaymentIntentResponse {
    clientSecret: string;
}

const Checkout = () => {
    const { bookingId } = useParams<{ bookingId: string }>();
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!bookingId) {
            setError("ID de reserva inválido");
            setLoading(false);
            return;
        }

        const token = localStorage.getItem("accessToken");

        const createPaymentIntent = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/payments/create-payment-intent", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ bookingId }),
                });

                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text || "Error creando el pago");
                }

                const data: PaymentIntentResponse = await res.json();
                setClientSecret(data.clientSecret);
            } catch (err) {
                console.error("Stripe init error:", err);
                setError("No se pudo inicializar el pago");
            } finally {
                setLoading(false);
            }
        };

        createPaymentIntent();
    }, [bookingId]);

    if (loading) return "Loading...";
    if (error) return <Errors>{error}</Errors>;
    if (!clientSecret) return <Errors>Error inicializando pago</Errors>;

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: "stripe",
        },
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    );
};

export default Checkout;
