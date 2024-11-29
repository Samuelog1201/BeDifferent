import { getTweets, getTweetsByUser } from '../utils/firebase'; 
import { TweetData } from './tweets';

// Define la estructura de un observador que reaccionará a los cambios en el estado
export type Observer = { render: () => void } & HTMLElement; // El método que se invoca para que el observador actualice la UI

//Actions
export enum Actions {
    NAVIGATE = 'NAVIGATE',
    SETUSERCREDENTIALS = 'SETUSERCREDENTIALS',
    ADD_TWEET = 'ADD_TWEET',
    DELETE_TWEET = 'DELETE_TWEET',
    GET_TWEETS = 'GET_TWEETS',
    GET_TWEETSBYUSER = 'GET_TWEETSBYUSER',
    SET_USER = 'SET_USER',
    LOGOUT = 'LOGOUT',
}

// Screens
export enum Screens {
    LOGIN = 'LOGIN',
    DASHBOARD = 'DASHBOARD',
    PROFILE = 'PROFILE',
    REGISTER = 'REGISTER',
    // otras pantallas...
}

// Define la estructura del estado de la aplicación
export interface AppState {
    screen: Screens;  // Estado de la pantalla actual
    user: ProfileData | null;  // El usuario puede ser null si no está autenticado
    tweets: TweetData[];  // Array de tweets
}

// Define la estructura de la acción que se despacha
export interface Action {
    action: Actions;
    payload: any;  // El payload puede ser cualquier cosa dependiendo de la acción
}

// Propiedades del Perfil
export interface ProfileData {
    name: string|null;
    uid: string|null;
    email: string|null;
    avatar: string|null;
}

// Acción para obtener todos los tweets
export const getTweetsAction = async () => {
    try {
        const tweets = await getTweets();  // Obtenemos los tweets de Firebase
        return {
            action: Actions.GET_TWEETS,
            payload: tweets,  // Retornamos los tweets como payload
        };
    } catch (error) {
        console.error("Error al obtener los tweets:", error);
        return {
            action: Actions.GET_TWEETS,
            payload: [],  // Si ocurre un error, retornamos un array vacío
        };
    }
};

// Acción para obtener los tweets de un usuario específico
export const getTweetsByUserAction = async (userUid: string) => {
    try {
        const tweetsByUser = await getTweetsByUser(userUid);  // Obtenemos los tweets del usuario desde Firebase
        return {
            action: Actions.GET_TWEETSBYUSER,
            payload: tweetsByUser,  // Retornamos los tweets del usuario como payload
        };
    } catch (error) {
        console.error("Error al obtener los tweets del usuario:", error);
        return {
            action: Actions.GET_TWEETSBYUSER,
            payload: [],  // Si ocurre un error, retornamos un array vacío
        };
    }
};
