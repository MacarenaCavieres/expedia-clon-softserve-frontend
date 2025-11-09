import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

const authLink = new SetContextLink((prevContext) => {
    const token = localStorage.getItem("accessToken");

    return {
        headers: {
            ...prevContext.headers,
            Authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(new HttpLink({ uri: import.meta.env.VITE_API_URL })),
    cache: new InMemoryCache(),
});

export default client;
