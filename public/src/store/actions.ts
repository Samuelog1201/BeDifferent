import { Actions, ProfileData, Screens } from '../types/store';
import { addTweet, deleteTweet } from '../utils/firebase';
import { TweetData } from '../types/tweets';
import { getTweets, getTweetsByUser } from '../utils/firebase';

// Acción para navegar entre pantallas
export const navigate = (screen: Screens) => {
    console.log('Navegando a', screen);
    return {
        action: Actions.NAVIGATE,
        payload: screen,
    };
};

export const getTweetsAction = async () => {
    const tweets = await getTweets(); // Obtén los tweets desde Firestore
    return {
        action: Actions.GET_TWEETS,  // Puedes definir esta constante en tu archivo de Actions
        payload: tweets,  // Los tweets se pasan como payload
    };
};

// Acción para obtener los tweets de un usuario específico
export const getTweetsByUserAction = async (userId: string) => {
    const tweetsByUser = await getTweetsByUser(userId); // Obtén los tweets de un usuario desde Firestore
    return {
        action: Actions.GET_TWEETSBYUSER,  // Define esta constante en tu archivo de Actions
        payload: tweetsByUser,  // Los tweets del usuario se pasan como payload
    };
};

// Acción para agregar un tweet
export const addTweetAction = (tweet: TweetData) => {
    return async (dispatch: Function) => {
        try {
            await addTweet(tweet);  // Llamamos a la función para agregar el tweet
            dispatch({
                action: Actions.ADD_TWEET,
                payload: tweet,  // Retornamos el tweet como payload si es exitoso
            });
        } catch (error) {
            console.error("Error al agregar tweet:", error);
        }
    };
};

// Acción para eliminar un tweet
export const deleteTweetAction = (tweetId: string) => {
    return async (dispatch: Function) => {
        try {
            await deleteTweet(tweetId);  // Llamamos a la función para eliminar el tweet
            dispatch({
                action: Actions.DELETE_TWEET,
                payload: tweetId,  // Retornamos el tweetId como payload
            });
        } catch (error) {
            console.error("Error al eliminar tweet:", error);
        }
    };
};

// Acción para establecer las credenciales del usuario
export const setUserCredentials = (user: string) => {
    return {
        action: Actions.SETUSERCREDENTIALS,
        payload: user,
    };
};

export const setUser = (user: ProfileData) => {
    return {
        action: Actions.SET_USER,
        payload: user,
    };
};

// Acción para agregar una respuesta, con text e imageUrl (con imagen opcional)
export const addResponse = (text: string, imageUrl: string = '') => {
    return {
        action: Actions.ADD_TWEET,
        payload: { text, imageUrl } as TweetData, // Usar el tipo Tweet para mayor seguridad
    };
};
