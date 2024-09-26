import { dataNotices } from "../indexPadre";
import Notice, { Attribute4 } from "../notice/notice"

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
                    
                    
                </style>

                <section> 
                <h1> Ultimas Noticias </h1>
                <div class="notice-list"> </div>
                </section> 
                

            `;

            // Selecciona el contenedor donde se insertarán los tweets
            const noticeList = this.shadowRoot.querySelector('.notice-list');

            // Renderiza las noticias recibidas del array dataNotice
            dataNotices.forEach(notice => {
                const noticeCard = document.createElement("my-notice") as Notice;
                noticeCard.setAttribute(Attribute4.titleNotice, notice.titleNotice);
                noticeCard.setAttribute(Attribute4.textNotice, notice.textNotice);
                noticeCard.setAttribute(Attribute4.imageNotice, notice.imageNotice);
                noticeList?.appendChild(noticeCard); // Añade la noticia a la lista
            });
        }
    }
}

customElements.define("left-section", LeftSection);
export default LeftSection;
