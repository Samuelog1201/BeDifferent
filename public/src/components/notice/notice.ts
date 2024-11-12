import { AttributeNotice } from "../indexPadre";

class Notice extends HTMLElement {
    titleNotice?: string;
    textNotice?: string;
    imageNotice?: string;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return [AttributeNotice.titleNotice, AttributeNotice.textNotice, AttributeNotice.imageNotice];
    }

    attributeChangedCallback(propName: string, _: string | undefined, newValue: string | undefined) {
        switch (propName) {
            case AttributeNotice.titleNotice:
                this.titleNotice = newValue;
                break;
            case AttributeNotice.textNotice:
                this.textNotice = newValue;
                break;
            case AttributeNotice.imageNotice:
                this.imageNotice = newValue;
                break;
        }
        this.render();
    }

        render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=League+Gothic&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
                section {
                    display: flex;
                    justify-content: left;
                    align-items: left;
                    flex-direction: column;
                    background-color: #f8f9fa;
                    border-radius: 10px;
                    padding: 15px;
                    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
            
                }
                h1 {
                    font-size: 1.2em;
                    margin: 5px 0;
                    font-family: "Rubik", sans-serif;
                     font-style: bold;
                }
                
                p {
                    font-family: "Rubik", sans-serif;
                    text-align: justify;
                }
                img {
                    max-width: 100%; /* Asegura que la imagen no se desborde */
                    border-radius: 10px; /* Opcional para redondear bordes */
                    width: 320px;
                    height: auto;

                }
            </style>
            <section>
                <div>
                    <h1>${this.titleNotice}</h1>
                    <p>${this.textNotice}</p>
                    <img id="image-notice" src="${this.imageNotice}" alt="image notice">
                </div>         

            </section>

        `;
    }
}
}

customElements.define("my-notice", Notice);
export default Notice;
