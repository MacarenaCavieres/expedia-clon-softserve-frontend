import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LOGIN_USER } from "@/services/authAPI";
import { useAuth } from "@/context/AuthContext";

function LoginView() {
    const navigate = useNavigate();
    const goToRegister = () => {
        navigate("/auth/register");
    };
    const [form, setForm] = useState({ email: "", password: "" });
    const { setAuth } = useAuth();

    const [loginUser] = useMutation(LOGIN_USER);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const res = await loginUser({
                variables: { email: form.email, password: form.password },
            });

            type LoginUserResponse = {
                loginUser: {
                    accessToken: string;
                    refreshToken: string;
                    user: {
                        id: string;
                        name: string;
                        lastname: string;
                        email: string;
                    };
                };
            };

            const data = res.data as LoginUserResponse;

            // console.log("Login success:", data.loginUser)
            // Save tokens and user in auth context and localStorage
            setAuth({
                accessToken: data.loginUser.accessToken,
                refreshToken: data.loginUser.refreshToken,
                user: data.loginUser.user,
            });

            toast.success("Logged in");
            navigate("/"); // success → go home
        } catch {
            alert("Invalid credentials");
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-3 max-w-md mx-auto mt-20">
                <h1 className="text-2xl font-bold">Login</h1>

                <input
                    className="border p-2 w-full rounded"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                    className="border p-2 w-full rounded"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Log in
      </button>
    </form>
    <div className="space-y-2">
      <p className="text-sm text-gray-600 text-center">
        Don't have an account?{" "}
        <button onClick={goToRegister} className="text-blue-500 hover:text-blue-600 underline">
          Register now
        </button>
      </p>
      <p className="text-sm text-gray-600 text-center">
        <button onClick={() => navigate("/auth/forgot-password")} className="text-blue-500 hover:text-blue-600 underline">
          Forgot your password?
        </button>
      </p>
    </div>
    </>

    
  );
}
export default LoginView;
