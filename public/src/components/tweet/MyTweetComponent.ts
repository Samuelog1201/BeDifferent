import { deleteTweetById } from "../../utils/firebase";

// Atributos MyTweet
export enum AttributeMyTweet {
    username = "username",
    userUid = "userUid",
    avatar = "avatarUrl",
    content = "content",
    imageUrl = "imageUrl",
    uid = "uid",
}

class MyTweetComponent extends HTMLElement {
    uid?: string | null;
    username?: string;
    content?: string;
    imageUrl?: string;
    avatar?: string;
    userUid?: string;
    isMyTweet?: string;
    createdAt?: Date;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    
    connectedCallback() {
        this.render();
    }

    // Delete Tweet
    private async handleDeleteTweet(tweetId: string) {
        try {
			if (tweetId) {
				await deleteTweetById(tweetId);
			}
        } catch (error) {
            console.error("Error al borrar el tweet del usuario:", error);
        }
    }

    // Atributos
    static get observedAttributes() {
        return [
            AttributeMyTweet.username,
            AttributeMyTweet.userUid,
            AttributeMyTweet.content,
            AttributeMyTweet.imageUrl,
            AttributeMyTweet.avatar,
            AttributeMyTweet.uid
        ];
    }

    // attributeChangedCallback
    attributeChangedCallback(propName: string, _: string | undefined, newValue: string | undefined) {
        switch (propName) {
            case AttributeMyTweet.username:
                this.username = newValue;
                break;
            case AttributeMyTweet.userUid:
                this.userUid = newValue;
                break;
            case AttributeMyTweet.content:
                this.content = newValue;
                break;
            case AttributeMyTweet.imageUrl:
                this.imageUrl = newValue;
                break;
            case AttributeMyTweet.avatar:
                this.avatar = newValue;
                break;
            case AttributeMyTweet.uid:
                this.uid = newValue;
                break;
        }
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    section {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        background-color: white;
                        border-radius: 10px;
                        padding: 15px;
                        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        font-size: 1.5em;
                        margin: 5px 0;
                        font-family: "Rubik", sans-serif;
                        font-weight: bold;
                    }
                    p {
                        font-family: "Rubik", sans-serif;
                        font-size: 1em;
                        margin-block-start: 1em;
                        margin-block-end: 1em;
                        white-space: pre-wrap;
                    }
                    #image-upload {
                        max-width: 100%;
                        border-radius: 10px;
                        width: 500px;
                        height: auto;
                    }
                    #icono-perfil {
                        width: 50px;
                        height: auto;
                        margin-right: 5px; 
                    }
                    .info-perfil {
                        display: flex;
                        align-items: center; 
                        justify-content: flex-start; 
                    }
                </style>
                <section>
                    <div>
                        <div class="info-perfil">
                            <img id="icono-perfil" src="${this.avatar || 'ruta/a/avatar/predeterminado.png'}" alt="avatar"> 
                            <h1>${this.userUid || 'Usuario desconocido'}</h1>
                        </div>         
                        <p>${this.content || 'Contenido no disponible'}</p>
                        <img id="image-upload" src="${this.imageUrl}" alt="image upload">
                    </div>
                    <button class="delete-tweet">BORRAR</button>
                </section>
            `;

            const deleteButton = this.shadowRoot.querySelector('.delete-tweet');
            if (this.uid) {
                deleteButton?.addEventListener('click', () => { this.handleDeleteTweet(String(this.uid))});
            }
        }
    }
}

customElements.define("my-tweet-component", MyTweetComponent);  // Define el nuevo nombre de la clase
export default MyTweetComponent;
