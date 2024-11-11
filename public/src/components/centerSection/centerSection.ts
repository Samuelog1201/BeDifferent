import Tweet from '../tweet/TweetComponent'; 
import { AttributeTweet } from '../indexPadre'; 
import { dataTweet } from '../../data/data'; 
import { appState } from '../../store/';
import { addTweet } from '../../utils/firebase';
import { TweetData } from '../../types/tweets';

class CenterSection extends HTMLElement {
    private loggedInProfile: { uid: number; name: string; avatar: string } | null = null;

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
                padding-top: 15px
                }
            </style>

            <section>
                <h1 id="public">PUBLICACIONES:</h1>
                <div class="tweet-input">
                    <textarea id="tweet-text" placeholder="¿Qué estás pensando?" rows="3"></textarea>
                    <input type="text" id="tweet-image" placeholder="URL de la imagen" />
                    <button id="tweet-button" disabled>Publicar</button>
                </div>
            </section>

            <div class="tweet-list"></div>
            `;

            const tweetList = shadowRoot.querySelector('.tweet-list');
            const tweetButton = shadowRoot.querySelector('#tweet-button') as HTMLButtonElement;
            const tweetText = shadowRoot.querySelector('#tweet-text') as HTMLTextAreaElement;
            const tweetImage = shadowRoot.querySelector('#tweet-image') as HTMLInputElement;

            // Habilitar el botón solo cuando el texto no esté vacío
            tweetText.addEventListener('input', () => {
                tweetButton.disabled = !tweetText.value.trim();
            });

            if (tweetButton) {
                tweetButton.addEventListener('click', () => {
                    const tweetTextValue = tweetText.value;
                    const tweetImageValue = tweetImage.value;

                    if (appState.user) {
                        if (tweetTextValue.trim() !== "") {
                            const newTweetData:TweetData = {
                                username: String(appState.user.name),
                                text: tweetTextValue,
                                imageUrl: tweetImageValue,
                                createdAt: new Date(),
                                id: null,
                                avatarUrl: null,
                                userUid: String(appState.user.uid),
                            };
                            // Agregar el nuevo tweet al arreglo
                            dataTweet.push(newTweetData);
                            addTweet(newTweetData);
                            this.renderTweets(tweetList);

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

            // Renderiza los tweets existentes
            this.renderTweets(tweetList);
        }
    }

    private renderTweets(tweetList: Element | null) {
        if (tweetList) {
            tweetList.innerHTML = '';  // Limpiar antes de renderizar
            // Solo renderizamos los tweets cuando se necesite
            dataTweet.slice().reverse().forEach((tweet) => {
                const tweetCard = document.createElement("my-tweet");
                tweetCard.setAttribute(AttributeTweet.username, tweet.username);
                tweetCard.setAttribute(AttributeTweet.content, tweet.text);
                tweetCard.setAttribute(AttributeTweet.imageUrl, tweet.imageUrl);
                // tweetCard.setAttribute(AttributeTweet.avatar, tweet.avatarUrl);
                tweetList.appendChild(tweetCard);
            });
        }
    }
}

customElements.define("center-section", CenterSection);
export default CenterSection;
