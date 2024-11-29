import { reducer } from './reducer';
import Storage from '../utils/storage';
import { AppState, Observer, Screens } from '../types/store';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirebaseInstance } from '../utils/firebase';
import { navigate, setUserCredentials, setUser } from './actions';
import { ProfileData } from '../types/store';

// Función para manejar la autenticación
const onAuth = async () => {
	const { auth } = await getFirebaseInstance();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			user.uid !== null ? dispatch(setUserCredentials(user.uid)) : ''; //Es la que se encarga de guardar el id del usuario
			const loggedUser:ProfileData = {
				name: user.displayName ? user.displayName : 'Usuario',
				uid: user.uid,
				email: user.email,
				avatar: ''
			};
			dispatch(setUser(loggedUser));
			dispatch(navigate(Screens.DASHBOARD)); //Esta es la de navegar a dashboard
		} else {
			dispatch(navigate(Screens.LOGIN));
		}
	});
};
// Verificación de Auth
const OnPageLoaded = () => {
	onAuth();
};

window.addEventListener('load', OnPageLoaded);

// El estado global, appState
const initialState: AppState = {
	screen: Screens.LOGIN, 
	user: null, // Mantengo solo el campo de usuario
	tweets: [], // Asegúrate de que 'tweets' esté definido en tu tipo AppState
};

// AppState
export let appState = initialState;

let observers: Observer[] = [];

// Crear el dispatch
export const dispatch = (action: any) => {
	const clone = JSON.parse(JSON.stringify(appState));
	const newState = reducer(action, clone);
	appState = newState;

	// Persistencia (opcional)
	// persistStore(newState);

	// Notificar a los observadores
	observers.forEach((o: any) => o.render());
};

// Agregar los observadores
export const addObserver = (ref: any) => {
	observers = [...observers, ref];
};

// Función para obtener el estado actual
export const getState = (): AppState => {
	return appState;
};
