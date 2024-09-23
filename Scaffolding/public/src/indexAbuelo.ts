import * as components from "./components/indexPadre"
import Navbar from "./components/navbar/navbar";
import Profile, { Attribute } from "./components/profile/profile";
import NavBar, { Attribute2 } from "./components/navbar/navbar";
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
            this.shadowRoot.innerHTML = ``
           
            const navbar = document.createElement("my-navbar") as Navbar;
            navbar.setAttribute(Attribute2.settings, "https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-Settings.png?alt=media&token=97671f73-3ed8-4a19-ae13-b7c1f33271cb");
            navbar.setAttribute(Attribute2.logo, "https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-Be.png?alt=media&token=83fca793-ed05-448e-b3c5-33546eb7d914");
            navbar.setAttribute(Attribute2.userLogo, "https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Logo-User.png?alt=media&token=f6ff7ebe-d379-477c-ad06-03ee95d3542c");
            this.shadowRoot?.appendChild(navbar);

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