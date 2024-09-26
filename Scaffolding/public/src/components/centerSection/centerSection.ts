import Tweet, { Attribute3 } from '../tweet/tweet'; 
import { Attribute, dataTweet, dataProfiles } from '../indexPadre';


class CenterSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    /* Estilos del componente central */
                    .tweet-list {
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                    }

                    h1 {
                        font-family: "Rubik", sans-serif;
                    }

                    p {
                        font-family: "Rubik", sans-serif;
                    }
                    
                    
                </style>
                <div class="tweet-list">
                </div>
            `;

            // Selecciona el contenedor donde se insertarán los tweets
            const tweetList = this.shadowRoot.querySelector('.tweet-list');

            // Renderiza los tweets recibidos del array dataTweet
            dataTweet.forEach (tweet => {
                const tweetCard = document.createElement("my-tweet") as Tweet;
                tweetCard.setAttribute(Attribute3.username, tweet.username);
                tweetCard.setAttribute(Attribute3.text, tweet.text);
                tweetCard.setAttribute(Attribute3.image, tweet.image);
                tweetList?.appendChild(tweetCard); // Añade el tweet a la lista
            });

        }
    }
}


customElements.define("center-section", CenterSection);
export default CenterSection;
