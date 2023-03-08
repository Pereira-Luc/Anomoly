import AppNavigator from "./screens/appNavigator";
import {useFonts} from 'expo-font';
import {ApolloProvider} from '@apollo/client';
import {client} from './constants/graphql/clients';


export default function App() {

  const [loaded] = useFonts({
    'LogoFont': require('./assets/fonts/DancingScript.ttf'),
  });


  if (!loaded) {
    console.log("fonts not loaded");
    return null;
  }else{
    console.log("fonts loaded");
    return (
        <ApolloProvider client={client}>
          <AppNavigator/>
        </ApolloProvider>
    );
  }
}