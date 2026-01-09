import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import type { StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { createPaymentIntent } from "@/services/paymentAPI";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";

// Stripe init
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY as string, {
    locale: "en",
});

const Checkout = () => {
    const { bookingId } = useParams<{ bookingId: string }>();
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [amount, setAmount] = useState<number | null>(null);
    const [currency, setCurrency] = useState<string>("usd");

    useEffect(() => {
        if (!bookingId) {
            setError("Invalid booking ID.");
            setLoading(false);
            return;
        }

        const loadPayment = async () => {
            try {
                const data = await createPaymentIntent({ bookingId });

                setClientSecret(data.clientSecret);
                setAmount(data.amount);
                setCurrency(data.currency);
            } catch (error) {
                console.error(error);
                setError("The payment could not be initialized. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        loadPayment();
    }, [bookingId]);

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;
    if (!clientSecret) return <ErrorMessage message="Unable to initialize payment" />;

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: "stripe",
        },
        loader: "auto",
        locale: "en",
    };

    const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
    }).format((amount ?? 0) / 100);

    return (
        <div className="mx-2">
            <div className="max-w-md mx-auto mb-6">
                <h2 className="text-xl font-bold">Total to Pay</h2>
                <p className="text-2xl text-green-600">{formattedAmount}</p>
            </div>

            {clientSecret && (
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
};

export default Checkout;
