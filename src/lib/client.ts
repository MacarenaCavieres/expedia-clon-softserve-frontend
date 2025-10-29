// import axios from "axios";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
// });

// export default api;

const client = new ApolloClient({
    link: new HttpLink({ uri: import.meta.env.VITE_API_URL }),
    cache: new InMemoryCache(),
});

export default client;
