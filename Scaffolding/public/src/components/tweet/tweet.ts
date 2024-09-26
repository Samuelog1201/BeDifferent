import Profile, { Attribute } from "../profile/profile";
export enum Attribute3 {
    "username" = "username",
    "text" = "text",
    "image" = "image",
    "avatar" = "avatar",
}

class Tweet extends HTMLElement {
    username?: string;
    text?: string;
    image?: string;
    avatar?: string;
    

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return [Attribute3.username, Attribute3.text, Attribute3.image, Attribute.avatar] ;
    }

    attributeChangedCallback(propName: string, _: string | undefined, newValue: string | undefined) {
        switch (propName) {
            case Attribute3.username:
                this.username = newValue;
                break;
            case Attribute3.text:
                this.text = newValue;
                break;
            case Attribute3.image:
                this.image = newValue;
                break;
            case Attribute3.image:
                    this.image = newValue;
                    break;
        }
        this.render();
    }

        render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <style>
                section {
                    display: flex; /* O usa display: grid; */
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
                     font-style: bold;
                }
                
                p {
                    font-family: "Rubik", sans-serif;
                    font-size: 1em;
                }
                img {
                    max-width: 100%; /* Asegura que la imagen no se desborde */
                    border-radius: 10px; /* Opcional para redondear bordes */
                    width: 500px;
                    height: auto;

                }
            </style>
            <section>
            <div>
                <div class= "info-perfil">
                    <h1>${this.username}</h1>
                    <img id "icono-perfil" src="${this.avatar}" alt=""> 
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
