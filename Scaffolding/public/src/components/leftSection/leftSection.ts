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
                    h1 {
                        font-family: "Rubik", sans-serif;
                    }

                    p {
                        font-family: "Rubik", sans-serif;
                    }
                    section {
                        width: 350px;
                        background-color: #f8f9fa;
                        padding: 10px;
                        height: 100vh; /* Altura completa */
                    }
                    img {
                    max-width: 100%; 
                    }
                </style>
                <section>
                    <h1>Noticias</h1>
                    <h2> Mr Olympia Cbum </h2>
                    <p>Christopher Adam Bumstead es un culturista profesional canadiense, miembro oficial de la Federación Internacional de Fisicoculturismo.​ Bumstead es el actual campeón de Mr. Olympia Classic Physique, habiendo ganado la competición en 2019, 2020, 2021, 2022 y 2023. También fue subcampeón en 2017 y 2018.</p>
                     <img id "noticia-cbum" src="https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/noticia-cbum.jpg?alt=media&token=bed92b52-7fd1-4238-8ec8-caf45daf542c" alt="Noticia">
                </section>
            `;
        }
    }
}

customElements.define("left-section", LeftSection);
export default LeftSection;
