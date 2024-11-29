import { dataNotices } from "../indexPadre";
import Notice, { AttributeNotice } from "../notice/notice"

class LeftSection extends HTMLElement {
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
                    /* Estilos del componente */
                    .notice-list {
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

                    section {
                        padding: 10px;
                        width: 350px;
                        z-index: 1000;
                    }
                    
                     button {
                        padding: 10px 20px;
                        background-color: #D9D9D9;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        font-family: "Rubik", sans-serif;
                        font-size: 1em;
                        cursor: pointer;
                        margin-bottom: 10px;
                        transition: background-color 0.3s;
                    }

                    button:hover {
                        background-color: #4b4b4b;
                    
                </style>

                <section> 
                <h1> Ultimas Noticias </h1>
                <button id="toggle-notices">Noticias</button>
                <div class="notice-list"></div>
                </section> 
                

            `;

            // Selecciona el contenedor donde se insertarán los tweets
            const noticeList = this.shadowRoot.querySelector('.notice-list');

            // Renderiza las noticias recibidas del array dataNotice
            dataNotices.forEach(notice => {
                const noticeCard = document.createElement("my-notice") as Notice;
                noticeCard.setAttribute(AttributeNotice.titleNotice, notice.titleNotice);
                noticeCard.setAttribute(AttributeNotice.textNotice, notice.textNotice);
                noticeCard.setAttribute(AttributeNotice.imageNotice, notice.imageNotice);
                noticeList?.appendChild(noticeCard); // Añade la noticia a la lista
            });
        }
    }
}

customElements.define("left-section", LeftSection);
export default LeftSection;
