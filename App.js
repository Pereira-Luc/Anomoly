import AppNavigator from "./screens/appNavigator";
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';

export default function App()  {

  const [loaded] = useFonts({
    'LogoFont': require('./assets/fonts/DancingScript.ttf'),
  });

  if (!loaded) {
    console.log("fonts not loaded");
    return null;
  }else{
    console.log("fonts loaded");
    return (
        <AppNavigator/>
    );
  }
}