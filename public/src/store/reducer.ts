import { Actions, AppState, Action } from '../types/store';

// Reducer con tipos explícitos
export const reducer = (currentAction: Action, currentState: AppState): AppState => {
    const { action, payload } = currentAction;

    switch (action) {
        case Actions.NAVIGATE:
            // Acción para navegar entre pantallas
            return {
                ...currentState,
                screen: payload,
            };

        case Actions.SETUSERCREDENTIALS:
            // Acción para establecer el ID del usuario
            return {
                ...currentState,
                user: payload,
            };

        case Actions.SET_USER   :
            // Acción para establecer el ID del usuario
            return {
                ...currentState,
                user: payload,
            };

        case Actions.ADD_TWEET:
            // Acción para agregar un tweet
            return {
                ...currentState,
                tweets: [...currentState.tweets, payload], // Agrega el nuevo tweet
            };

        case Actions.DELETE_TWEET:
            // Acción para eliminar un tweet
            return {
                ...currentState,
                tweets: currentState.tweets.filter(tweet => tweet.id !== payload), // Elimina el tweet por ID
            };

        default:
            // Acción desconocida
            console.warn(`Acción desconocida: ${action}`);
            return currentState;
    }
};
