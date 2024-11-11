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
                /* Estilos del componente */
                .tweet-list {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                .tweet-input {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-bottom: 20px;
                }
                #tweet-text {
                    resize: none;
                    padding: 10px;
                    font-size: 1em;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                }
                #tweet-image {
                    padding: 10px;
                    font-size: 1em;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                }
                #tweet-button {
                    padding: 10px;
                    font-size: 1.2em;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    cursor: pointer;
                    border-radius: 5px;
                }
                #tweet-button:disabled {
                    background-color: #ccc;
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
