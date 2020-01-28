import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LoginInput from '../components/LoginInput';

const LoginScreen = props => {


    return (
        <View style = {styles.screen}>
            <LoginInput />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default LoginScreen;