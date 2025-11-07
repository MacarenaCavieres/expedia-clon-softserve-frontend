import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const { auth } = useAuth();
    const isLogged = !!auth.accessToken;
    if (!isLogged) return <Navigate to="/auth/login" replace />;
    return <>{children}</>;
};

export default ProtectedRoute;