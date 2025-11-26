import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@apollo/client/react";
import { REGISTER_USER } from "@/services/authAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {registerSchema} from "@/schemas/userSchemas";

registerSchema.refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

type RegisterFormData = z.infer<typeof registerSchema>;

function RegisterView() {
    const navigate = useNavigate();
    const [registerUser, { loading }] = useMutation(REGISTER_USER);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const { confirmPassword, ...registerData } = data;
            await registerUser({
                variables: {
                    input: registerData
                }
            });
            
            toast.success("Registration successful! Please log in.");
            navigate("/auth/login");
        } catch (error) {
            if (error instanceof Error) {
                
                setError("root", {
                    message: error.message || "Registration failed. Please try again."
                });
                toast.error(error.message || "Registration failed");
            }
        }
    };

    // return (
    //     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    //         <div className="max-w-md w-full space-y-8">
    //             <div>
    //                 <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
    //                     Create your account
    //                 </h2>
    //             </div>
    //             <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
    //                 <div className="rounded-md shadow-sm space-y-4">
    //                     <div>
    //                         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
    //                             Email address
    //                         </label>
    //                         <input
    //                             {...register("email")}
    //                             id="email"
    //                             type="email"
    //                             autoComplete="email"
    //                             required
    //                             className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    //                             placeholder="Email address"
    //                         />
    //                         {errors.email && (
    //                             <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
    //                         )}
    //                     </div>

    //                     <div>
    //                         <label htmlFor="name" className="block text-sm font-medium text-gray-700">
    //                             First Name
    //                         </label>
    //                         <input
    //                             {...register("name")}
    //                             id="name"
    //                             type="text"
    //                             autoComplete="given-name"
    //                             required
    //                             className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    //                             placeholder="First name"
    //                         />
    //                         {errors.name && (
    //                             <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
    //                         )}
    //                     </div>

    //                     <div>
    //                         <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
    //                             Last Name
    //                         </label>
    //                         <input
    //                             {...register("lastname")}
    //                             id="lastname"
    //                             type="text"
    //                             autoComplete="family-name"
    //                             required
    //                             className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    //                             placeholder="Last name"
    //                         />
    //                         {errors.lastname && (
    //                             <p className="mt-1 text-sm text-red-600">{errors.lastname.message}</p>
    //                         )}
    //                     </div>
                        
    //                     <div>
    //                         <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
    //                             Phone
    //                         </label>
    //                         <input
    //                             {...register("phone")}
    //                             id="phone"
    //                             type="tel"
    //                             autoComplete="tel"
    //                             required
    //                             className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    //                             placeholder="Phone number"
    //                         />
    //                         {errors.phone && (
    //                             <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
    //                         )}
    //                     </div>

                        

    //                     <div>
    //                         <label htmlFor="password" className="block text-sm font-medium text-gray-700">
    //                             Password
    //                         </label>
    //                         <input
    //                             {...register("password")}
    //                             id="password"
    //                             type="password"
    //                             autoComplete="new-password"
    //                             required
    //                             className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    //                             placeholder="Password"
    //                         />
    //                         {errors.password && (
    //                             <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
    //                         )}
    //                     </div>

    //                     <div>
    //                         <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
    //                             Confirm Password
    //                         </label>
    //                         <input
    //                             {...register("confirmPassword")}
    //                             id="confirmPassword"
    //                             type="password"
    //                             autoComplete="new-password"
    //                             required
    //                             className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    //                             placeholder="Confirm password"
    //                         />
    //                         {errors.confirmPassword && (
    //                             <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
    //                         )}
    //                     </div>
    //                 </div>

    //                 {errors.root && (
    //                     <div className="text-red-600 text-sm text-center">
    //                         {errors.root.message}
    //                     </div>
    //                 )}

    //                 <div>
    //                     <button
    //                         type="submit"
    //                         disabled={loading}
    //                         className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
    //                     >
    //                         {loading ? (
    //                             <span>Registering...</span>
    //                         ) : (
    //                             <span>Register</span>
    //                         )}
    //                     </button>
    //                 </div>
    //             </form>
    //         </div>
    //     </div>
    // );
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="bg-white shadow-xl rounded-3xl w-full max-w-md p-8 space-y-6">
                <h2 className="text-center text-3xl font-bold text-gray-900">
                    Create your account
                </h2>
                <p className="text-center text-sm text-gray-500">
                    Join us and start your journey ✨
                </p>

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
                                {errors.name && <p className="form-error">{errors.name.message}</p>}
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
                                {errors.lastname && <p className="form-error">{errors.lastname.message}</p>}
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
                            {errors.email && <p className="form-error">{errors.email.message}</p>}
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
                            {errors.phone && <p className="form-error">{errors.phone.message}</p>}
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
                            {errors.password && <p className="form-error">{errors.password.message}</p>}
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
                            {errors.confirmPassword && (
                                <p className="form-error">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                    </div>

                    {errors.root && (
                        <p className="text-center text-sm text-red-600">{errors.root.message}</p>
                    )}

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
