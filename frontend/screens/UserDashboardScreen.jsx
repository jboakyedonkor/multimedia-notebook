import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Button, ScrollView, Dimensions, KeyboardAvoidingView, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Dialog } from 'react-native-simple-dialogs';

import * as authActions from '../store/actions/auth.js';

import CustomButton from '../components/CustomButton';
import Input from '../components/Input';
import * as userActions from '../store/actions/user';

import { Translation } from 'react-i18next';
import i18n from "../i18n.js";


const UserDashboardScreen = props => {


    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user.userInfo);
    const { first_name, last_name, email, language } = userInfo;
    const [isLoading, setIsLoading] = useState(false);
    const [isImageDialogVisible, setIsImageDialogVisible] = useState(false)
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmedPassword] = useState();
    const [error, setError] = useState();


    const logOutHandler = useCallback(async () => {
        await dispatch(authActions.logout());
    }, [dispatch]);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <Translation>
                    {(t, { i18n }) =>
                        <TouchableOpacity
                            onPress={logOutHandler}
                        >
                            <View style={styles.logout}>
                                <Text style={{ color: '#DA4633', fontSize: 20 }}>{t('Sign out')}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                </Translation>

            )
        });
    }, [logOutHandler]);

    const showResetPasswordDialog = () => {
        setIsImageDialogVisible(true);
    }



    const changePassword = async() => {
        setOldPassword("")
        setConfirmedPassword()
        setNewPassword("")
        await setIsImageDialogVisible(false);
        try {
            await dispatch(userActions.updatePassword(oldPassword,newPassword));
            Alert.alert(
                'Password change successfully',
                'You have successfully changed your password. Log out and sign in with new password',
                [{ 
                    text: 'Okay',
             }]
             
            );
            

        } catch(err){
            console.log(err);
            setError(err.message)
        }
    }



    return (
        <Translation>
            {(t, { i18n }) =>
                <SafeAreaView style={styles.screen}>
                    <ScrollView>
                        <Dialog
                            visible={isImageDialogVisible}
                            title={t("Update password")}
                            onTouchOutside={() => setIsImageDialogVisible(false)} >
                            <KeyboardAvoidingView>
                                    {confirmPassword != newPassword ? (<Text></Text>):
                                    (<Text style = {{color: 'green', fontSize: 20}}>Password matched!!</Text>)} 
                                    <Input
                                        placeholder={t('type in current password')}
                                        style={styles.input}
                                        textContentType={'password'}
                                        secureTextEntry={true}
                                        value={oldPassword}
                                        onChangeText={text => setOldPassword(text)}
                                    />
                                    <Input
                                        placeholder={t('type in new password')}
                                        style={styles.input}
                                        textContentType={'password'}
                                        secureTextEntry={true}
                                        value={newPassword}
                                        onChangeText={text => setNewPassword(text)}
                                    />
                                    <Input
                                        placeholder={t('confirm new password')}
                                        style={styles.input}
                                        textContentType={'password'}
                                        secureTextEntry={true}
                                        value={confirmPassword}
                                        onChangeText={text => setConfirmedPassword(text)}
                                    />
                                    <Button
                                        title="Submit"
                                        onPress = {changePassword}
                                        
                                    />
                                
                            </KeyboardAvoidingView>
                        </Dialog>
                        <View style={styles.avatar}>
                            <Avatar
                                rounded title={first_name.charAt(0) + last_name.charAt(0)}
                                size='xlarge'

                            />
                        </View>
                        <View style={styles.texts}>
                            <Text style={styles.text}>{first_name + ' ' + last_name}</Text>
                            <Text style={styles.text}>{userInfo.email}</Text>
                        </View>
                        <CustomButton
                            style={styles.footerButton}
                            title={t('Change language')}
                            color={'black'}
                            onPress={() => {
                                props.navigation.navigate({ name: 'ChangeLang' })
                            }}
                        />
                        <CustomButton
                            style={styles.footerButton}
                            title={t('Reset Password')}
                            color={'black'}
                            onPress={showResetPasswordDialog}
                        />
                    </ScrollView>
                </SafeAreaView>
            }
        </Translation>
    )
}

const styles = StyleSheet.create({

    screen: {
        height: '100%',
        width: '100%',
    },
    avatar: {
        paddingVertical: 10,
        alignItems: 'center'
    },
    logout: {
        paddingHorizontal: 5
    },
    texts: {
        alignItems: 'center'
    },
    text: {
        fontWeight: 'bold',
        marginVertical: 2
    },
    input: {
        marginVertical: 10,
        width: Dimensions.get('window').width / 1.3,
    }
})

export default UserDashboardScreen;