// Define la estructura del tweet
export interface TweetData {
    id: string|null,
    text: string;
    userUid: string
    imageUrl: string;
    avatarUrl: string|null,
    username: string;  // Identificador del usuario que publicó el tweet
    createdAt: Date|null;
}