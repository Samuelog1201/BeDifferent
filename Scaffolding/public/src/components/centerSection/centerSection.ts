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
                <style>
                    /* Estilos del componente central */
                </style>
                <div>
                    <h1> Central </h1>
                    <my-tweet></my-tweet>
                </div>
            `;
        }
    }
}

customElements.define("center-section", CenterSection);
export default CenterSection;