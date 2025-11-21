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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                {...register("email")}
                                id="email"
                                type="email"
                                autoComplete="email"
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                            {errors.email && <Errors>{errors.email.message}</Errors>}
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                First Name
                            </label>
                            <input
                                {...register("name")}
                                id="name"
                                type="text"
                                autoComplete="given-name"
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="First name"
                            />
                            {errors.name && <Errors>{errors.name.message}</Errors>}
                        </div>

                        <div>
                            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                                Last Name
                            </label>
                            <input
                                {...register("lastname")}
                                id="lastname"
                                type="text"
                                autoComplete="family-name"
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Last name"
                            />
                            {errors.lastname && <Errors>{errors.lastname.message}</Errors>}
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone
                            </label>
                            <input
                                {...register("phone")}
                                id="phone"
                                type="tel"
                                autoComplete="tel"
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Phone number"
                            />
                            {errors.phone && <Errors>{errors.phone.message}</Errors>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                {...register("password")}
                                id="password"
                                type="password"
                                autoComplete="new-password"
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                            {errors.password && <Errors>{errors.password.message}</Errors>}
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Confirm Password
                            </label>
                            <input
                                {...register("confirmPassword")}
                                id="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Confirm password"
                            />
                            {errors.confirmPassword && <Errors>{errors.confirmPassword.message}</Errors>}
                        </div>
                    </div>

                    {errors.root && <Errors>{errors.root.message}</Errors>}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 cursor-pointer"
                        >
                            {loading ? <span>Registering...</span> : <span>Register</span>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterView;
