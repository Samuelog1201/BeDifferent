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

                    section {
                        padding: 10px;
                        width: 350px;
                        z-index: 1000;
                        
                    }

                    .user-list {
                        display: ${this.userListVisible ? 'block' : 'none'};
                        background-color: #f8f9fa;
                        text-align: right;
                        padding: 10px;
                            
                    }
                                               
                    }
                </style>
                <section>
                    <div class="user-list">
                    </div>
                </section>
            `;

            const userList = this.shadowRoot.querySelector('.user-list');

            // Renderizar los perfiles recibidos
            this.profiles.forEach(profile => {
                const profileCard = document.createElement("my-profile") as Profile;
                profileCard.setAttribute(Attribute.name, profile.getAttribute(Attribute.name)!);
                profileCard.setAttribute(Attribute.uid, profile.getAttribute(Attribute.uid)!);
                profileCard.setAttribute(Attribute.avatar, profile.getAttribute(Attribute.avatar)!);
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