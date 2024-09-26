export enum Attribute3 {
    "username" = "username",
    "text" = "text",
    "image" = "image",
}

class Tweet extends HTMLElement {
    username?: string;
    text?: string;
    image?: string;

    

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return [Attribute3.username, Attribute3.text, Attribute3.image];
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
        }
        this.render();
    }

        render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=League+Gothic&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=League+Gothic&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
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
                    font-size: 1.2em;
                    margin: 5px 0;
                    font-family: "Rubik", sans-serif;
                     font-style: bold;
                }
                
                p {
                    font-family: "Rubik", sans-serif;
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
                    <h1>${this.username}</h1>
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
