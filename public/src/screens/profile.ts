/*/ 
import { addObserver, appState, dispatch } from '../store';
import { getTweetsByUser, getTweets } from '../utils/firebase';
import { Tweet } from '../components/indexPadre';
import { getStorage } from 'firebase/storage';

class Profile extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	async connectedCallback() {
		if (appState.tweetsByUser.length === 0) {
			const action = await getTweetsByUser();
			dispatch(action);
		} else {
			this.render();
		}
	}

	async render() {
		if (this.shadowRoot) {
			const title = this.ownerDocument.createElement('h1');
			title.innerText = 'Pérfil';
			this.shadowRoot.appendChild(title);

			//Para subir la imagen
			const pImage = this.ownerDocument.createElement('input');
			pImage.type = 'file';
			pImage.addEventListener('change', () => {
				const file = pImage.files?.[0];
				if (file) uploadFileCloudinary(file, appState.user);
			});
			this.shadowRoot.appendChild(pImage);

			//Para traer y renderizar la imagen
			const urlImg = await getFileCloudinary(appState.user);
			const profileImg = this.ownerDocument.createElement('img');
			if (urlImg) profileImg.src = urlImg;
			this.shadowRoot.appendChild(profileImg);

			appState.tweetsByUser.forEach((product: any) => {
				const name = this.ownerDocument.createElement('h2');
				name.innerText = Tweet.name;
				this.shadowRoot?.appendChild(name);

				const price = this.ownerDocument.createElement('h2');
				price.innerText = product.price;
				this.shadowRoot?.appendChild(price);
			});
		}
	}
}

customElements.define('app-profile', Profile);
export default Profile; 
*/