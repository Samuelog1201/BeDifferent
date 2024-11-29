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
                section {
                    
                    width: 350px;
                    height: 2400px;
                    z-index: 1000;
                    padding: 10px;
                    background-color: #F0F0F0;

                    background-image: url("https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/right.png?alt=media&token=bc16b8e7-4686-4cb5-b869-03be67712adc");
                    background-size: cover; /* Hace que la imagen cubra todo el contenedor */
                    background-position: center; /* Centra la imagen en el contenedor */
                    background-repeat: no-repeat; /* Evita que la imagen se repita */
                }
            </style>

            <section></section>

                
            `;
             
            /* Añadir Amigos, Borrar, etc
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
            */
        }
              
    }

    connectedCallback() {
        this.render(); // Renderizar la lista al añadir perfiles
    }
}

customElements.define("right-section", RightSection);
export default RightSection;



/* <div class="titulo-amigos">
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
                </section>  */


            //    /*  .user-list {
            //         display: ${this.userListVisible ? 'flex' : 'none'};
            //         text-align: right;
            //         padding: 10px;
            //         flex-direction: column;
            //         gap: 10px; 
            //         weight: 20%
            //         justify-content: end;
            //     }
            //     my-profile {
            //         padding: 15px;
            //     }
            //     h1 {
            //         display: ${this.userListVisible ? 'block' : 'none'};
            //         font-family: "Rubik", sans-serif;
            //         text-align: center;
            //         font-sixe: 1em;
            //     }

            //     p {
            //         margin: 0px;
            //     }
            //     .titulo-amigos {
            //         display: flex;
            //         justify-content: end;
            //         padding: 10px;
                    
            //     }
            //     .friend-list {
            //         margin-top: 20px;
            //     }
            //     .friend-button {
            //         background-color: #808080;
            //         color: white;
            //         border: none;
            //         padding: 10px;
            //         border-radius: 5px;
            //         cursor: pointer;
            //         margin-bottom: 5px;
                    
            //     }
            //     .friend-button:hover {
            //         background-color: #4b4b4b;
            //     }
            //     .remove-button {
            //         background-color: #d9534f; /* Color para el botón de eliminar */
            //         margin-left: 10px;
            //         border: none;
            //         color: white;
            //         padding: 5px;
            //         border-radius: 5px;
            //         cursor: pointer;
            //     }
            //     .remove-button:hover {
            //         background-color: #c9302c; /* Color al pasar el cursor */
            //     }

            //     .toggle-button {
            //         display: flex;
            //         align-items: center; /* Centra verticalmente */
            //         justify-content: center; /* Centra horizontalmente */
            //         padding: 10px 20px; /* Espaciado interno del botón */
            //         background-color: #D9D9D9; /* Color de fondo del botón */
            //         color: white; /* Color del texto */
            //         border: none; /* Sin borde */
            //         border-radius: 5px; /* Bordes redondeados */
            //         font-family: "Rubik", sans-serif; /* Fuente */
            //         font-size: 1em; /* Tamaño de fuente */
            //         cursor: pointer; /* Cursor de mano al pasar sobre el botón */
            //         transition: background-color 0.3s; /* Transición suave para el color de fondo */
                 
            //     }


            //      .toggle-button:hover {
            //      background-color: #4b4b4b; /* Color de fondo al pasar el mouse */
            //     }

            //     #icon-friends {
            //         width: 30px; 
            //         height: 30px; 
            //         padding: 10px;
            //     } */