import { dispatch } from '../store';
import { navigate } from '../store/actions';
import { Screens } from '../types/store';
import { loginUser } from '../utils/firebase';

class Login extends HTMLElement {
    private email: string = '';
    private password: string = '';

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    // Manejar cambios en los inputs
    changeEmail(e: Event) {
        const input = e.target as HTMLInputElement;
        this.email = input.value;
    }

    changePassword(e: Event) {
        const input = e.target as HTMLInputElement;
        this.password = input.value;
    }

    // Enviar el formulario
    async submitForm(e: Event) {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        const { email, password } = this;

        if (!email || !password) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        try {
            await loginUser(email, password);
        } catch (error) {
            alert('Las credenciales son incorrectas. Intenta de nuevo.');
        }
    }

    // Redirigir al registro
    redirectToRegister() {
        dispatch(navigate(Screens.REGISTER));
    }

    // Renderizar el formulario
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    /* Estilo para centrar el menú en toda la pantalla */
                    :host {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        width: 100%;
                        background-color: rgba(0, 0, 0, 0.7);
                        font-family: "Rubik", sans-serif;
                    }

                    /* Menú de login */
                    .login-menu {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        width: 90%;
                        max-width: 400px;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 10px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    }

                    h1 {
                        font-size: 1.8em;
                        color: #333;
                        text-align: center;
                        margin-bottom: 20px;
                    }

                    input[type="email"],
                    input[type="password"] {
                        width: 100%;
                        padding: 10px;
                        margin-bottom: 15px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        font-size: 1em;
                        font-family: "Rubik", sans-serif;
                    }

                    input:focus {
                        border-color: #9c9c9c;
                        outline: none;
                    }

                    button {
                        width: 100%;
                        padding: 10px 20px;
                        margin-top: 10px;
                        background-color: #808080;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        font-size: 1em;
                        cursor: pointer;
                        transition: background-color 0.3s;
                    }

                    button:hover {
                        background-color: #4b4b4b;
                    }

                    .register-button {
                        background-color: #4CAF50;
                    }

                    .register-button:hover {
                        background-color: #45a049;
                    }
                    
                     .logoBD {
                        width: 100px; 
                        height: auto;
                        margin-bottom: 10px; 
                    }
                        
                </style>
                <div class="login-menu">
                 <img src="https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-BD.png?alt=media&token=440be58b-52d3-4aec-80ef-253f1d28ccd3" alt="Logo" class="logoBD" />
                    <h1>Iniciar sesión</h1>
                    <input type="email" placeholder="Correo electrónico" />
                    <input type="password" placeholder="Contraseña" />
                    <button id="login-button">Iniciar sesión</button>
                    <button class="register-button" id="register-button">Registrar</button>
                </div>
            `;

            const emailInput = this.shadowRoot.querySelector('input[type="email"]')!;
            const passwordInput = this.shadowRoot.querySelector('input[type="password"]')!;
            const loginButton = this.shadowRoot.querySelector('#login-button')!;
            const registerButton = this.shadowRoot.querySelector('#register-button')!;

            emailInput.addEventListener('input', this.changeEmail.bind(this));
            passwordInput.addEventListener('input', this.changePassword.bind(this));
            loginButton.addEventListener('click', this.submitForm.bind(this));
            registerButton.addEventListener('click', this.redirectToRegister.bind(this));
        }
    }
}

customElements.define('app-login', Login);
export default Login;
