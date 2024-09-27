import { dataNotices } from "../indexPadre";
import Notice, { Attribute4 } from "../notice/notice";

class LeftSection extends HTMLElement {
    private areNoticesVisible: boolean = false; // Estado para saber si las noticias están visibles o no

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    toggleNotices() {
        this.areNoticesVisible = !this.areNoticesVisible; // Cambia el estado de visibilidad
        this.render(); // Vuelve a renderizar la sección para reflejar los cambios
    }

    renderNotices() {
        const noticeList = this.shadowRoot?.querySelector('.notice-list');
        if (this.areNoticesVisible && noticeList) {
            noticeList.innerHTML = ''; // Limpia las noticias antes de renderizarlas de nuevo
            dataNotices.forEach(notice => {
                const noticeCard = document.createElement("my-notice") as Notice;
                noticeCard.setAttribute(Attribute4.titleNotice, notice.titleNotice);
                noticeCard.setAttribute(Attribute4.textNotice, notice.textNotice);
                noticeCard.setAttribute(Attribute4.imageNotice, notice.imageNotice);
                noticeList.appendChild(noticeCard);
            });
        }
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
                        background-color: #808080;
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
                    }
                </style>

                <section>
                    <button id="toggle-notices">Noticias</button>
                    <div class="notice-list"></div>
                </section>
            `;

            const toggleButton = this.shadowRoot.querySelector('#toggle-notices');
            if (toggleButton) {
                toggleButton.addEventListener('click', () => this.toggleNotices());
            }

            this.renderNotices(); // Renderiza las noticias si están visibles
        }
    }
}

customElements.define("left-section", LeftSection);
export default LeftSection;