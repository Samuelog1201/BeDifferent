import { AttributeTweet } from '../tweet/TweetComponent';
import { AttributeMyTweet } from '../tweet/MyTweetComponent';
import { dataTweet } from '../../data/data'; 
import { appState } from '../../store/';
import { addTweet, getTweetsListener } from '../../utils/firebase';
import { TweetData } from '../../types/tweets';

class CenterSection extends HTMLElement {
    private loggedInProfile: { uid: number; name: string; avatar: string } | null = null;
    private tweetListParent:Element | null = null;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const shadowRoot = this.shadowRoot;
        if (shadowRoot) {
            shadowRoot.innerHTML = `
                <style>
                    /* Estilos del componente central */
                    .tweet-list {
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                    }

                    #public {
                        font-family: "Rubik", sans-serif;
                        color: #333; /* Color del título */
                        text-align: center;
                        font-weight: bold;
                    }

                    p {
                        font-family: "Rubik", sans-serif;
                        color: #555; /* Color del texto */
                    }

                    .tweet-input {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                        align-items: center;
                        width: 100%; /* Ocupa todo el ancho disponible */
                        max-width: 500px; /* Ancho máximo para los inputs */
                        margin: 0 auto; /* Centra el contenedor */
                        padding: 15px; /* Espaciado interno */
                        background-color: #f9f9f9; /* Fondo claro */
                        border-radius: 10px; /* Bordes redondeados */
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra suave */
                    }

                    textarea, input[type="text"] {
                        width: 100%; /* Ancho completo */
                        padding: 10px; /* Espaciado interno */
                        border: 1px solid #ccc; /* Borde gris claro */
                        border-radius: 5px; /* Bordes redondeados */
                        font-family: "Rubik", sans-serif; /* Fuente */
                        font-size: 1em; /* Tamaño de fuente */
                        resize: none; /* Evita el redimensionamiento manual en textarea */
                        overflow: hidden; /* Evita barras de desplazamiento en textarea */
                    }

                    textarea:focus, input[type="text"]:focus {
                        border-color: #9c9c9c; /* Color del borde al enfocar */
                        outline: none; /* Quitar el contorno por defecto */
                    }

                    button {
                        padding: 10px 20px; /* Espaciado interno del botón */
                        background-color: #808080; /* Color de fondo del botón */
                        color: white; /* Color del texto */
                        border: none; /* Sin borde */
                        border-radius: 5px; /* Bordes redondeados */
                        font-family: "Rubik", sans-serif; /* Fuente */
                        font-size: 1em; /* Tamaño de fuente */
                        cursor: pointer; /* Cursor de mano al pasar sobre el botón */
                        transition: background-color 0.3s; /* Transición suave para el color de fondo */
                    }

                    button:hover {
                        background-color: #4b4b4b; /* Color de fondo al pasar el mouse */
                    }

                    section {
                        padding-top: 15px;
                    }
                </style>

                <section>
                    <h1 id="public">PUBLICACIONES:</h1>
                    <div class="tweet-input">
                        <textarea id="tweet-text" placeholder="¿Qué estás pensando?" rows="3"></textarea>
                        <input type="text" id="tweet-image" placeholder="URL de la imagen" />
                        <button id="tweet-button" disabled>Publicar</button>
                    </div>
                    <div class="tweet-list">
                    </div>
                </section>
            `;

            this.tweetListParent = shadowRoot.querySelector('.tweet-list');
            const tweetButton = shadowRoot.querySelector('#tweet-button') as HTMLButtonElement;
            const tweetText = shadowRoot.querySelector('#tweet-text') as HTMLTextAreaElement;
            const tweetImage = shadowRoot.querySelector('#tweet-image') as HTMLInputElement;

            // Habilitar el botón solo cuando el texto no esté vacío
            tweetText.addEventListener('input', () => {
                tweetButton.disabled = !tweetText.value.trim();
            });
        
            //Agregar Tweet
            if (tweetButton) {
                tweetButton.addEventListener('click', () => {
                    const tweetTextValue = tweetText.value;
                    const tweetImageValue = tweetImage.value;

                    if (appState.user) {
                        if (tweetTextValue.trim() !== "") {
                            const newTweetData: TweetData = {
                                username: String(appState.user.name),
                                content: tweetTextValue,
                                imageUrl: tweetImageValue,
                                createdAt: new Date(),
                                uid: null,
                                avatarUrl: null,
                                userUid: String(appState.user.uid),
                            };
                            // Agregar el nuevo tweet al arreglo
                            dataTweet.push(newTweetData);
                            addTweet(newTweetData); // Agregar el tweet a Firebase

                            // Renderiza los tweets
                            //this.renderTweets(tweetList);

                            // Limpiar los campos
                            tweetText.value = '';
                            tweetImage.value = '';
                            tweetButton.disabled = true; // Deshabilitar botón después de publicar
                        } else {
                            alert("No se puede publicar un tweet vacío");
                        }
                    } else {
                        alert("No hay un perfil logueado");
                    }
                });
            }
        }
        // Recibir Tweets Tiempo real
        getTweetsListener((tweetCollection: any) => {
            if (this.tweetListParent) {
                this.tweetListParent.innerHTML = '';  // Limpiar antes de renderizar
                // Solo renderizamos los tweets cuando se necesite
                tweetCollection.slice().reverse().forEach((tweet: any) => {
                    if (tweet.userUid === appState.user?.uid) {
                        const myTweetCard = document.createElement("my-tweet-component");
                        myTweetCard.setAttribute(AttributeMyTweet.userUid, tweet.userUid);
                        myTweetCard.setAttribute(AttributeMyTweet.content, tweet.content);
                        myTweetCard.setAttribute(AttributeMyTweet.imageUrl, tweet.imageUrl);
                        myTweetCard.setAttribute(AttributeMyTweet.username, tweet.username);
                        myTweetCard.setAttribute(AttributeMyTweet.uid, tweet.uid);
                        this.tweetListParent?.appendChild(myTweetCard);
                    } else {
                        const tweetCard = document.createElement("tweet-component");
                        tweetCard.setAttribute(AttributeTweet.userUid, tweet.userUid);
                        tweetCard.setAttribute(AttributeTweet.content, tweet.content);
                        tweetCard.setAttribute(AttributeTweet.imageUrl, tweet.imageUrl);
                        tweetCard.setAttribute(AttributeTweet.username, tweet.username);
                        tweetCard.setAttribute(AttributeTweet.uid, tweet.uid);
                        this.tweetListParent?.appendChild(tweetCard);
                    }
                });
            }
        });
    }
}

customElements.define("center-section", CenterSection);
export default CenterSection;
