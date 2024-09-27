import Profile, { Attribute } from "../profile/profile";
import { dataTweet } from "../indexPadre";

export enum Attribute3 {
    "name" = "name",
    "text" = "text",
    "image" = "image",
    "avatar" = "avatar",
}

class Tweet extends HTMLElement {
    name?: string;
    text?: string;
    image?: string;
    avatar?: string;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return [Attribute3.name, Attribute3.text, Attribute3.image, Attribute3.avatar];
    }

    attributeChangedCallback(propName: string, _: string | undefined, newValue: string | undefined) {
        switch (propName) {
            case Attribute3.name:
                this.name = newValue;
                break;
            case Attribute3.text:
                this.text = newValue;
                break;
            case Attribute3.image:
                this.image = newValue;
                break;
            case Attribute3.avatar:
                this.avatar = newValue;
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
                        white-space: pre-wrap; /* Asegura que se mantengan los espacios y saltos de línea */
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
                            <h1>${this.name}</h1>
                        </div>         
                        <p>${this.text}</p>
                        <img id="image-upload" src="${this.image}" alt="image upload">
                    </div>
                </section>
            `;
        }   
    }
}

customElements.define("my-tweet", Tweet);
export default Tweet;
