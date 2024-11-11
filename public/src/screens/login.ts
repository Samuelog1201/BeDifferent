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

    // Métodos para manejar los cambios en los inputs
    changeEmail(e: Event) {
        const input = e.target as HTMLInputElement;
        this.email = input.value;
    }

    changePassword(e: Event) {
        const input = e.target as HTMLInputElement;
        this.password = input.value;
    }

    // Método para enviar el formulario
    async submitForm(e: Event) {
        e.preventDefault();  // Evitar el comportamiento por defecto del formulario

        const { email, password } = this;

        // Validación de los campos
        if (!email || !password) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        try {
            // Intentar el inicio de sesión con las credenciales proporcionadas
            await loginUser(email, password);
        } catch (error) {
            // Si hay un error, mostrar un mensaje al usuario
            alert('Las credenciales son incorrectas. Intenta de nuevo.');
        }
    }

    // Método para renderizar el formulario
    render() {
        if (this.shadowRoot) {
            const style = document.createElement('style');
            style.textContent = `
                input {
                    margin: 10px;
                    padding: 8px;
                    width: 200px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
                button {
                    padding: 10px 20px;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #45a049;
                }
                h1 {
                    font-size: 24px;
                    color: #333;
                }
            `;
            this.shadowRoot.appendChild(style);

            const title = this.ownerDocument.createElement('h1');
            title.innerText = 'Iniciar sesión';
            this.shadowRoot.appendChild(title);

            // Crear el input para el correo electrónico
            const pEmail = this.ownerDocument.createElement('input');
            pEmail.placeholder = 'Correo electrónico';
            pEmail.type = 'email';  // Asegurarse de que sea un campo de correo
            pEmail.addEventListener('input', this.changeEmail.bind(this));
            this.shadowRoot.appendChild(pEmail);

            // Crear el input para la contraseña
            const pPassword = this.ownerDocument.createElement('input');
            pPassword.type = 'password';  // Asegurarse de que sea un campo de contraseña
            pPassword.placeholder = 'Contraseña';
            pPassword.addEventListener('input', this.changePassword.bind(this));
            this.shadowRoot.appendChild(pPassword);

            // Crear el botón de inicio de sesión
            const submitButton = this.ownerDocument.createElement('button');
            submitButton.innerText = 'Iniciar sesión';
            submitButton.addEventListener('click', this.submitForm.bind(this));
            this.shadowRoot.appendChild(submitButton);
        }
    }
}

customElements.define('app-login', Login);
export default Login;
