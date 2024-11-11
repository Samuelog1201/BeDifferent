import { appState } from '../store';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { TweetData } from '../types/tweets'

let db: any;
let auth: any;
let storage: any;

export const getFirebaseInstance = async () => {
    if (!db) {
        const { initializeApp } = await import('firebase/app');
		const { getFirestore } = await import('firebase/firestore');
		const { getAuth } = await import('firebase/auth');
		const { getStorage } = await import('firebase/storage');

        const firebaseConfig = {
            apiKey: "AIzaSyDJSH7Mam9Dj6y7zgNZphiFDjWGdeHjk4g",
            authDomain: "bediffent-ef0f5.firebaseapp.com",
            databaseURL: 'https://bediffent-ef0f5.firebaseio.com',
            projectId: "bediffent-ef0f5",
            storageBucket: "bediffent-ef0f5.firebasestorage.app",
            messagingSenderId: "603260486291",
            appId: "1:603260486291:web:8bb361879099d7b2130366",
            measurementId: 'G-G9ELH58HS7',
          };
        
        const app = initializeApp(firebaseConfig);
		db = getFirestore(app);
		auth = getAuth(app);
		storage = getStorage();
	}
	return { db, auth, storage };
};

// Función para registrar un usuario
export const registerUser = async (credentials: any) => {
	try {
		const { auth, db } = await getFirebaseInstance();
		const { createUserWithEmailAndPassword } = await import('firebase/auth');
		const { doc, setDoc } = await import('firebase/firestore');

		const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);

		const where = doc(db, 'users', userCredential.user.uid);
		const data = {
			age: credentials.age,
			name: credentials.name,
		};

		await setDoc(where, data);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

// Función para iniciar sesión de un usuario
export const loginUser = async (email: string, password: string) => {
	try {
		const { auth } = await getFirebaseInstance();
		const { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } = await import('firebase/auth');

		setPersistence(auth, browserLocalPersistence)
			.then(() => {
				return signInWithEmailAndPassword(auth, email, password);
			})
			.catch((error: any) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
	} catch (error) {
		console.error(error);
	}
};

// Función para agregar un tweet
export const addTweet = async (tweet: TweetData) => {
    try {
        const { db } = await getFirebaseInstance();
        const { collection, addDoc } = await import('firebase/firestore');

        const where = collection(db, 'tweets');
        const tweetData = {
            content: tweet.text,
            imageUrl: tweet.imageUrl || '',  // Si no se proporciona imageUrl, usar una cadena vacía
            userUid: appState.user?.uid || '',
            createdAt: new Date(),
        };
        await addDoc(where, tweetData);
        console.log('Tweet añadido con éxito');
    } catch (error) {
        console.error('Error al añadir el tweet', error);
    }
};

// Función para obtener tweets
export const getTweets = async () => {
    try {
        const { db } = await getFirebaseInstance();
        const tweetCollection = collection(db, 'tweets');
        const querySnapshot = await getDocs(tweetCollection);
        const data: TweetData[] = [];

        querySnapshot.forEach((doc) => {
            data.push(doc.data() as TweetData);  // Aseguramos que los datos tienen la forma de un Tweet
        });

        return data;
    } catch (error) {
        console.error('Error al obtener los tweets', error);
        return []; // Regresamos un array vacío en caso de error
    }
};

// Función para obtener tweets de un usuario específico
export const getTweetsByUser = async (userId: string) => {
    try {
        const { db } = await getFirebaseInstance();
        const tweetCollection = collection(db, 'tweets');
        const querySnapshot = await getDocs(tweetCollection);
        const data: TweetData[] = [];

        querySnapshot.forEach((doc) => {
            const tweet = doc.data() as TweetData;
            if (tweet.userUid === userId) {
                data.push(tweet);
            }
        });

        return data;
    } catch (error) {
        console.error('Error al obtener los tweets del usuario', error);
        return [];  // Regresamos un array vacío en caso de error
    }
};

// Función para eliminar un tweet
export const deleteTweet = async (tweetId: string) => {
    try {
        const { db } = await getFirebaseInstance();
        const tweetRef = doc(db, 'tweets', tweetId);  // Referencia al tweet en Firestore
        await deleteDoc(tweetRef);  // Eliminar el tweet
        console.log('Tweet eliminado con éxito');
    } catch (error) {
        console.error('Error al eliminar el tweet', error);
    }
};

