import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./router.tsx";
import { ApolloProvider } from "@apollo/client/react";
import { Provider } from "react-redux";
import { store } from "@/store/store.ts";
import { AuthProvider } from "@/context/AuthContext";
import client from "@/lib/client.ts";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <AuthProvider>
                    <Router />
                </AuthProvider>
            </Provider>
        </ApolloProvider>
    </StrictMode>
);
