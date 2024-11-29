// Importación de componentes
export { default as ProfileComponent } from "./profile/ProfileComponent"; 
export { default as NavBar } from "./navbar/navbar";
export { default as LeftSection } from "./leftSection/leftSection";
export { default as RightSection } from "./rightSection/rightSection";
export { default as createTweet } from "./tweet/TweetComponent";
export { default as CenterSection } from "./centerSection/centerSection";
export { default as TweetComponent } from "./tweet/TweetComponent"

// Atributos relacionados con el logo
export enum AttributeLogo {
    "logo" = "logo",
    "userlogo" = "userlogo",
}

// Atributos relacionados con el perfil de usuario
export enum AttributeProfile  {
    name = "name",  
    edad = "edad",
    email = "email",
	avatar = "avatar",
	uid = "uid"
}

// Atributos relacionados con las noticias
export enum AttributeNotice {
    "imageNotice" = "imageNotice",
    "textNotice" = "textNotice",
    "titleNotice" = "titleNotice"
}
