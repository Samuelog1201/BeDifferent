// import { AttributeTweet } from "../indexPadre"; 
import { getTweets } from "../../utils/firebase";
import { TweetData } from "../../types/tweets";  // Asegúrate de tener un tipo de Tweet en tus types

export enum AttributeTweet {
    "username" = "name",
    "content" = "text",
    "imageUrl" = "image",
    "avatar" = "avatar",
}

class TweetComponent extends HTMLElement {
    uid?: string|null;
    username?: string;
    content?: string;
    imageUrl?: string;
    avatar?: string;
    userUid?: string;
    createdAt?: Date;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return [
            AttributeTweet.username,
            AttributeTweet.content,
            AttributeTweet.imageUrl,
            AttributeTweet.avatar
        ];
    }

    attributeChangedCallback(propName: string, _: string | undefined, newValue: string | undefined) {
        switch (propName) {
            case AttributeTweet.username:
                this.username = newValue;
                break;
            case AttributeTweet.content:
                this.content = newValue;
                break;
            case AttributeTweet.imageUrl:
                this.imageUrl = newValue;
                break;
            case AttributeTweet.avatar:
                this.avatar = newValue;
                break;
        }
        this.render();
    }

    connectedCallback() {
        this.loadTweets();
    }

    async loadTweets() {
        try {
            const tweets = await getTweets();  // Obtenemos los tweets de Firebase
            if (tweets.length > 0) {
                const latestTweet: TweetData = tweets[tweets.length - 1];  // Obtenemos el tweet más reciente

                // Asegúrate de tener los valores correctos para todas las propiedades
                this.uid = latestTweet.id;
                this.content = latestTweet.text || 'Contenido no disponible';
                this.imageUrl = latestTweet.imageUrl || 'ruta/a/imagen/predeterminada.png';
                this.userUid = latestTweet.userUid || '';
                this.createdAt = latestTweet.createdAt || new Date();
                
                this.render();  // Volver a renderizar después de obtener los datos
            }
        } catch (error) {
            console.error("Error al cargar los tweets desde Firebase:", error);
        }
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
                            <img id="icono-perfil" src="${this.avatar}" alt="avatar"> 
                            <h1>${this.username}</h1>
                        </div>         
                        <p>${this.content}</p>
                        <img id="image-upload" src="${this.imageUrl}" alt="image upload">
                    </div>
                </section>
            `;
        }
    }
}

customElements.define("tweet-component", TweetComponent);  // Define el nuevo nombre de la clase
export default TweetComponent;
