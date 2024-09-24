import Navbar from "./components/navbar/navbar";
import Profile, { Attribute } from "./components/profile/profile";
import { dataProfiles } from "./data/dataProfiles";
import { Attribute2 } from "./components/navbar/navbar";

class AppContainer extends HTMLElement {
    profiles: Profile[] = [];
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        dataProfiles.forEach((user) => {
            const profileCard = this.ownerDocument.createElement("my-profile") as Profile;
            profileCard.setAttribute(Attribute.name, user.name);
            profileCard.setAttribute(Attribute.uid, String(user.uid));
            profileCard.setAttribute(Attribute.image, String(user.avatar));
            this.profiles.push(profileCard);
        });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = ``;

            const navbar = document.createElement("my-navbar") as Navbar;
            navbar.setAttribute(Attribute2.userlogo, "https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-User.png?alt=media&token=639c3c12-4a33-47bb-b29e-ddbc571b96ff");
            navbar.setAttribute(Attribute2.settings, "https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-Settings.png?alt=media&token=97671f73-3ed8-4a19-ae13-b7c1f33271cb");
            navbar.setAttribute(Attribute2.logo, "https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-BD.png?alt=media&token=8592d2ae-13df-4a35-8911-83dbac66123b");

            this.profiles.forEach((profile) => {
                navbar.appendChild(profile); // Añadir perfil como hijo del navbar
            });

            this.shadowRoot?.appendChild(navbar);

            const divider = this.ownerDocument.createElement("hr");
            this.shadowRoot?.appendChild(divider);
        }
    }
}

customElements.define("app-container", AppContainer);
