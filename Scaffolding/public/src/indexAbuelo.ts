import * as components from "./components/indexPadre"
import { Profile, NavBar, LeftSection, RightSection, Tweet, CenterSection } from "./components/indexPadre";
import { Attribute,Attribute2, Attribute3 } from "./components/indexPadre";
import { dataProfiles } from "./data/dataProfiles";
import { dataTweet } from "./data/dataTweet";

class AppContainer extends HTMLElement {
    profiles: Profile[] = [];
    private rightSection!: RightSection; // Referencia a la sección derecha

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

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
        // Asegúrate de que rightSection ya está inicializada aquí
        this.addNavbarEventListener(); // Mover después de render
    }
    
    addNavbarEventListener() {
        const navbar = this.shadowRoot?.querySelector("my-navbar");
        if (navbar) {
            navbar.addEventListener('toggle-user-list', () => {
                // Verifica que rightSection esté inicializada
                console.log("Toggling user list visibility from AppContainer");
                if (this.rightSection) {
                    this.rightSection.toggleUserList(); // Llamar al método para alternar la lista de usuarios en RightSection
                } else {
                    console.error("rightSection is not initialized yet");
                }
            });
        }
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = ``;
    
            const style = document.createElement("style");
            style.textContent = `
                .container {
                    display: flex; /* Usar flex para las secciones */
                    margin: 10px
                }
                central-section {
                    flex-grow: 1; /* Hacer que la sección central ocupe el espacio restante */
                }
            `;
    
            // Navbar creation
            const navbar = document.createElement("my-navbar") as NavBar;
            navbar.setAttribute(Attribute2.userlogo, "https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-User.png?alt=media&token=639c3c12-4a33-47bb-b29e-ddbc571b96ff");
            navbar.setAttribute(Attribute2.settings, "https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-Settings.png?alt=media&token=97671f73-3ed8-4a19-ae13-b7c1f33271cb");
            navbar.setAttribute(Attribute2.logo, "https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-BD.png?alt=media&token=8592d2ae-13df-4a35-8911-83dbac66123b");
        
            // Crear las secciones izquierda y derecha
            const leftSection = document.createElement("left-section") as LeftSection;
            const centerSection = document.createElement("center-section") as CenterSection;
            this.rightSection = document.createElement("right-section") as RightSection;
    
            // Renderizar tweets en la sección central
            dataTweet.forEach((tweet) => {
                const tweetCard = this.ownerDocument.createElement("my-tweet") as Tweet;
                tweetCard.setAttribute(Attribute3.text, String(tweet.text));
                tweetCard.setAttribute(Attribute3.username, String(tweet.username));
                tweetCard.setAttribute(Attribute3.image, String(tweet.image));
                centerSection.appendChild(tweetCard);
            });
    
            // Pasar los perfiles a RightSection
            this.rightSection.setProfiles(this.profiles);
    
            // Append components to shadowRoot
            this.shadowRoot?.appendChild(style);
    
            // Crear contenedor para el navbar
            const navbarContainer = document.createElement("nav");
            navbarContainer.setAttribute("class", "navbarContainer");
            navbarContainer.appendChild(navbar);
    
            // Crear contenedor para las secciones
            const container = document.createElement("div");
            container.setAttribute("class", "container");
            container.appendChild(leftSection);
            container.appendChild(centerSection);
            container.appendChild(this.rightSection); // Añadir la sección derecha al contenedor
    
            this.shadowRoot?.appendChild(navbarContainer);
            this.shadowRoot?.appendChild(container);
        }
    }
    
}

customElements.define("app-container", AppContainer);
