import Profile, { Attribute } from "../profile/profile";

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
                    section {
                        width: 350px;
                        z-index: 1000;
                        padding: 10px;
                    }
                    .user-list {
                        display: ${this.userListVisible ? 'block' : 'none'};
                        text-align: right;
                        padding: 10px;
                    }
                    my-profile {
                        padding: 15px;
                    }
                    h1 {
                        display: ${this.userListVisible ? 'block' : 'none'};
                        font-family: "Rubik", sans-serif;
                        text-align: center;
                    }
                    .titulo-amigos {
                        padding: 10px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                    }
                    .friend-list {
                        margin-top: 20px;
                    }
                    .friend-button {
                        background-color: #808080;
                        color: white;
                        border: none;
                        padding: 10px;
                        border-radius: 5px;
                        cursor: pointer;
                        margin-bottom: 5px;
                    }
                    .friend-button:hover {
                        background-color: #4b4b4b;
                    }
                    .remove-button {
                        background-color: #d9534f; /* Color para el botón de eliminar */
                        margin-left: 10px;
                        border: none;
                        color: white;
                        padding: 5px;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                    .remove-button:hover {
                        background-color: #c9302c; /* Color al pasar el cursor */
                    }

                    .toggle-button {
                        padding: 10px 20px; /* Espaciado interno del botón */
                        background-color: #808080; /* Color de fondo del botón */
                        color: white; /* Color del texto */
                        border: none; /* Sin borde */
                        border-radius: 5px; /* Bordes redondeados */
                        font-family: "Rubik", sans-serif; /* Fuente */
                        font-size: 1em; /* Tamaño de fuente */
                        cursor: pointer; /* Cursor de mano al pasar sobre el botón */
                        transition: background-color 0.3s; /* Transición suave para el color de fondo */
                     
                    }


                     .toggle-button:hover {
                     background-color: #4b4b4b; /* Color de fondo al pasar el mouse */
                    }

                </style>
                <div class="titulo-amigos">
                    <button class="toggle-button"> Amigos Recomendados</button>
                    <h1> Amigos Recomendados </h1>
                </div>
                <section>
                    <div class="user-list">
                        ${this.profiles.map(profile => {
                            const isFriend = this.friends.includes(profile);
                            return `
                                <button class="friend-button" data-uid="${profile.getAttribute(Attribute.uid)}" style="display: ${isFriend ? 'none' : 'block'};">
                                    Agregar ${profile.getAttribute(Attribute.name)}
                                </button>
                            `;
                        }).join('')}
                    </div>
                    <div class="friend-list">
                        <h2>Amigos:</h2>
                        <div class="friends-container">
                            ${this.friends.map(friend => `
                                <my-profile 
                                    uid="${friend.getAttribute(Attribute.uid)}" 
                                    name="${friend.getAttribute(Attribute.name)}" 
                                    avatar="${friend.getAttribute(Attribute.avatar)}">
                                    <button class="remove-button" data-uid="${friend.getAttribute(Attribute.uid)}">Eliminar</button>
                                </my-profile>
                            `).join('')}
                        </div>
                    </div>
                </section>
            `;

            const friendButtons = this.shadowRoot.querySelectorAll('.friend-button');
            friendButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const uid = button.getAttribute('data-uid');
                    const profileToAdd = this.profiles.find(profile => profile.getAttribute(Attribute.uid) === uid);
                    if (profileToAdd) {
                        this.addFriend(profileToAdd); // Agrega el perfil a la lista de amigos
                        (button as HTMLButtonElement).style.display = 'none'; // Oculta el botón de agregar
                    }
                });
            });

            const removeButtons = this.shadowRoot.querySelectorAll('.remove-button');
            removeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const uid = button.getAttribute('data-uid');
                    const profileToRemove = this.friends.find(friend => friend.getAttribute(Attribute.uid) === uid);
                    if (profileToRemove) {
                        this.removeFriend(profileToRemove); // Elimina el perfil de la lista de amigos
                    }
                });
            });

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
