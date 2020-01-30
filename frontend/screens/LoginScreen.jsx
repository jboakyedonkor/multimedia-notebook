import React from 'react';
import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback} from 'react-native';
import LoginInput from '../components/LoginInput';

const LoginScreen = props => {


    return (
        
        <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
            <View style={styles.screen}>
                <LoginInput />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        //paddingTop: 50,
        backgroundColor: 'white'
    }
});

export default LoginScreen;