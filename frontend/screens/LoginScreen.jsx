import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Button, Dimensions, Alert, KeyboardAvoidingView} from 'react-native';
import { useDispatch } from 'react-redux';
import { Dialog } from 'react-native-simple-dialogs';


import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import * as authActions from '../store/actions/auth';
import { ScrollView } from 'react-native-gesture-handler';
import * as userActions from '../store/actions/user';

import { Translation } from 'react-i18next';
import i18n from "../i18n.js";



const LoginScreen = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isDialogVisible, setIsDialogVisible] = useState(false)
    const [resetEmail, setResetEmail] = useState("");


    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            Alert.alert('An error occurred', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    const LoginHandler = async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(authActions.login({ username, password }));
        }
        catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    }

    const showForgotPasswordDialog = () => {
        setIsDialogVisible(true)
    }

    const resetLink = async () => {

        try {
            await dispatch(userActions.resetLink(resetEmail));
        } catch (err){
            setError(err.message)
        }

    }

    //to show two way binding between text input and state values
    //console.log(email);
    //console.log(password);
    return (
        <Translation>
        {(t, {i18n}) =>
            <ScrollView>
            <Dialog
                            visible={isDialogVisible}
                            title={t("Account Reset")}
                            onTouchOutside={() => setIsDialogVisible(false)} >
                            <KeyboardAvoidingView>
                                    <Input
                                        placeholder={t('enter email')}
                                        style={styles.input}
                                        textContentType={'text'}
                                        value={resetEmail}
                                        onChangeText={text => setResetEmail(text)}
                                    />
                                    <Button
                                        title="Submit"
                                        onPress = {resetLink}
                                    />
                            </KeyboardAvoidingView>
                        </Dialog>
                <View style={styles.screen}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{t('Log in or sign up for free!')}</Text>
                    </View>
                    <View>
                        <Input
                            placeholder={t('Username')}
                            style={styles.input}
                            value={username}
                            onChangeText={text => setUsername(text)}
                        />
                        
                        <Input
                            placeholder={t('Password')}
                            style={styles.input}
                            textContentType={'password'}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={text => setPassword(text)}
                        />
                        
                        {isLoading ? (
                            <ActivityIndicator size='small' color={'#DA4633'} />
                        ) : (
                                <CustomButton
                                    style={{ backgroundColor: '#DA4633' }}
                                    title={t('Sign in')}
                                    color={'black'}
                                    onPress={LoginHandler}
                                />
                            )}
                        <Button 
                            title = "Forgot password"
                            onPress = {showForgotPasswordDialog}
                        />
                    </View>
                </View>
            </ScrollView>
        }
        </Translation>
        
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
        width: Dimensions.get('window').width / 1.3,
    }

});

export default LoginScreen;
