import * as components from "./components/indexPadre";
import { Profile, NavBar, LeftSection, RightSection, Tweet, CenterSection, Notice } from "./components/indexPadre";
import { Attribute, Attribute2, Attribute3, Attribute4 } from "./components/indexPadre";
import { dataProfiles, dataTweet, dataNotices } from "./components/indexPadre";

class AppContainer extends HTMLElement {
    profiles: Profile[] = [];
    private rightSection!: RightSection;  // Cambiar la referencia a rightSection

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // Inicializar los perfiles
        dataProfiles.forEach((user) => {
            const profileCard = this.ownerDocument.createElement("my-profile") as Profile;
            profileCard.setAttribute(Attribute.name, user.name);
            profileCard.setAttribute(Attribute.uid, String(user.uid));
            profileCard.setAttribute(Attribute.image, String(user.avatar));
            this.profiles.push(profileCard);
        });
    }

    connectedCallback() {
        this.render();
        this.addNavbarEventListener();  // Asegúrate de que rightSection esté inicializada
    }

    addNavbarEventListener() {
        const navbar = this.shadowRoot?.querySelector("my-navbar");
        if (navbar) {
            navbar.addEventListener('toggle-user-list', () => {
                console.log("Toggling user list visibility from AppContainer");
                if (this.rightSection) {
                    this.rightSection.toggleUserList();  // Solo afecta a rightSection
                } else {
                    console.error("rightSection is not initialized yet");
                }
            });
        }
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = ``;  // Limpiar el shadowRoot

            // Crear estilos
            const style = document.createElement("style");
            style.textContent = `
                @import url('https://fonts.googleapis.com/css2?family=League+Gothic&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
                .container {
                    display: flex;  /* Usar flex para las secciones */
                    margin: 10px;
                }
                center-section {
                    flex-grow: 1;  /* Hacer que la sección central ocupe el espacio restante */
                }
            `;

            // Navbar creation
            const navbar = document.createElement("my-navbar") as NavBar;
            navbar.setAttribute(Attribute2.userlogo, "https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-User.png?alt=media&token=639c3c12-4a33-47bb-b29e-ddbc571b96ff");
            navbar.setAttribute(Attribute2.settings, "https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-Settings.png?alt=media&token=97671f73-3ed8-4a19-ae13-b7c1f33271cb");
            navbar.setAttribute(Attribute2.logo, "https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-BD.png?alt=media&token=8592d2ae-13df-4a35-8911-83dbac66123b");

            // Crear las secciones izquierda, central y derecha
            const leftSection = document.createElement("left-section") as LeftSection;
            const centerSection = document.createElement("center-section") as CenterSection;
            this.rightSection = document.createElement("right-section") as RightSection;


            // Pasar los perfiles a RightSection
            this.rightSection.setProfiles(this.profiles);

            // Añadir el estilo al shadowRoot
            this.shadowRoot.appendChild(style);

            // Crear contenedor para el navbar
            const navbarContainer = document.createElement("nav");
            navbarContainer.setAttribute("class", "navbarContainer");
            navbarContainer.appendChild(navbar);

            // Crear contenedor para las secciones
            const container = document.createElement("div");
            container.setAttribute("class", "container");
            container.appendChild(leftSection);
            container.appendChild(centerSection);
            container.appendChild(this.rightSection);  // Añadir la sección derecha al contenedor

            // Añadir el navbar y el contenedor al shadowRoot
            this.shadowRoot.appendChild(navbarContainer);
            this.shadowRoot.appendChild(container);
        }
    }
}

customElements.define("app-container", AppContainer);
