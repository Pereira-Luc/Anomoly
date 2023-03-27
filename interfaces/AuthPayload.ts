export interface AuthPayload {
    __typename: string;
    token: string;
    tokenExpiration: number;
    user: {
        __typename: string;
        _id: string;
        username: string;
        publicKey?: string;
        privateKey?: string;
    };
}