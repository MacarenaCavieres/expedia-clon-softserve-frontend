import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { FORGOT_PASSWORD } from "../../services/authAPI";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { forgotPassSchema, type ForgotPassFormData } from "@/schemas/userSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Errors from "@/components/Errors";
import { toast } from "react-toastify";

const ForgotPasswordView = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ForgotPassFormData>({
        resolver: zodResolver(forgotPassSchema),
        mode: "onChange",
    });

    const [forgotPassword, { loading }] = useMutation<{ forgotPassword: boolean }, { email: string }>(
        FORGOT_PASSWORD,
        {
            onCompleted: () => {
                setMessage(
                    "If an account exists with this email, you will receive password reset instructions."
                );
                reset();
            },
            onError: (error: Error) => {
                toast.error(error.message);
            },
        }
    );

    const handleForgotPass = async (forgotData: ForgotPassFormData) => {
        try {
            await forgotPassword({
                variables: { email: forgotData.email },
            });
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Reset your password
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter your email address and we'll send you instructions to reset your password.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleForgotPass)}>
                    <div>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                {...register("email")}
                            />
                        </div>
                        {errors.email && <Errors>{errors.email.message}</Errors>}
                    </div>

                    {message && (
                        <div
                            className={`text-sm text-bold ${
                                message.includes("error") ? "text-red-600" : "text-green-600"
                            }`}
                        >
                            {message}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? "Sending..." : "Send reset instructions"}
                        </button>
                    </div>

                    <div className="text-sm text-center">
                        <button
                            type="button"
                            onClick={() => navigate("/auth/login")}
                            className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                        >
                            Back to login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordView;
