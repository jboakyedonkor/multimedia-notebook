import React, {useRef} from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';



const LandingScreen = props => {

    const token = props.navigation.getParam('token');
    console.log(token)

    //this fetches the token from async storage
        //let temp = AsyncStorage.getItem('token');
        //token.current = temp;
    

    //const token = props.navigation.getParams('token')
    return (
        <View style={styles.screen}>
            <Text>Welcome home {}</Text>
            <Text>{token}</Text>
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