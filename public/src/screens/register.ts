import { dispatch } from '../store';
import { navigate } from '../store/actions';
import { Screens } from '../types/store';
import { registerUser } from '../utils/firebase';

class Register extends HTMLElement {
    private email: string = '';
    private password: string = '';
    private name: string = '';
    private age: number = 0;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    // Métodos para manejar los cambios en los inputs
    changeEmail(e: Event) {
        const input = e.target as HTMLInputElement;
        this.email = input.value;
    }

    changePassword(e: Event) {
        const input = e.target as HTMLInputElement;
        this.password = input.value;
    }

    changeName(e: Event) {
        const input = e.target as HTMLInputElement;
        this.name = input.value;
    }

    changeAge(e: Event) {
        const input = e.target as HTMLInputElement;
        const age = Number(input.value);
        this.age = isNaN(age) ? 0 : age;
    }

    // Método para validar y enviar el formulario
    async submitForm(e: Event) {
        e.preventDefault(); // Prevenir comportamiento predeterminado

        const { email, password, name, age } = this;

        if (!email || !password || !name || age <= 0) {
            alert('Por favor, completa todos los campos correctamente.');
            return;
        }

        try {
            const resp = await registerUser({ email, password, name, age });
            if (resp) {
                dispatch(navigate(Screens.LOGIN));
            } else {
                alert('No se pudo crear el usuario. Intenta de nuevo.');
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            alert('Hubo un error al registrar el usuario.');
        }
    }

    redirectToLogin() {
        dispatch(navigate(Screens.LOGIN));
    }

    // Método para renderizar el formulario
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    :host {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        width: 100%;
                        background-color: rgba(0, 0, 0, 0.7);
                        font-family: "Rubik", sans-serif;
                    }

                    .register-menu {
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

                    input {
                        width: 100%;
                        padding: 10px;
                        margin-bottom: 15px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        font-size: 1em;
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

                    .login-button {
                        background-color: #4CAF50;
                    }

                    .login-button:hover {
                        background-color: #45a049;
                    }

                    /* Estilo para el logo */
                    .logoBD {
                        width: 100px; 
                        height: auto;
                        margin-bottom: 10px; 
                    }
                </style>
                <div class="register-menu">
                    <!-- Logo -->
                    <img src="https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-BD.png?alt=media&token=440be58b-52d3-4aec-80ef-253f1d28ccd3" alt="Logo" class="logoBD" />
                    <h1>Registro</h1>
                    <input type="text" placeholder="Nombre completo" />
                    <input type="email" placeholder="Correo electrónico" />
                    <input type="password" placeholder="Contraseña" />
                    <input type="number" placeholder="Edad" />
                    <button id="register-button">Registrarme</button>
                    <button class="login-button" id="login-button">Login</button>
                </div>
            `;

            const nameInput = this.shadowRoot.querySelector('input[placeholder="Nombre completo"]')!;
            const emailInput = this.shadowRoot.querySelector('input[placeholder="Correo electrónico"]')!;
            const passwordInput = this.shadowRoot.querySelector('input[placeholder="Contraseña"]')!;
            const ageInput = this.shadowRoot.querySelector('input[placeholder="Edad"]')!;
            const registerButton = this.shadowRoot.querySelector('#register-button')!;
            const loginButton = this.shadowRoot.querySelector('#login-button')!;

            nameInput.addEventListener('input', this.changeName.bind(this));
            emailInput.addEventListener('input', this.changeEmail.bind(this));
            passwordInput.addEventListener('input', this.changePassword.bind(this));
            ageInput.addEventListener('input', this.changeAge.bind(this));
            registerButton.addEventListener('click', this.submitForm.bind(this));
            loginButton.addEventListener('click', this.redirectToLogin.bind(this));
        }
    }
}

customElements.define('app-register', Register);
export default Register;
