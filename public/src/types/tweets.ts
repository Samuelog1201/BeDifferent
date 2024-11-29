// Define la estructura del tweet
export interface TweetData {
    uid: string|null, // Identificador del tweet
    content: string;
    userUid: string // Identificador del usuario que publicó el tweet
    imageUrl: string;
    avatarUrl: string|null,
    username: string;  
    createdAt: Date|null;
}

// Interface para poder agregar nuevas propiedades mas adelante, types para definirlas solo 1 vez, si se vuelve hacer error ( duplicate )