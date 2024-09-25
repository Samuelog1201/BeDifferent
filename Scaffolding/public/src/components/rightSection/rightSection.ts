import Profile, { Attribute } from "../profile/profile";

class RightSection extends HTMLElement {
    private userListVisible: boolean = false;
    private profiles: Profile[] = []; // Arreglo para almacenar los perfiles

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    // Función para recibir y almacenar los perfiles
    setProfiles(profiles: Profile[]) {
        this.profiles = profiles;
        this.render(); // Vuelve a renderizar después de recibir los perfiles
    }

    toggleUserList() {
        this.userListVisible = !this.userListVisible;
        console.log("Toggling user list visibility:", this.userListVisible); // Para depuración
        this.render(); // Renderizar después de alternar la visibilidad
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    .user-list {
                        display: ${this.userListVisible ? 'block' : 'none'};
                        background-color: #f8f9fa;
                        padding: 10px;
                        width: 250px;
                        z-index: 1000;
                        
                    }
                </style>
                <div class="user-list">
                </div>
            `;

            const userList = this.shadowRoot.querySelector('.user-list');

            // Renderizar los perfiles recibidos
            this.profiles.forEach(profile => {
                const profileCard = document.createElement("my-profile") as Profile;
                profileCard.setAttribute(Attribute.name, profile.getAttribute(Attribute.name)!);
                profileCard.setAttribute(Attribute.uid, profile.getAttribute(Attribute.uid)!);
                profileCard.setAttribute(Attribute.image, profile.getAttribute(Attribute.image)!);
                userList?.appendChild(profileCard); // Añadir el perfil a la lista
            });
        }
    }

    connectedCallback() {
        this.render(); // Renderizar la lista al añadir perfiles
    }
}

customElements.define("right-section", RightSection);
export default RightSection;
