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
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-3 max-w-md mx-auto mt-20">
                <h1 className="text-2xl font-bold">Login</h1>

                <input className="border p-2 w-full rounded" placeholder="Email" {...register("email")} />
                {errors.email && <Errors>{errors.email.message}</Errors>}

                <input
                    className="border p-2 w-full rounded"
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                />
                {errors.password && <Errors>{errors.password.message}</Errors>}
                <button className="bg-blue-600 text-white px-4 py-2 rounded w-full cursor-pointer">
                    Log in
                </button>
            </form>
            <div className="space-y-2">
                <p className="text-sm text-gray-600 text-center">
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
    );
}
export default LoginView;
