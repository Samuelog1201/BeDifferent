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
				.user_name {
					color: red;
				}
				.my-tweets {
					display: flex;
					flex-direction: column;
					gap: 15px;
				}
				</style>
				<div>
					<h1>Perfil</h1>
					<h2>${this.name ||'Nombre de Usuario'}</h2>
					<h3>${this.email ||'email'}</h3>
					<h3>${this.age ||'edad'}</h3>

					<div class="my-tweets"></div>
				</div>
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