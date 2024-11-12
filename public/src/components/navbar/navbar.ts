 // Importando los atributos desde indexPadre

export enum Attribute2 {
    "logo" = "logo",
    "settings" = "settings",
    "userlogo" = "userlogo",
}

class Navbar extends HTMLElement {
    logo?: string;
    settings?: string;
    userlogo?: string;
    usersListVisible: boolean = false;
    originalUserLogo: string = "https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-User.png?alt=media&token=639c3c12-4a33-47bb-b29e-ddbc571b96ff"; // Para almacenar la URL original del logo

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return [Attribute2.logo, Attribute2.settings, Attribute2.userlogo];
    }

    // Cambios en los atributos
    attributeChangedCallback(propName: string, _: string | undefined, newValue: string | undefined) {
        switch (propName) {
            case Attribute2.logo:
                this.logo = newValue || ''; // Asignar valor o cadena vacía por defecto
                break;
            case Attribute2.settings:
                this.settings = newValue || ''; // Asignar valor o cadena vacía por defecto
                break;
            case Attribute2.userlogo:
                this.userlogo = newValue || ''; // Asignar valor o cadena vacía por defecto
                this.originalUserLogo = newValue || ''; // Guardar la URL original
                break;
        }
        this.render();
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    addEventListeners() {
        const userlogo = this.shadowRoot?.querySelector("#userlogo");
        if (userlogo) {
            userlogo.addEventListener("click", () => {
                this.toggleUserList();
            });
        }
    }

    toggleUserList() {
        this.usersListVisible = !this.usersListVisible;
        const userList = this.shadowRoot?.querySelector("#user-list");
        const userlogoElement = this.shadowRoot?.querySelector("#userlogo") as HTMLImageElement;

        if (userList) {
            userList.classList.toggle("visible", this.usersListVisible); // Toggle de visibilidad
        }

        // Cambiar la imagen del userlogo según la visibilidad de la lista
        if (userlogoElement) {
            userlogoElement.src = this.usersListVisible
                ? "https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-User-Black.png?alt=media&token=4d96a706-2d1f-477f-bbef-d760a179f881"
                : this.originalUserLogo;
        }

        // Emitir evento para alternar la lista de usuarios en la sección derecha
        const event = new CustomEvent('toggle-user-list', { bubbles: true, composed: true });
        this.dispatchEvent(event);
    }

    // Renderiza los perfiles de usuario
    renderUserProfiles() {
        const container = document.createElement("div");
        container.setAttribute("id", "user-list");

        // Iterar sobre los perfiles de usuario y crear elementos de perfil
        const profiles = this.querySelectorAll("my-profile");
        profiles.forEach(profile => {
            const profileClone = profile.cloneNode(true);
            container.appendChild(profileClone);
        });

        return container;
    }

    // Método render
    render() {
        if (this.shadowRoot) {
            // Valores predeterminados si los atributos no están definidos
            const logoSrc = this.logo || "https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-BD.png?alt=media&token=8592d2ae-13df-4a35-8911-83dbac66123b";
            const settingsSrc = this.settings || "https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-Settings.png?alt=media&token=97671f73-3ed8-4a19-ae13-b7c1f33271cb";
            const userLogoSrc = this.userlogo || "https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-User.png?alt=media&token=639c3c12-4a33-47bb-b29e-ddbc571b96ff";

            // Solo usamos innerHTML una vez para evitar múltiples renderizados
            this.shadowRoot.innerHTML = `
                <style>
                    nav {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 10px;
                        background-color: #D9D9D9;
                        overflow-y: auto;
                    }

                    img {
                        width: 80px;
                        height: auto;
                        cursor: pointer;
                    }

                    #logo {
                        width: 110px;
                        height: auto;
                    }

                    #user-list {
                        display: none; /* Inicialmente oculto */
                        background-color: #ffffff;
                        border: 1px solid #ddd;
                        padding: 10px;
                        position: absolute;
                        top: 60px;
                        right: 10px;
                        width: 300px;
                        z-index: 1000;
                    }

                    #user-list.visible {
                        display: block; /* Visible cuando la clase 'visible' está añadida */
                    }
                </style>
                <nav>
                    <div>
                        <img id="settings" src="${settingsSrc}" alt="Settings">
                    </div>
                    <div>
                        <img id="logo" src="${logoSrc}" alt="Logo">
                    </div>
                    <div>
                        <img id="userlogo" src="${userLogoSrc}" alt="User Logo">
                    </div>
                </nav>
            `;

            const userList = this.renderUserProfiles();
            this.shadowRoot.appendChild(userList);
        }
    }
}

customElements.define("my-navbar", Navbar);
export default Navbar;
