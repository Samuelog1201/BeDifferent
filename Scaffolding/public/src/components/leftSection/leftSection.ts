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
                    section {
                        width: 250px;
                        background-color: #f0f0f0;
                        padding: 10px;
                        border-right: 1px solid #ddd;
                        height: 100vh; /* Altura completa */
                    }
                </style>
                <section>
                    <h2>Sección Izquierda</h2>
                    <p>Aquí puedes agregar contenido para la sección izquierda.</p>
                </section>
            `;
        }
    }
}

customElements.define("left-section", LeftSection);
export default LeftSection;
