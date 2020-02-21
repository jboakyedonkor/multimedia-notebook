import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NewUser from '../models/NewUser';

import Input from '../components/Input';



const SignUpScreen = props => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    testApi =  () => {
        console.log('here')
        return fetch('http://192.168.145.1:8000/api/')
          .then((response) => response.text())
          .then((responseJson) => {
            console.log(responseJson);
          })
          .catch(error => console.log(error));
      }
    createNewUser = () => {
        console.log('new user')
        return fetch('http://10.136.228.131:8000/api/create-user', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
              first_name: firstname,
              last_name: lastname
            }),
          })
          .then(response => response.text())
          .then(responseJson => console.log(responseJson))
          .catch(error => console.log(error));
      }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.screen}>
                <View style={styles.container}>
                    <Text style={styles.largeText}>Create Profile</Text>
                    <Text style={styles.smallText}>Please enter your basic information and set up a new password for secure login</Text>

                    <Input
                        placeholder={'First name'}
                        style={styles.input}
                        textContentType={'name'}
                        value={firstname}
                        onChangeText={text => setFirstname(text)}
                    />
                    <Input
                        placeholder={'Last name'}
                        style={styles.input}
                        textContentType={'name'}
                        value={lastname}
                        onChangeText={text => setLastname(text)}
                    />
                    <Input
                        placeholder={'Username'}
                        style={styles.input}
                        textContentType={'username'}
                        value={username}
                        onChangeText={text => setUsername(text)}
                    />
                    <Input
                        placeholder={'password'}
                        style={styles.input}
                        textContentType={'password'}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    <Input
                        placeholder={'confirm password'}
                        style={styles.input}
                        textContentType={'password'}
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={text => setConfirmPassword(text)}
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            title='submit'
                            onPress = {createNewUser}
                        />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 50,
        justifyContent: "center"
        //alignItems: 'center'

        //backgroundColor: '#091954'
    },
    container: {

        maxHeight: Dimensions.get('window').height / 0.8,
        maxWidth: Dimensions.get('window').width / 0.8,


    },
    largeText: {
        fontSize: 24,
        //color: 'white',
        //alignSelf:"center",
        marginBottom: 20,

    },
    smallText: {
        //color: 'white',
        marginBottom: 60,


    },
    input: {
        marginVertical: 10,
        alignSelf: 'stretch'
    },
    buttonContainer: {
        marginTop: 30,
        alignSelf: 'flex-end'
    }
})


export default SignUpScreen;