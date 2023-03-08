export interface AuthPayload {
    login: {
        __typename: string;
        token: string;
        tokenExpiration: number;
        user: {
            __typename: string;
            userId: string;
            username: string;
        };
    };
}