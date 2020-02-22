import React, {useState} from 'react';
import { View, StyleSheet, Text, Button, Dimensions } from 'react-native';


import Input from '../components/Input';
import CustomButton from '../components/CustomButton';


const LoginScreen = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //to show two way binding between text input and state values
    //console.log(email);
    //console.log(password);
    return (
        <View style={styles.screen}>
            <View style = {styles.textContainer}>
                <Text style={styles.text}>Log in or sign up for free!</Text>
            </View>
            <View>
                <Input
                    placeholder={'Email'}
                    style={styles.input}
                    value = {email}
                    onChangeText={text => setEmail(text)}
                />
                <Input
                    placeholder={'Password'}
                    style={styles.input}
                    textContentType ={'password'}
                    secureTextEntry={true}
                    value = {password}
                    onChangeText={text => setPassword(text)}
                />
                <CustomButton
                    style = {{backgroundColor: '#DA4633'}}
                    title = {'Sign In'}
                    color = {'black'}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center'
    },
    textContainer: {
        marginTop: 50,
        marginBottom: 50
    },
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: '#DA4633',


    },
    input: {
        marginVertical: 10,
        width: Dimensions.get('window').width/1.3,
    }

});

export default LoginScreen;
