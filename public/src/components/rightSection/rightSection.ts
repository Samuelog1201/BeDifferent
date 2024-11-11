import Profile from "../profile/ProfileComponent";
import { AttributeProfile } from "../indexPadre";

class RightSection extends HTMLElement {
    private userListVisible: boolean = false;
    private profiles: Profile[] = []; // Arreglo para almacenar los perfiles
    private friends: Profile[] = []; // Arreglo para almacenar los amigos

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    // Función para recibir y almacenar los perfiles
    setProfiles(profiles: Profile[]) {
        console.log("Perfiles recibidos en setProfiles:", profiles); // Para depuración
        this.profiles = profiles;
        this.render(); // Vuelve a renderizar después de recibir los perfiles
    }

    toggleUserList() {
        this.userListVisible = !this.userListVisible;
        console.log("Toggling user list visibility:", this.userListVisible); // Para depuración
        this.render(); // Renderizar después de alternar la visibilidad
    }

    addFriend(profile: Profile) {
        if (!this.friends.includes(profile)) {
            this.friends.push(profile);
            console.log("Amigos actualizados:", this.friends); // Para depuración
            this.render(); // Re-renderiza después de agregar el amigo
        }
    }

    removeFriend(profile: Profile) {
        this.friends = this.friends.filter(friend => friend !== profile);
        console.log("Amigos después de eliminar:", this.friends); // Para depuración
        this.render(); // Re-renderiza después de eliminar el amigo
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    /* Aquí van los estilos */
                </style>
                <div class="titulo-amigos">
                    <button class="toggle-button">
                        <img id="icon-friends" src="https://cdn-icons-png.flaticon.com/512/1946/1946413.png" alt="icono amigos" />
                        <h1>Recomendados</h1>
                    </button>
                </div>

                <section>
                    <div class="user-list">
                        ${this.profiles.map(profile => {
                            const name = profile ? profile.getAttribute('name') : 'Nombre no disponible'; // Verificación
                            const isFriend = this.friends.includes(profile);
                            return `
                                <button class="friend-button" data-uid="${profile.getAttribute(AttributeProfile.uid)}" style="display: ${isFriend ? 'none' : 'block'};">
                                    Agregar ${name}
                                </button>
                                <div class="clear"></div> <!-- Limpia el float después del botón -->
                            `;
                        }).join('')}
                    </div>

                    <h1> Amigos: </h1>
                    <div class="friend-list">
                        <div class="friends-container">
                            ${this.friends.map(friend => {
                                const name = friend ? friend.getAttribute('name') : 'Nombre no disponible'; // Verificación
                                return `
                                    <my-profile 
                                        uid="${friend.getAttribute(AttributeProfile.uid)}" 
                                        name="${name}" 
                                        avatar="${friend.getAttribute(AttributeProfile.avatar)}">
                                        <button class="remove-button" data-uid="${friend.getAttribute(AttributeProfile.uid)}">Eliminar</button>
                                    </my-profile>
                                    <div class="clear"></div> <!-- Limpia el float después del botón -->
                                `;
                            }).join('')}
                        </div>
                    </div>
                </section>
            `;

            // Añadir amigos
            const friendButtons = this.shadowRoot.querySelectorAll('.friend-button');
            friendButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const uid = button.getAttribute('data-uid');
                    const profileToAdd = this.profiles.find(profile => profile.getAttribute(AttributeProfile.uid) === uid);
                    if (profileToAdd) {
                        this.addFriend(profileToAdd);
                        // Comprobación de tipo para acceder a 'style'
                        if (button instanceof HTMLElement) {
                            button.style.display = 'none';
                        }
                    }
                });
            });

            // Eliminar amigos
            const removeButtons = this.shadowRoot.querySelectorAll('.remove-button');
            removeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const uid = button.getAttribute('data-uid');
                    const profileToRemove = this.friends.find(friend => friend.getAttribute(AttributeProfile.uid) === uid);
                    if (profileToRemove) {
                        this.removeFriend(profileToRemove);
                    }
                });
            });

            // Alternar visibilidad de la lista de usuarios
            const toggleButton = this.shadowRoot.querySelector('.toggle-button') as HTMLButtonElement;
            toggleButton.addEventListener('click', () => this.toggleUserList());
        }
    }

    connectedCallback() {
        this.render(); // Renderizar la lista al añadir perfiles
    }
}

customElements.define("right-section", RightSection);
export default RightSection;
