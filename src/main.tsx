import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./router.tsx";
import { ApolloProvider } from "@apollo/client/react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "@/store/store.ts";
import { AuthProvider } from "@/context/AuthContext";
import client from "@/lib/client.ts";

// const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <AuthProvider>
                    <Router />
                </AuthProvider>
                {/* <ReactQueryDevtools /> */}
            </Provider>
        </ApolloProvider>
    </StrictMode>
);
