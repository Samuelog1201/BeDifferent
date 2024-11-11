class LeftSection extends HTMLElement {
    private areNoticesVisible: boolean = false; // Estado para saber si las noticias están visibles o no

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
                    }
                </style>

                <section>
                    <button id="toggle-notices">Noticias</button>
                    <div class="notice-list"></div>
                </section>
            `;

        }
    }
}

customElements.define("left-section", LeftSection);
export default LeftSection;