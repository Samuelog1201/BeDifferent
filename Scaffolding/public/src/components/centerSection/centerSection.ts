import Tweet, { Attribute3 } from '../tweet/tweet'; 
import { Attribute } from '../indexPadre';
import { dataTweet } from '../indexPadre';

class CenterSection extends HTMLElement {
    private loggedInProfile: { uid: number; name: string; avatar: string } | null = null; // Perfil logueado

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    setLoggedInProfile(profile: { uid: number; name: string; avatar: string }) {
        this.loggedInProfile = profile;
        this.render(); // Re-renderiza cuando se establece el perfil logueado
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

            h1 {
                font-family: "Rubik", sans-serif;
                color: #333; /* Color del título */
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
            <div class="tweet-input">
                <textarea id="tweet-text" placeholder="¿Qué estás pensando?" rows="3"></textarea>
                <input type="text" id="tweet-image" placeholder="URL de la imagen" />
                <button id="tweet-button">Publicar Tweet</button>
            </div>
        </section>
        
        <div class="tweet-list"></div>
        `;

            const tweetList = shadowRoot.querySelector('.tweet-list');
            const tweetButton = shadowRoot.querySelector('#tweet-button') as HTMLButtonElement;

            if (tweetButton) {
                // Asegurarnos de que el botón y el input están correctamente seleccionados
                tweetButton.addEventListener('click', () => {
                    const tweetText = (shadowRoot.querySelector('#tweet-text') as HTMLTextAreaElement).value;
                    const tweetImage = (shadowRoot.querySelector('#tweet-image') as HTMLInputElement).value;

                    if (this.loggedInProfile) {
                        if (tweetText.trim() !== "") {  // Asegurar que el tweet tenga contenido
                            console.log("Publicando tweet:", tweetText, tweetImage);
                            dataTweet.push({
                                username: this.loggedInProfile.name,  // Nombre del usuario logueado
                                text: tweetText,
                                image: tweetImage,
                                avatarTweet: this.loggedInProfile.avatar  
                            });
                            this.renderTweets(tweetList);  // Renderiza los tweets después de agregar uno nuevo

                            // Limpiar los campos de entrada
                            (shadowRoot.querySelector('#tweet-text') as HTMLTextAreaElement).value = '';
                            (shadowRoot.querySelector('#tweet-image') as HTMLInputElement).value = '';
                        } else {
                            console.error("No se puede publicar un tweet vacío");
                        }
                    } else {
                        console.error("No hay un perfil logueado");
                    }
                });
            } else {
                console.error("No se encontró el botón para publicar tweet");
            }

            // Renderiza los tweets existentes
            this.renderTweets(tweetList);
        }
    }

    private renderTweets(tweetList: Element | null) {
        if (tweetList) {
            tweetList.innerHTML = '';  // Limpia la lista antes de volver a renderizar

            console.log("Tweets a renderizar:", dataTweet);

            // Renderiza los tweets recibidos del array dataTweet en orden inverso
            dataTweet.slice().reverse().forEach((tweet) => {
                const tweetCard = document.createElement("my-tweet") as Tweet;
                tweetCard.setAttribute(Attribute3.name, tweet.username);
                tweetCard.setAttribute(Attribute3.text, tweet.text);
                tweetCard.setAttribute(Attribute3.image, tweet.image);
                tweetCard.setAttribute(Attribute3.avatar, String(tweet.avatarTweet));  
                tweetList.appendChild(tweetCard);
            });
        } else {
            console.error("No se encontró la lista de tweets");
        }
    }
}

customElements.define("center-section", CenterSection);
export default CenterSection;
