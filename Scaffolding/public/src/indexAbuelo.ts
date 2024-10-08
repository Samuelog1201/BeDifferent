import { Profile, NavBar, LeftSection, RightSection, CenterSection, LoginSection } from "./components/indexPadre";
import { Attribute, Attribute2 } from "./components/indexPadre";
import { dataProfiles } from "./components/indexPadre";

class AppContainer extends HTMLElement {
    private loggedInProfile: { uid: number; name: string; avatar: string } | null = null;  // Perfil del usuario logueado
    private rightSection!: RightSection;  // Cambiar la referencia a rightSection
    private centerSection!: CenterSection;  // Añadimos una referencia a centerSection

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    handleLogin(profile: { uid: number; name: string; avatar: string }) {
        this.loggedInProfile = profile; // Asignar el perfil logueado
        this.render(); // Renderizar la aplicación principal después del login
    }

    renderApp() {
        if (this.shadowRoot && this.loggedInProfile) {
            this.shadowRoot.innerHTML = ``;  // Limpiar el shadowRoot

            // Crear estilos
            const style = document.createElement("style");
            style.textContent = `
                @import url('https://fonts.googleapis.com/css2?family=League+Gothic&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=League+Gothic&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');

                .container {
                    display: flex;  
                    background-image:   opacity: 100%,
                    url("https://s0.smartresize.com/wallpaper/928/844/HD-wallpaper-motivation-fitness-workout-dark-ultra-sports-fitness-dark-motivation-workout.jpg");

                }

                center-section {
                    flex-grow: 1;  
                }

                @media (max-width: 768px) {  /* Ajusta el valor según el tamaño deseado */
                    .container {
                        display: flex;
                        flex-direction: column; /* Organiza las secciones en columna para pantallas pequeñas */
                    }

                    center-section {
                        order: 1;  /* Primero el centro */
                    }

                    right-section {
                        order: 2;  /* Luego la derecha */
                    }

                    left-section {
                        order: 3;  /* Finalmente la izquierda */
                    }
                }
            `;


            // Navbar creation
            const navbar = document.createElement("my-navbar") as NavBar;
            navbar.setAttribute(Attribute2.userlogo, "https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-User.png?alt=media&token=639c3c12-4a33-47bb-b29e-ddbc571b96ff");
            navbar.setAttribute(Attribute2.settings, "https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-Settings.png?alt=media&token=97671f73-3ed8-4a19-ae13-b7c1f33271cb");
            navbar.setAttribute(Attribute2.logo, "https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-BD.png?alt=media&token=8592d2ae-13df-4a35-8911-83dbac66123b");

            // Crear las secciones izquierda, central y derecha
            const leftSection = document.createElement("left-section") as LeftSection;
            this.centerSection = document.createElement("center-section") as CenterSection;  // Guardamos referencia a CenterSection
            this.rightSection = document.createElement("right-section") as RightSection;

            // Crear el componente de perfil a partir del perfil logueado
            const profileCard = this.ownerDocument.createElement("my-profile") as Profile;
            profileCard.setAttribute(Attribute.name, this.loggedInProfile.name);
            profileCard.setAttribute(Attribute.uid, String(this.loggedInProfile.uid));
            profileCard.setAttribute(Attribute.avatar, String(this.loggedInProfile.avatar));

            // Pasar todos los perfiles excepto el logueado a RightSection
            const otherProfiles = dataProfiles
                .filter(profile => profile.uid !== this.loggedInProfile?.uid)
                .map(profile => {
                    const otherProfileCard = this.ownerDocument.createElement("my-profile") as Profile;
                    otherProfileCard.setAttribute(Attribute.name, profile.name);
                    otherProfileCard.setAttribute(Attribute.uid, String(profile.uid));
                    otherProfileCard.setAttribute(Attribute.avatar, String(profile.avatar));
                    return otherProfileCard; // Devolver la instancia de Profile
                });

            this.rightSection.setProfiles([profileCard, ...otherProfiles]);  // Añadir el perfil logueado y otros perfiles a la lista

            // Pasar el perfil logueado a center-section para que pueda crear tweets
            this.centerSection.setLoggedInProfile(this.loggedInProfile);

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
            container.appendChild(this.centerSection);  // Añadir centerSection con el perfil logueado
            container.appendChild(this.rightSection);  // Añadir la sección derecha al contenedor

            // Añadir el navbar y el contenedor al shadowRoot
            this.shadowRoot.appendChild(navbarContainer);
            this.shadowRoot.appendChild(container);
        }
    }

    render() {
        if (this.shadowRoot) { // Asegúrate de que shadowRoot no sea nulo
            if (this.loggedInProfile) {
                this.renderApp();  // Si el usuario está logueado, renderiza la aplicación
            } else {
                const loginSection = new LoginSection((profile) => this.handleLogin(profile));
                this.shadowRoot.innerHTML = '';  // Limpiar el shadowRoot
                this.shadowRoot.appendChild(loginSection); // Añadir la sección de login al shadowRoot
            }
        }
    }
}

customElements.define("app-container", AppContainer);
