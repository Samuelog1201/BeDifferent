 export enum Attribute {
    
    "image" = "image",
    "text" = "text",
    "uid" = "uid",

}

class tweet extends HTMLElement{
    
    image?: string;
    text?: string;
    uid?: number;

    
    static get observedAttributes(){
        const attrs: Record<Attribute,null> = {
            
            image: null,
            text: null,
            uid: null,
          
        }
        return Object.keys(attrs); 
    }
    
    attributeChangedCallback(propName:Attribute,oldValue: string | undefined,newValue: string | undefined){
        switch(propName){
            case Attribute.uid :

                this.uid = newValue ? Number(newValue) : undefined;
            break;

            default: 
            this[propName] = newValue;
            break;
        }
        
        this.render();
    }
    
    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }
    
    connectedCallback(){
        this.render();
    }
    
    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
            <section>
            <h1>${this.text}</h1>
            <img src="${this.image}" alt="">
            <p>ID : ${this.uid}</p>

            </section>
            `
        }
    }
}

customElements.define("my-tweet",tweet);
export default tweet; 