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
    async submitForm() {
        const { email, password, name, age } = this;

        // Validar los campos
        if (!email || !password || !name || age <= 0) {
            alert('Por favor, completa todos los campos correctamente.');
            return;
        }

        try {
            const resp = await registerUser({ email, password, name, age });
            if (resp) {
                // Navegar a la pantalla de login después del registro
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
        dispatch(navigate(Screens.LOGIN)); // Aquí está el cambio
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
            title.innerText = 'Registro';
            this.shadowRoot.appendChild(title);

            // Crear inputs con sus eventos
            const pEmail = this.ownerDocument.createElement('input');
            pEmail.placeholder = 'Correo electrónico';
            pEmail.type = 'email';  
            pEmail.addEventListener('input', this.changeEmail.bind(this));
            this.shadowRoot.appendChild(pEmail);

            const pPassword = this.ownerDocument.createElement('input');
            pPassword.type = 'password';
            pPassword.placeholder = 'Contraseña';
            pPassword.addEventListener('input', this.changePassword.bind(this));
            this.shadowRoot.appendChild(pPassword);

            const pName = this.ownerDocument.createElement('input');
            pName.placeholder = 'Nombre completo';
            pName.addEventListener('input', this.changeName.bind(this));
            this.shadowRoot.appendChild(pName);

            const pAge = this.ownerDocument.createElement('input');
            pAge.type = 'number';
            pAge.placeholder = 'Edad';
            pAge.addEventListener('input', this.changeAge.bind(this));
            this.shadowRoot.appendChild(pAge);

            // Botón para enviar el formulario
            const submitButton = this.ownerDocument.createElement('button');
            submitButton.innerText = 'Registrarme';
            submitButton.addEventListener('click', (e) => {
                e.preventDefault(); // Prevenir comportamiento predeterminado del formulario
                this.submitForm();
            });
            this.shadowRoot.appendChild(submitButton);

            const loginButton = this.ownerDocument.createElement('button');
            loginButton.innerText = 'Login';
            loginButton.addEventListener('click', this.redirectToLogin.bind(this));  // Llamada a la función de redirección
            this.shadowRoot.appendChild(loginButton);
        }
    }
}

customElements.define('app-register', Register);
export default Register;
