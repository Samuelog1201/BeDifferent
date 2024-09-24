export enum Attribute {
    "image" = "image",
    "name" = "name",
    "uid" = "uid",
}

class Profile extends HTMLElement {
    image?: string;
    name?: string;
    uid?: number;

    static get observedAttributes() {
        const attrs: Record<Attribute, null> = {
            image: null,
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
            </style>
            <section>
                <img src="${this.image}" alt="">
                <h1>${this.name}</h1>
                <p>ID: ${this.uid}</p>
            </section>
            `;
        }
    }
}

customElements.define("my-profile", Profile);
export default Profile;
