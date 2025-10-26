import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "url";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
<<<<<<< HEAD
    server: {   
        proxy: {     
            // Cualquier petición que empiece con /api...
            '/api': {
                // ...se redirige a tu backend en el puerto 8080
                target: 'http://localhost:8080',
                // Necesario para que el backend acepte la petición
                changeOrigin: true,
                // Opcional: Si tu backend NO espera '/api' al principio de la ruta, descomenta la siguiente línea
                //rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
=======
>>>>>>> 0fc894e39aa5ee73650b75ff04aed68713f3a2a7
});
