// Atributos Tweet
export enum AttributeTweet {
    username = "username",
    userUid = "userUid",
    avatar = "avatarUrl",
    content = "content",
    imageUrl = "imageUrl",
    uid = "uid",
}

class TweetComponent extends HTMLElement {
    uid?: string | null;
    username?: string;
    content?: string;
    imageUrl?: string;
    avatar?: string;
    userUid?: string;
    isMyTweet?: string;
    createdAt?: Date;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    
    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return [
            AttributeTweet.username,
            AttributeTweet.userUid,
            AttributeTweet.content,
            AttributeTweet.imageUrl,
            AttributeTweet.avatar,
            AttributeTweet.uid
        ];
    }

    attributeChangedCallback(propName: string, _: string | undefined, newValue: string | undefined) {
        switch (propName) {
            case AttributeTweet.username:
                this.username = newValue;
                break;
            case AttributeTweet.userUid:
                this.userUid = newValue;
                break;
            case AttributeTweet.content:
                this.content = newValue;
                break;
            case AttributeTweet.imageUrl:
                this.imageUrl = newValue;
                break;
            case AttributeTweet.avatar:
                this.avatar = newValue;
                break;
            case AttributeTweet.uid:
                this.uid = newValue;
                break;
        }
        //console.log(propName, newValue);
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                                <style>
                                    section {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    background-color: #f9f9f9; /* Fondo claro para mantener consistencia */
                    border-radius: 10px;
                    padding: 15px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra suave como en los inputs */
                    margin: 10px auto; /* Espaciado entre tweets */
                    max-width: 500px; /* Limita el ancho para consistencia */
                    width: 100%; /* Ocupa todo el ancho disponible */
                }

                h1 {
                    font-size: 1.5em;
                    margin: 5px 0;
                    font-family: "Rubik", sans-serif;
                    font-weight: bold;
                    color: #333; /* Color oscuro consistente con el título del primer conjunto */
                    text-align: left; /* Alineado a la izquierda para un diseño más natural */
                    width: 100%; /* Mantiene el ancho del contenedor */
                }

                p {
                    font-family: "Rubik", sans-serif;
                    font-size: 1em;
                    color: #555; /* Color gris para texto */
                    margin: 10px 0;
                    white-space: pre-wrap; /* Conserva el formato del texto */
                    text-align: justify; /* Mejora la lectura */
                    line-height: 1.5; /* Añade espacio entre líneas */
                }

                #image-upload {
                    max-width: 100%;
                    border-radius: 10px;
                    width: 100%; /* Ancho completo del contenedor */
                    height: auto;
                    margin-top: 10px; /* Espaciado con el contenido anterior */
                }

                #icono-perfil {
                    width: 50px;
                    height: 50px; /* Cuadrado para mejor proporción */
                    margin-right: 10px; /* Más separación entre avatar y texto */
                    border-radius: 50%; /* Hace el avatar circular */
                    border: 2px solid #ccc; /* Añade un borde suave */
                }

                .info-perfil {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    width: 100%; /* Mantiene el ancho del contenedor */
                    margin-bottom: 10px; /* Espaciado entre la información del perfil y el contenido */
                }

                section:hover {
                    background-color: #f1f1f1; /* Fondo más claro al pasar el mouse */
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); /* Sombra más pronunciada */
                    transition: background-color 0.3s, box-shadow 0.3s; /* Animación suave */
                }

                </style>
                <section>
                    <div>
                        <div class="info-perfil">
                            <img id="icono-perfil" src="${this.avatar || 'https://icons.veryicon.com/png/o/miscellaneous/rookie-official-icon-gallery/225-default-avatar.png'}" alt="avatar"> 
                            <h1>${this.userUid || 'Usuario desconocido'}</h1>
                        </div>         
                        <p>${this.content || 'Contenido no disponible'}</p>
                        <img id="image-upload" src="${this.imageUrl || 'https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-BD.png?alt=media&token=440be58b-52d3-4aec-80ef-253f1d28ccd3'}" alt="image upload">
                    </div>
                </section>
            `;
        }
    }
}

customElements.define("tweet-component", TweetComponent);  // Define el nuevo nombre de la clase
export default TweetComponent;
