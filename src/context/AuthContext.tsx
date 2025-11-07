import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
    id?: string;
    name?: string;
    lastname?: string;
    email?: string;
};

type AuthState = {
    accessToken?: string | null;
    refreshToken?: string | null;
    user?: User | null;
};

type AuthContextValue = {
    auth: AuthState;
    setAuth: (next: AuthState) => void; //Login
    clearAuth: () => void; //Logout
};

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
        console.info("[AuthProvider] init from localStorage:", { accessToken, refreshToken, user });
        setAuthState({ accessToken, refreshToken, user });
    }, []);

    const setAuth = (next: AuthState) => {
        if (next.accessToken) localStorage.setItem(ACCESS_KEY, next.accessToken);
        else localStorage.removeItem(ACCESS_KEY);

        if (next.refreshToken) localStorage.setItem(REFRESH_KEY, next.refreshToken);
        else localStorage.removeItem(REFRESH_KEY);

        if (next.user) localStorage.setItem(USER_KEY, JSON.stringify(next.user));
        else localStorage.removeItem(USER_KEY);

        console.info("[AuthProvider] setAuth called:", next);
        setAuthState(next);
    };
    //When user Logs out
    const clearAuth = () => {
        localStorage.removeItem(ACCESS_KEY);
        localStorage.removeItem(REFRESH_KEY);
        localStorage.removeItem(USER_KEY);
        console.info("[AuthProvider] clearAuth called");
        setAuthState({ accessToken: null, refreshToken: null, user: null });
    };

    return <AuthContext.Provider value={{ auth, setAuth, clearAuth }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};

export default AuthContext;
