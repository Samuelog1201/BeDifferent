export enum Attribute2 {
    "logo" = "logo",
    "settings" = "settings",
    "userLogo" = "userLogo",
}

class Navbar extends HTMLElement {
    logo?: string;
    settings?: string;
    userLogo?: string;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return [Attribute2.logo, Attribute2.settings];
    }

    attributeChangedCallback(propName: string, _: string | undefined, newValue: string | undefined) {
        switch(propName) {
            case Attribute2.logo:
                this.logo = newValue;
                break;
            case Attribute2.settings:
                this.settings = newValue;
                break;
            case Attribute2.logo:
                this.userLogo = newValue;
                break;
        }
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <style>
                nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px;
                    background-color: #f8f9fa;
                }
                img {
                    width: 80px;
                    height: auto;
                }
            </style>
            <nav>
                <div>
                <img src="${this.userLogo}" alt="Logo">
                </div>
                <div>
                <img src="${this.logo}" alt="Logo">
                </div>
                <div>
                <img src="${this.settings}" alt="Settings" style="cursor: pointer;">
                 </div>
            </nav>
            `;
        }
    }
}

customElements.define("my-navbar", Navbar);
export default Navbar;