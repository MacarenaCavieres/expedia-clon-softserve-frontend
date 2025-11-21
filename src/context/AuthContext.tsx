import client from "@/lib/client";
import React, { createContext, useEffect, useState } from "react";
import type { AuthContextValue, AuthState } from "../types";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";
const USER_KEY = "user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [auth, setAuthState] = useState<AuthState>({
        accessToken: null,
        refreshToken: null,
        user: null,
    });

    useEffect(() => {
        const accessToken = localStorage.getItem(ACCESS_KEY);
        const refreshToken = localStorage.getItem(REFRESH_KEY);
        const userJson = localStorage.getItem(USER_KEY);
        const user = userJson ? JSON.parse(userJson) : null;
        setAuthState({ accessToken, refreshToken, user });
    }, []);

    const setAuth = (next: AuthState) => {
        if (next.accessToken) localStorage.setItem(ACCESS_KEY, next.accessToken);
        else localStorage.removeItem(ACCESS_KEY);

        if (next.refreshToken) localStorage.setItem(REFRESH_KEY, next.refreshToken);
        else localStorage.removeItem(REFRESH_KEY);

        if (next.user) localStorage.setItem(USER_KEY, JSON.stringify(next.user));
        else localStorage.removeItem(USER_KEY);

        setAuthState(next);
    };
    const clearAuth = async () => {
        localStorage.removeItem(ACCESS_KEY);
        localStorage.removeItem(REFRESH_KEY);
        localStorage.removeItem(USER_KEY);

        try {
            await client.resetStore();
        } catch (error) {
            console.error("Error al resetear la caché de Apollo:", error);
        }

        setAuthState({ accessToken: null, refreshToken: null, user: null });
    };

    return <AuthContext.Provider value={{ auth, setAuth, clearAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
