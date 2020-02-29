import React, { useEffect } from 'react';
import {View, ActivityIndicator, StyleSheet, AsyncStorage} from 'react-native';
import { useDispatch } from 'react-redux';


import * as authActions from '../store/actions/auth';

const StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');

      //if the user information can not be found in async storage, set didTryAL to true
      if (!userData) {
        dispatch(authActions.setDidTryAL());
        return;
      }

      //if successfull, extra token and userId
      const transformedUserData = JSON.parse(userData);
      const { token, userId} = transformedUserData;

      //if token or userId not valid
      if (!token || !userId) {
        dispatch(authActions.setDidTryAL());
        return;
      }


      //auto login sucessful
      dispatch(authActions.authenticate(userId, token));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={'#DA4633'} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default StartupScreen;
