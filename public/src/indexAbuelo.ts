import { ProfileComponent, NavBar, LeftSection, RightSection, CenterSection, AttributeProfile } from './components/indexPadre';
import './screens/register';
import './screens/dashboard';
import './screens/login'; 
import './screens/profile';
import { addObserver, appState } from './store/';
import { Screens } from './types/store';
import { registerUser, loginUser } from './utils/firebase';
import Profile from './screens/profile';

// Definir el tipo de los detalles del evento Login
interface LoginEventDetail {
    email: string;
    password: string;
}
// Definir el tipo de los detalles del evento Register
interface RegisterEventDetail {
    email: string;
    password: string;
    name: string;
    age: number;
}


class AppContainer extends HTMLElement {
    private rightSection!: RightSection;
    private centerSection!: CenterSection;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
		addObserver(this);
    }

    connectedCallback() {
        this.render();
    }

    // Registro
    
    async handleRegister(email: string, password: string, name: string, age: number): Promise<void> {
        try {
            const success = await registerUser({ email, password, name, age });
            if (success) {
                const profile = { uid: "random-uid", name, avatar: 'default-avatar.png' }; 
            } else {
                console.error('Error en el registro');
                // Aquí podrías mostrar un mensaje de error en la UI
            }
        } catch (error) {
            console.error('Error en el registro:', error);
        }
    }
    // Login
    async handleLoginAttempt(email: string, password: string): Promise<void> {
        try {
            await loginUser(email, password);
        } catch (error) {
            console.error('Error en el inicio de sesión', error);
        }
    }

    // Render App
    renderApp() {
        const { user } = appState;
        if (this.shadowRoot && appState && user) {
            this.shadowRoot.innerHTML = '';

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

            const navbar = document.createElement("my-navbar") as NavBar;
            navbar.setAttribute(AttributeProfile.avatar, "https://...");

            const leftSection = document.createElement("left-section") as LeftSection;
            this.centerSection = document.createElement("center-section") as CenterSection;
            this.rightSection = document.createElement("right-section") as RightSection;

            const profileCard = this.ownerDocument.createElement("my-profile") as ProfileComponent;
            profileCard.setAttribute(AttributeProfile.name, String(user.name));
            profileCard.setAttribute(AttributeProfile.uid, String(user.uid));
            profileCard.setAttribute(AttributeProfile.avatar, String(user.avatar)); 
            profileCard.setAttribute(AttributeProfile.email, String(user.email)); 

            this.shadowRoot.appendChild(style);

            const navbarContainer = document.createElement("nav");
            navbarContainer.setAttribute("class", "navbarContainer");
            navbarContainer.appendChild(navbar);

            const container = document.createElement("div");
            container.setAttribute("class", "container");
            container.appendChild(leftSection);
            container.appendChild(this.centerSection);
            container.appendChild(this.rightSection);

            this.shadowRoot.appendChild(navbarContainer);
            this.shadowRoot.appendChild(container);
        }
    }
    
    renderProfile() {
        const { user } = appState;
        if (this.shadowRoot && appState && user) {
            this.shadowRoot.innerHTML = '';

            const style = document.createElement("style");
            style.textContent = `
                @import url('https://fonts.googleapis.com/css2?family=League+Gothic&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=League+Gothic&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
            
                .container {
                    background-image: url("https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Fondo.png?alt=media&token=91673126-7baf-4e2b-8853-fa8dfc208bb0");
                    background-size: cover; /* Hace que la imagen cubra todo el contenedor */
                    background-position: center; /* Centra la imagen en el contenedor */
                    background-repeat: no-repeat; /* Evita que la imagen se repita */

                }
            
                center-section {
                    flex-grow: 1;  
                }
            
                @media (max-width: 768px) {  
                    .container {
                        display: flex;
                        flex-direction: column;
                    }
            
                    center-section {
                        order: 1;  
                    }
            
                    right-section {
                        order: 2;  
                    }
            
                    left-section {
                        order: 3;  
                    }
                }
            `;

            const navbar = document.createElement("my-navbar") as NavBar;
            navbar.setAttribute(AttributeProfile.avatar, "https://...");

            const navbarContainer = document.createElement("nav");
            navbarContainer.setAttribute("class", "navbarContainer");
            navbarContainer.appendChild(navbar);

            const profile = document.createElement("app-profile") as Profile;

            this.shadowRoot.appendChild(navbarContainer);
            this.shadowRoot.appendChild(profile);
        }
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = '';

            switch (appState.screen) {
                case Screens.REGISTER:
                    const registerSection = document.createElement('app-register') as HTMLElement;
                    registerSection.addEventListener('register', (event) => {
                        const customEvent = event as CustomEvent<RegisterEventDetail>;
                        const { email, password, name, age } = customEvent.detail;
                        this.handleRegister(email, password, name, age);
                    });
                    this.shadowRoot.appendChild(registerSection);
                    break;

                case Screens.LOGIN:
                    const loginSection = document.createElement('app-login') as HTMLElement;
                    loginSection.addEventListener('login', (event) => {
                        const customEvent = event as CustomEvent<LoginEventDetail>;
                        const { email, password } = customEvent.detail;
                        this.handleLoginAttempt(email, password);
                    });
                    this.shadowRoot.appendChild(loginSection);
                    break;

                case Screens.DASHBOARD:
                    if (appState.user) {
                        this.renderApp();
                    } else {
                        console.log('Usuario no autenticado');
                        // Aquí podrías redirigir o mostrar un mensaje de error.
                    }
                    break;

                case Screens.PROFILE:
                    if (appState.user) {
                        this.renderProfile();
                    } else {
                        console.log('Usuario no autenticado');
                        // Aquí podrías redirigir o mostrar un mensaje de error.
                    }
                    break;

                default:
                    break;
            }
        }
    }
}

customElements.define("app-container", AppContainer);
