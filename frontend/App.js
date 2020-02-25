import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import {enableScreens} from 'react-native-screens';
import MainAppNavigator from './navigation/MainAppNavigator';

enableScreens();
//This is used to fetch and enable font use while the App Loads
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/BowlbyOneSC-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'z-cool': require('./assets/fonts/ZCOOLQingKeHuangYou-Regular.ttf'),
    'bowlby': require('./assets/fonts/BowlbyOneSC-Regular.ttf')
  })
}



export default function App() {
  const [fontLoaded,setFontLoaded] = useState(false);

  if(!fontLoaded){
    return (
      <AppLoading
        startAsync = {fetchFonts}
        onFinish = {() => setFontLoaded(true)}
      />
    );
  }


  return (
    <MainAppNavigator />
  );
}
