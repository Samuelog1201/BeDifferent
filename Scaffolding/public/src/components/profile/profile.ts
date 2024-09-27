export enum Attribute {
    "avatar" = "avatar",
    "name" = "name",
    "uid" = "uid",
}

class Profile extends HTMLElement {
    avatar?: string;
    name?: string;
    uid?: number;

    static get observedAttributes() {
        const attrs: Record<Attribute, null> = {
            avatar: null,
            name: null,
            uid: null,
        };
        return Object.keys(attrs); 
    }
    
    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        switch(propName) {
            case Attribute.uid:
                this.uid = newValue ? Number(newValue) : undefined;
                break;
            default: 
                this[propName] = newValue;
                break;
        }
        
        this.render();
    }
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    
    connectedCallback() {
        this.render();
    }
    
    render() {
        if(this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <style>
            img {
                width: 50px; 
                height: 50px; 
            }

            section {
                display: flex;
                justify-content: right;
                align-items: right;
                flex-direction: column;
                background-color: #f8f9fa;
                border-radius: 10px;
                padding: 15px;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
            }

            .info-perfil{
            display: flex;
            align-items: center; /* Alinea verticalmente al centro */
            justify-content: flex-end; /* Alinea todo a la derecha *

            }
            #icono-perfil-amigos {
                margin-right: 20px; /* Espacio entre el ícono y el nombre */
              }

            h1 {
                font-family: "League Gothic", sans-serif;
                font-style: bold;
            }

            p {
                font-family: "Rubik", sans-serif;
                
            }

            </style>
            <section>
            <div class= "info-perfil">
                <img id="icono-perfil-amigos" src="${this.avatar}" alt=""> 
                <h1>${this.name}</h1>
            </div>
                <p>ID: ${this.uid}</p>
            </section>
            `;
        }
    }
}

customElements.define("my-profile", Profile);
export default Profile;
