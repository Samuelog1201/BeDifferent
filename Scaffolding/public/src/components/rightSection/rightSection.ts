class RightSection extends HTMLElement {
    private userListVisible: boolean = false;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
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
                    .user-list {
                        display: ${this.userListVisible ? 'block' : 'none'};
                        background-color: #ffffff;
                        border: 1px solid #ddd;
                        padding: 10px;
                        width: 250px;
                        z-index: 1000;
                        margin: 10px;
                    }
                
                </style>
                <div class="user-list">
                    <h2>Usuarios</h2>
                    <ul>
                        ${Array.from(this.children).map(child => `
                            <li>${child.getAttribute('name')}</li>
                        `).join('')}
            
                    </ul>
                </div>
            `;
        }
    }

    connectedCallback() {
        this.render(); // Renderizar la lista al añadir perfiles
    }
}

customElements.define("right-section", RightSection);
export default RightSection;
