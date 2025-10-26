import { v4 as uuidv4 } from 'uuid';

const SESSION_ID_KEY = 'userSessionId';

/**
 * Obtiene el sessionId del localStorage.
 * Si no existe, genera uno nuevo, lo guarda y lo devuelve.
 * @returns {string} El sessionId del usuario invitado.
 */
export const getOrGenerateSessionId = (): string => {
        let sessionId = localStorage.getItem(SESSION_ID_KEY);

        if (!sessionId) {
                sessionId = uuidv4(); // Genera un nuevo UUID v4
                localStorage.setItem(SESSION_ID_KEY, sessionId);
                console.log('Generated new session ID:', sessionId); // Útil para depuración
        } else {
                console.log('Using existing session ID:', sessionId); // Útil para depuración
        }
        return sessionId;
};