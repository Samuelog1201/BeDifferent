// Define la estructura del tweet
export interface TweetData {
    uid: string|null,
    content: string;
    userUid: string
    imageUrl: string;
    avatarUrl: string|null,
    username: string;  // Identificador del usuario que publicó el tweet
    createdAt: Date|null;
}