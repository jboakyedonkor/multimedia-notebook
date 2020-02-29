import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';


import CustomButton from '../components/CustomButton';
import * as authActions from '../store/actions/auth';

const UserDashboardScreen = props => {
    
    const user = useSelector(state => state.auth.userId);
    const dispatch = useDispatch();

    const logOutHandler = async () => { 
        await dispatch(authActions.logout());
    }
    return (

        <SafeAreaView style = {styles.screen}>
            <Text>User dashboard screen</Text>
            <Text>User is {user}</Text>
            <CustomButton
                title = 'Logout'
                onPress = {logOutHandler}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    screen:{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems:'center'
    }
})

export default UserDashboardScreen;