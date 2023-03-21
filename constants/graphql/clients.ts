import {ApolloClient, createHttpLink, InMemoryCache, split} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";
import {AuthPayload} from "../../interfaces/AuthPayload";
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {createClient} from 'graphql-ws';
import {getMainDefinition} from "@apollo/client/utilities";
//Source: https://www.apollographql.com/docs/react/

const httpLink = createHttpLink({
    uri: 'http://192.168.178.125:4000/graphql',
});

const getAuthToken = async () => {
    // get the authentication token from local storage if it exists
    //Get authPayload from local storage
    let authPayload = await SecureStore.getItemAsync('authPayload');

    // Convert the Json string to a Json object
    if (authPayload === null) {
        return null
    }
    const authPayloadObject: AuthPayload = JSON.parse(authPayload);

    // Get the token from the authPayload
    return authPayloadObject.token;
}

const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://192.168.178.125:4000/graphql',
    connectionParams: async () => {
        const token = await getAuthToken();
        return {
            headers: {
                authorization: token ? `Bearer ${token}` : "",
            }
        }
    }
}));

//Authentication header for Apollo Client
const authLink = setContext(async (_, {headers}) => {
    // get the authentication token from local storage if it exists
    const token = await getAuthToken();
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
    ({query}) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);


// Initialize Apollo Client
export const client = new ApolloClient({
    link: authLink.concat(splitLink),
    cache: new InMemoryCache()
});
