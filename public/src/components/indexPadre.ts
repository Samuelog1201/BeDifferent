// Importación de componentes
export { default as ProfileComponent } from "./profile/ProfileComponent"; 
export { default as NavBar } from "./navbar/navbar";
export { default as LeftSection } from "./leftSection/leftSection";
export { default as RightSection } from "./rightSection/rightSection";
export { default as createTweet } from "./tweet/TweetComponent";
export { default as CenterSection } from "./centerSection/centerSection";

// Importación de utilidades y estado
import { addObserver, appState } from '../store';  // Si no se usan, eliminar
import { Screens } from '../types/store';           // Si no se usan, eliminar
import { registerUser, loginUser } from '../utils/firebase'; // Si no se usan, eliminar

// Definición de los atributos como enumeraciones

// Atributos relacionados con el logo
export enum AttributeLogo {
    "logo" = "logo",
    "userlogo" = "userlogo",
}

// Atributos relacionados con el perfil de usuario
export enum AttributeProfile  {
    uid = "uid",
    profileName = "profileName",  // Cambié 'name' por 'profileName' para evitar conflicto con HTMLElement
    email = "email",
    avatar = "avatar",
}

// Atributos relacionados con el tweet
export enum AttributeTweet {
    username = "username",
    avatar = "avatarUrl",
    content = "content",
    imageUrl = "imageUrl"
}

// Atributos relacionados con las noticias
export enum AttributeNotice {
    "imageNotice" = "imageNotice",
    "textNotice" = "textNotice",
    "titleNotice" = "titleNotice"
}

// Eliminar o renombrar si no es necesario
export enum Attribute2 {
    logo = "logo",
    settings = "settings",
    userlogo = "userlogo",
}
