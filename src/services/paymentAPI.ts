import axios from "axios";

const paymentAPI = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export async function createPaymentIntent(payload: { bookingId: string }) {
    const token = localStorage.getItem("accessToken");

    const { data } = await paymentAPI.post("/api/payments/create-payment-intent", payload, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    return data;
}
