import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const { auth } = useAuth();
    const isLogged = !!auth.accessToken;
    if (!isLogged) {
        return (
            <Navigate
                to="/auth/login"
                replace
                state={{
                    from: location.pathname,
                    message: "You must log in to make a reservation or view your trips.",
                }}
            />
        );
    }
    return <>{children}</>;
};

export default ProtectedRoute;
