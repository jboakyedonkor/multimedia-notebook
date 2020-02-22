import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';


const LandingScreen = props => {

    //const token = props.navigation.getParams('token')
    return (
        <View style={styles.screen}>
            <Text>Welcome to the landing page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems:'center'
        //borderWidth: 3,
        //borderColor: 'black'
    }
})

export default LandingScreen;