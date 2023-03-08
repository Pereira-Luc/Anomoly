import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";
import {AuthPayload} from "../../interfaces/AuthPayload";
//Source: https://www.apollographql.com/docs/react/

const httpLink = createHttpLink({
    uri: 'http://192.168.178.125:4000/graphql',
});


//Authentication header for Apollo Client
const authLink = setContext(async (_, {headers}) => {
    // get the authentication token from local storage if it exists
    //Get authPayload from local storage
    let authPayload = await SecureStore.getItemAsync('authPayload');
    // Convert the Json string to a Json object
    if (authPayload === null) {
        return
    }
    const authPayloadObject: AuthPayload = JSON.parse(authPayload);

    // Get the token from the authPayload
    const token = authPayloadObject.login.token;
    console.log("Token: " + token);

    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

console.log("Apollo Client initialized");
console.log(authLink);


// Initialize Apollo Client
export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});
