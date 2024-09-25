class CenterSection extends HTMLElement {
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
            <section>
            <h2>Central Section</h2>
            <p>Test</p>
            <!-- Aquí se agregan los tweets desde el AppContainer -->
        </section>
            `;
        }
    }
}

customElements.define("central-section", CenterSection);
export default CenterSection;
