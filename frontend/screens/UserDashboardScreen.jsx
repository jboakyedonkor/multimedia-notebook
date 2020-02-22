import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';


const UserDashboardScreen = props => {
    
    return (

        <SafeAreaView style = {styles.screen}>
            <Text>User dashboard screen</Text>
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