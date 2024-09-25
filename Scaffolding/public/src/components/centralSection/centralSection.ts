class CentralSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    private render() {
        // Aquí puedes agregar cualquier estructura que necesites para tu Central Section
        this.shadowRoot!.innerHTML = `
            <section>
                <h2>Central Section</h2>
                <!-- Aquí se agregan los tweets desde el AppContainer -->
            </section>
        `;
    }
}

customElements.define("central-section", CentralSection);
