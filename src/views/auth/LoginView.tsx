import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client/react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "@/services/authAPI";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "@/schemas/userSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Errors from "@/components/Errors";
import type { LoginUserResponse } from "@/types/index";

function LoginView() {
    const navigate = useNavigate();
    const location = useLocation();
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

    const goToRegister = () => {
        navigate("/auth/register");
    };

    useEffect(() => {
        if (location.state && location.state.message) {
            setAlertMessage(location.state.message);
        }
    }, [location.state]);

    const handleCloseAlert = () => {
        setAlertMessage(null);
    };

    const { setAuth } = useAuth();

    const [loginUser] = useMutation(LOGIN_USER, {
        onCompleted: () => {
            toast.success("Logged in");
            navigate("/");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    });

    const handleLogin = async (loginData: LoginFormData) => {
        try {
            const res = await loginUser({
                variables: { email: loginData.email, password: loginData.password },
            });

            const data = res.data as LoginUserResponse;

            setAuth({
                accessToken: data.loginUser.accessToken,
                refreshToken: data.loginUser.refreshToken,
                user: data.loginUser.user,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {alertMessage && (
                <div className="bg-red-100 text-red-700 px-4 py-3 rounded relative flex items-center justify-between mb-4">
                    <p className="font-bold mr-4">{alertMessage}</p>

                    <button
                        onClick={handleCloseAlert}
                        className="bg-transparent border-0 text-red-700 cursor-pointer font-bold text-xl leading-none"
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>
            )}

            <div className="min-h-screen min-w-lg flex items-center justify-center p-4">
                <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">
                    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome Back</h1>
                    <form onSubmit={handleSubmit(handleLogin)} className="space-y-3 max-w-md mx-auto mt-20">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 flex justify-center items-center gap-1">
                                Email{" "}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-mail-icon lucide-mail"
                                >
                                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                </svg>
                            </label>

                            <input
                                className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Email"
                                {...register("email")}
                            />
                            {errors.email && <Errors>{errors.email.message}</Errors>}
                        </div>

                        <div>
                            <label className="flex justify-center items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                                Password{" "}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-key-round-icon lucide-key-round"
                                >
                                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                                </svg>
                            </label>
                            <input
                                className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                type="password"
                                placeholder="Enter your password"
                                {...register("password")}
                            />
                            {errors.password && <Errors>{errors.password.message}</Errors>}
                        </div>
                        <button className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white py-3 rounded-xl w-full font-semibold transition-all shadow-md">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-log-in-icon lucide-log-in"
                            >
                                <path d="m10 17 5-5-5-5" />
                                <path d="M15 12H3" />
                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                            </svg>
                            Log in
                        </button>
                    </form>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600 text-center mt-2">
                            Don't have an account?{" "}
                            <button
                                onClick={goToRegister}
                                className="text-blue-500 hover:text-blue-600 underline cursor-pointer"
                            >
                                Register now
                            </button>
                        </p>
                        <p className="text-sm text-gray-600 text-center">
                            <button
                                onClick={() => navigate("/auth/forgot-password")}
                                className="text-blue-500 hover:text-blue-600 underline cursor-pointer"
                            >
                                Forgot your password?
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LoginView;
