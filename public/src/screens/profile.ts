import { addObserver, appState, dispatch } from '../store';
import { getTweetsByUser, getTweets, getProfileData, getTweetsByUserListener } from '../utils/firebase';
import { TweetComponent } from '../components/indexPadre';
import { AttributeTweet } from '../components/tweet/TweetComponent';
import { AttributeMyTweet } from '../components/tweet/MyTweetComponent';

export enum AttributeProfile  {
    name = "name",
    age = "age",
    email = "email",
	uid = "uid",
	avatar = "avatar"
}

class Profile extends HTMLElement {
    name?: string;
    age?: string;
    email?: string;
    uid?: string = '';
    private tweetListParent:Element | null = null;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.uid = appState.user?.uid || '';
		this.loadProfileData();
	}

    async loadProfileData() {
        try {
            const data = await getProfileData();  // Obtenemos los tweets de Firebase
			this.name = data?.name;
			this.age = data?.age;
			this.email = data?.email;
            this.render();
        } catch (error) {
            console.error("Error al cargar los info del usuario desde Firebase:", error);
        }
    }

	async render() {
		if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
					/* Tarjeta centrada para el perfil */
					section {
						display: flex;
						justify-content: center;
						align-items: center;
						flex-direction: column;
						background-color: #f9f9f9; /* Fondo claro */
						border-radius: 15px; /* Bordes más redondeados */
						padding: 20px; /* Espaciado interno */
						box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
						max-width: 400px; /* Ancho máximo para la tarjeta */
						width: 100%; /* Ocupa todo el ancho disponible */
						margin: 20px auto; /* Centra la tarjeta verticalmente */
					}

					.info-perfil {
						text-align: center; /* Centra el contenido */
						margin-bottom: 15px; /* Separación con los tweets */
					}

					h1 {
						font-size: 1.8em;
						font-family: "Rubik", sans-serif;
						font-weight: bold;
						color: #333; /* Título oscuro */
						margin-bottom: 10px; /* Espaciado inferior */
					}

					h2, h3 {
						font-family: "Rubik", sans-serif;
						color: #555; /* Color gris para subtítulos */
						margin: 5px 0; /* Espaciado uniforme */
					}

					h2 {
						font-size: 1.5em; /* Tamaño ligeramente mayor */
						font-weight: bold;
					}

					h3 {
						font-size: 1.2em;
					}

					.user_name {
						color: #d9534f; /* Rojo claro consistente con el tema */
						font-weight: bold;
					}

					.my-tweets {
						display: flex;
						flex-direction: column;
						gap: 15px;
						width: 100%; /* Ocupa todo el ancho de la tarjeta */
					}
				</style>

				<section>
					<div class="info-perfil">
						<h1>Perfil</h1>
						<h2 class="user_name">${this.name || 'Nombre de Usuario'}</h2>
						<h3>${this.email || 'email@example.com'}</h3>
						<h3>Edad: ${this.age || 'Edad no especificada'}</h3>
					</div>    

					<div class="my-tweets"></div>
				</section>

            `;

            this.tweetListParent = this.shadowRoot.querySelector('.my-tweets');

			if (this.uid) {
				getTweetsByUserListener((tweetCollection: Array<any>) => {
					if (this.tweetListParent) {
						this.tweetListParent.innerHTML = '';  // Limpiar antes de renderizar
						// Solo renderizamos los tweets cuando se necesite
						tweetCollection.slice().reverse().forEach((tweet: any) => {
							//console.log(tweet);
							const tweetCard = document.createElement("my-tweet-component");
							tweetCard.setAttribute(AttributeMyTweet.userUid, tweet.userUid);
							tweetCard.setAttribute(AttributeMyTweet.content, tweet.content);
							tweetCard.setAttribute(AttributeMyTweet.imageUrl, tweet.imageUrl);
							tweetCard.setAttribute(AttributeMyTweet.username, tweet.username);
							tweetCard.setAttribute(AttributeMyTweet.uid, tweet.uid);
							// tweetCard.setAttribute(AttributeTweet.avatar, tweet.avatarUrl); // Si decides usar avatarUrl
							this.tweetListParent?.appendChild(tweetCard);
						});
					}
				}, this.uid);
			}
		}
	}
}
	
customElements.define('app-profile', Profile);
export default Profile; 