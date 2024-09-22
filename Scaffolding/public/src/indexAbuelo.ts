import * as components from "./components/indexPadre"
import Navbar from "./components/navbar/navbar";
import Profile, { Attribute } from "./components/profile/profile";
import { dataProfiles } from "./data/dataProfiles";

class AppContainer extends HTMLElement {
    profiles: Profile[] = [];
    
    constructor(){
        super();
        this.attachShadow({mode:"open"});

        // En dado caso de querer filtrar data:
        // const filterData = dataProfiles.filter(element => element.uid % 2== 0) //
        //  filterData.forEach((user) => { //

      dataProfiles.forEach((user) => {
            const profileCard = this.ownerDocument.createElement("my-profile") as Profile;
            profileCard.setAttribute(Attribute.name,user.name);
            profileCard.setAttribute(Attribute.uid,String(user.uid));
            profileCard.setAttribute(Attribute.image,String(user.image));
            this.profiles.push(profileCard);

        })
       
    }

    connectedCallback(){
        this.render();
    }

    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
            <style> img {width: 200px; 
            height: 100px; }
            </style>
            <img src="https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-Be.png?alt=media&token=83fca793-ed05-448e-b3c5-33546eb7d914" alt="">  `

            const navbar = document.createElement("my-navbar") as Navbar;
            this.shadowRoot.appendChild(navbar);

            const divider = this.ownerDocument.createElement("hr");
            this.shadowRoot?.appendChild(divider);

            this.profiles.forEach((profile) => {
                this.shadowRoot?.appendChild(profile);
                
            const divider = this.ownerDocument.createElement("hr");
            this.shadowRoot?.appendChild(divider);

            
            })
        }
    }
}

customElements.define("app-container",AppContainer);