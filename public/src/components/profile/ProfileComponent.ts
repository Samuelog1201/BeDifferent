import { AttributeProfile } from "../indexPadre";

class ProfileComponent extends HTMLElement {
    name?: string|null
    uid?: string|null
    email?: string|null
    avatar?: string|null

    constructor() {
        super();
        this.attachShadow({ mode: "open" }); // Crear shadow root aquí
    }

    // Observar los atributos relacionados con el perfil
    static get observedAttributes() {
        const attrs: Record<AttributeProfile, null> = {
            avatar: null,
            profileName: null,
            email: null,
            uid: null,
        };
        return Object.keys(attrs); 
    }

    // Método que se llama cuando un atributo observado cambia
    attributeChangedCallback(propName: string, _: string | undefined, newValue: string | undefined) {
        switch (propName) {
            case AttributeProfile.profileName:
                this.name = newValue ?? "Nombre no disponible";
                break;
            case AttributeProfile.uid:
                this.uid = newValue ?? "UID no disponible";
                break;
            case AttributeProfile.avatar:
                // Si el valor es vacío o nulo, usar la imagen por defecto
                this.avatar = newValue ? newValue : "https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-User.png?alt=media&token=639c3c12-4a33-47bb-b29e-ddbc571b96ff";
                break;
            case AttributeProfile.email:
                // Si el valor es vacío o nulo, usar la imagen por defecto
                this.email = newValue ? newValue : "usuario@email.com";
                break;
        }
        this.render(); // Re-renderizar al cambiar los atributos
    }

    // Método que se llama cuando el componente se conecta al DOM
    connectedCallback() {
        this.render(); // Renderizar el componente al conectar
    }

    // Método para renderizar el componente
    render() {
        const shadowRoot = this.shadowRoot!;
        
        shadowRoot.innerHTML = `
            <style>
                .profile-container {
                    display: flex;
                    align-items: center;
                    padding: 10px;
                }
                .profile-container img {
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    margin-right: 10px;
                }
                .profile-container .profile-info {
                    display: flex;
                    flex-direction: column;
                }
                .profile-container .profile-info .name {
                    font-weight: bold;
                    font-size: 14px;
                }
                .profile-container .profile-info .uid {
                    font-size: 12px;
                    color: #666;
                }
            </style>
            <div class="profile-container">
                <img src="${this.avatar}" alt="User Avatar">
                <div class="profile-info">
                    <span class="name">${this.name}</span>
                    <span class="uid">${this.uid}</span>
                </div>
            </div>
        `;
    }
}

// Definir el componente customizado
customElements.define("my-profile", ProfileComponent);

export default ProfileComponent;
