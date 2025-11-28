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
    amount: number;
    currency: string;
}

const Checkout = () => {
    const { bookingId } = useParams<{ bookingId: string }>();
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [amount, setAmount] = useState<number | null>(null);
    const [currency, setCurrency] = useState<string>("clp");

    useEffect(() => {
        if (!bookingId) {
            setError("Invalid booking ID");
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
                    throw new Error(text || "Error creating payment");
                }

                const data: PaymentIntentResponse = await res.json();
                setClientSecret(data.clientSecret);
                setAmount(data.amount);
                setCurrency(data.currency);
            } catch (err) {
                console.error("Stripe init error:", err);
                setError("The payment could not be initialized.");
            } finally {
                setLoading(false);
            }
        };

        createPaymentIntent();
    }, [bookingId]);

    if (loading) return "Loading...";
    if (error) return <Errors>{error}</Errors>;
    if (!clientSecret) return <Errors>Error initializing payment</Errors>;

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: "stripe",
        },
        loader: "auto",
    };

    const formatted = new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency,
    }).format((amount ?? 0) / 100);

    return (
        <>
            <div className="max-w-md mx-auto mb-6">
                <h2 className="text-xl font-bold">Total a pagar</h2>
                <p className="text-2xl text-green-600">{formatted}</p>
            </div>

            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
            </Elements>
        </>
    );
};

export default Checkout;
