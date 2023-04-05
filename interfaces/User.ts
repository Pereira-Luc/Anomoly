export interface User {
    _id: string
    username: string
    password?: string
    publicKey?: string
    friends?: User[]
    pushNotificationToken?: string
    profilePicture?: string
}