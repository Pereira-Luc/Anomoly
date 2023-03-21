export interface AuthPayload {
    __typename: string;
    token: string;
    tokenExpiration: number;
    user: {
        __typename: string;
        userId: string;
        username: string;
        publicKey?: string;
        privateKey?: Uint8Array;
    };
}