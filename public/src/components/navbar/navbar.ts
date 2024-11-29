import { dispatch } from "../../store";
import { logOutUser, navigate } from "../../store/actions";
import { Screens } from "../../types/store";

export enum AttributeNavbar {
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
        return [AttributeNavbar.logo, AttributeNavbar.settings, AttributeNavbar.userlogo];
    }

    // Cambios en los atributos
    attributeChangedCallback(propName: string, _: string | undefined, newValue: string | undefined) {
        switch (propName) {
            case AttributeNavbar.logo:
                this.logo = newValue || ''; // Asignar valor o cadena vacía por defecto
                break;
            case AttributeNavbar.settings:
                this.settings = newValue || ''; // Asignar valor o cadena vacía por defecto
                break;
            case AttributeNavbar.userlogo:
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

         //Boton Navegate a Profile

        const userlogo = this.shadowRoot?.querySelector("#userlogo");
        if (userlogo) {
            userlogo.addEventListener("click", () => {
                dispatch(navigate(Screens.PROFILE));
            });
        }

         //Boton Logout

        const logoutLogo = this.shadowRoot?.querySelector("#logout");
        if (logoutLogo) {
            logoutLogo.addEventListener("click", () => {
                dispatch(logOutUser());
            });
        }

        //Boton Home
        
        const homeLogo = this.shadowRoot?.querySelector("#home");
        if (homeLogo) {
            homeLogo.addEventListener("click", () => {
                dispatch(navigate(Screens.DASHBOARD));
            });
        }
    }


    // Método render
    render() {
        if (this.shadowRoot) {
            // Valores predeterminados si los atributos no están definidos
            const logoSrc = this.logo || "https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-BD.png?alt=media&token=440be58b-52d3-4aec-80ef-253f1d28ccd3";
            const homeSrc = this.settings || "https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-Settings.png?alt=media&token=97671f73-3ed8-4a19-ae13-b7c1f33271cb";
            const logoutSrc = this.userlogo || "https://cdn.icon-icons.com/icons2/2518/PNG/512/logout_icon_151219.png";
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
                        width: 30px;
                        height: auto;
                        cursor: pointer;
                    }

                    #logo {
                        width: 60px;
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
                        <img id="logout" src="${logoutSrc}" alt="Logout">
                    </div>
                    <div>
                        <img id="home" src="${logoSrc}" alt="Home">
                    </div>
                    <div>
                        <img id="userlogo" src="${userLogoSrc}" alt="User Logo">
                    </div>
                </nav>
            `;
        }
    }
}

customElements.define("my-navbar", Navbar);
export default Navbar;
