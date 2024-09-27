// LoginSection.ts
import { Profile } from "../indexPadre";
import { Attribute } from "../indexPadre";
import { dataProfiles } from "../indexPadre";

class LoginSection extends HTMLElement {
    private onLogin: (profile: { uid: number; name: string; avatar: string }) => void;

    constructor(onLogin: (profile: { uid: number; name: string; avatar: string }) => void) {
        super();
        this.attachShadow({ mode: "open" });
        this.onLogin = onLogin;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <style>
              body {
                  margin: 0; /* Eliminar márgenes por defecto del body */
                  height: 100vh; /* Asegura que el body ocupe toda la altura de la ventana */
                  overflow: hidden; /* Evita que aparezcan barras de desplazamiento */
              }
          
              .login-container {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  height: 100vh; /* Altura de la ventana */
                  width: 100vw; /* Ancho de la ventana */
                  background-image: url('https://theironoffice.com/cdn/shop/files/Gym_12.23-19.jpg?v=1701994187&width=3840');
                  background-size: cover; /* Asegura que la imagen cubra todo el contenedor */
                  background-position: center; /* Centra la imagen */
                  filter: brightness(0.6); /* Oscurece la imagen para mejorar la legibilidad */
                  font-family: 'Rubik', sans-serif; /* Añadir una fuente más agradable */
              }
          
              .card {
                  background-color: rgba(255, 255, 255, 0.9); /* Color de fondo de la tarjeta */
                  border-radius: 10px; /* Bordes redondeados para la tarjeta */
                  padding: 20px; /* Espaciado interno */
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra para dar efecto de elevación */
                  text-align: center; /* Centrar el texto dentro de la tarjeta */
                  width: 300px; /* Ancho de la tarjeta */
              }
          
              h1 {
                  margin-bottom: 20px; /* Espacio debajo del título */
                  font-size: 2em; /* Aumentar el tamaño de la fuente del título */
                  color: black; /* Color del título */
              }
          
              .profile-button {
                  margin: 10px;
                  padding: 12px 20px; /* Espaciado más cómodo */
                  background-color: #808080;
                  color: white;
                  border: none;
                  border-radius: 5px; /* Bordes redondeados */
                  cursor: pointer;
                  font-size: 1em;
                  transition: background-color 0.3s, transform 0.2s; /* Transiciones suaves */
              }
          
              .profile-button:hover {
                  background-color: #4b4b4b;
                  transform: translateY(-2px); /* Efecto de elevación al pasar el cursor */
              }
          
              .profile-button:active {
                  transform: translateY(0); /* Al hacer clic, el botón vuelve a su posición */
              }
            </style>
          
            <div class="login-container">
                <div class="card">
                    <h1>Welcome to BeDifferent</h1>
                    <h2>Select a Profile to Login</h2>
                    ${dataProfiles.map((profile, index) => `
                        <button class="profile-button" data-index="${index}">${profile.name}</button>
                    `).join('')}
                </div>
            </div>
          `;
          

            // Añadir eventos a los botones de perfil para iniciar sesión
            this.shadowRoot.querySelectorAll('.profile-button').forEach((button) => {
                button.addEventListener('click', (e: Event) => {
                    const index = (e.target as HTMLElement).getAttribute('data-index');
                    if (index !== null) {
                        const selectedProfile = dataProfiles[Number(index)];
                        this.onLogin(selectedProfile); // Llama al método de inicio de sesión
                    }
                });
            });
        }
    }
}

customElements.define("login-section", LoginSection);
export default LoginSection;
