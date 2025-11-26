import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client/react";
import { REGISTER_USER } from "@/services/authAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerSchema, type RegisterFormData } from "@/schemas/userSchemas";
import Errors from "@/components/Errors";

registerSchema.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

function RegisterView() {
    const navigate = useNavigate();
    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        onCompleted: () => {
            toast.success("Registration successful! Please log in.");
            navigate("/auth/login");
        },
        onError: (error) => {
            toast.error(error.message || "Registration failed");
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
    });

    const onSubmit = async (registerData: RegisterFormData) => {
        try {
            await registerUser({
                variables: {
                    input: {
                        email: registerData.email,
                        phone: registerData.phone,
                        name: registerData.name,
                        lastname: registerData.lastname,
                        password: registerData.password,
                    },
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="bg-white shadow-xl rounded-3xl w-full max-w-md p-8 space-y-6">
                <h2 className="text-center text-3xl font-bold text-gray-900">Create your account</h2>
                <p className="text-center text-sm text-gray-500">Join us and start your journey ✨</p>

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        {/* Name row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="form-label">First Name</label>
                                <input
                                    {...register("name")}
                                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500
                                        focus:border-indigo-500 bg-white"
                                    placeholder="John"
                                />
                                {errors.name && <Errors>{errors.name.message}</Errors>}
                            </div>

                            <div>
                                <label className="form-label">Last Name</label>
                                <input
                                    {...register("lastname")}
                                    className="form-input w-full border border-gray-300 rounded-lg px-3 py-2
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500
                                        focus:border-indigo-500 bg-white"
                                    placeholder="Doe"
                                />
                                {errors.lastname && <Errors>{errors.lastname.message}</Errors>}
                            </div>
                        </div>

                        <div>
                            <label className="form-label">Email</label>
                            <input
                                {...register("email")}
                                type="email"
                                className="form-input w-full border border-gray-300 rounded-lg px-3 py-2
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500
                                        focus:border-indigo-500 bg-white"
                                placeholder="your@email.com"
                            />
                            {errors.email && <Errors>{errors.email.message}</Errors>}
                        </div>

                        <div>
                            <label className="form-label ">Phone</label>
                            <input
                                {...register("phone")}
                                type="tel"
                                className="form-input w-full border border-gray-300 rounded-lg px-3 py-2
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500
                                        focus:border-indigo-500 bg-white"
                                placeholder="+56 912345678"
                            />
                            {errors.phone && <Errors>{errors.phone.message}</Errors>}
                        </div>

                        <div>
                            <label className="form-label">Password</label>
                            <input
                                {...register("password")}
                                type="password"
                                className="form-input w-full border border-gray-300 rounded-lg px-3 py-2
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500
                                        focus:border-indigo-500 bg-white"
                                placeholder="••••••••"
                            />
                            {errors.password && <Errors>{errors.password.message}</Errors>}
                        </div>

                        <div>
                            <label className="form-label">Confirm Password</label>
                            <input
                                {...register("confirmPassword")}
                                type="password"
                                className="form-input w-full border border-gray-300 rounded-lg px-3 py-2
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500
                                        focus:border-indigo-500 bg-white"
                                placeholder="Repeat password"
                            />
                            {errors.confirmPassword && <Errors>{errors.confirmPassword.message}</Errors>}
                        </div>
                    </div>

                    {errors.root && <Errors>{errors.root.message}</Errors>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 cursor-pointer transition disabled:bg-indigo-400"
                    >
                        {loading ? "Registering..." : "Create account"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <a href="/auth/login" className="text-indigo-600 font-medium hover:underline">
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
}

export default RegisterView;
