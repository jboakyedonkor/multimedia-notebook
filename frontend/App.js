import React, { useState } from 'react';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import {enableScreens} from 'react-native-screens';
import MainAppNavigator from './navigation/MainAppNavigator';


import authReducer from './store/reducers/auth';
import notesReducer from './store/reducers/notes';

enableScreens();

const middlewares = [ReduxThunk]

const rootReducer = combineReducers({
  auth: authReducer,
  notes: notesReducer
})

//create the redux store
const store = createStore(rootReducer, applyMiddleware(...middlewares));




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
    <Provider store = {store}>
      <MainAppNavigator />
    </Provider>
  );
}
