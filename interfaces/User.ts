export interface User {
    _id: number
    username: string
    password?: string
    publicKey: string
    friends?: User[]
    pushNotificationToken?: string
    profilePicture?: string
}