export enum Attribute {
    
    "logo" = "logo",
    "settings" = "settings",
}

class Navbar extends HTMLElement{

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
            <div>
            <h1>hola</h1>
           <img src="https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-Be.png?alt=media&token=83fca793-ed05-448e-b3c5-33546eb7d914" alt="">  
            </div>
            `
        }
    }
}

customElements.define("my-navbar",Navbar);
export default Navbar;