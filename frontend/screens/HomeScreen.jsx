import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

const HomeScreen = props => {


    return (
        <View style={styles.screen}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>MULTI MEDIA NOTES</Text>
            </View>
            
            
            <View>
            <Image
                    source={require('../assets/images/homepage.png')}
                    //style={styles.image}
                    resizeMode='cover'
                />
            </View>

            <View style={styles.footerContainer}>
                <View style = {styles.footerTextContainer}>
                    <Text style={styles.footerTextLg}>Create free notes</Text>
                    <Text>Welcome, we are happy that you are here</Text>
                    <Text>Now you can create multimedia notes for free!</Text>
                </View>
                <View style = {styles.footerButton}>
                    <Button 
                        title='Next Step'
                        onPress = {() => {
                            props.navigation.navigate({routeName: 'Login'});
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 30
        //borderColor: 'black',
        //borderWidth: 3
    },
    headerContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    headerText: {
        marginTop: 60,
        fontSize: 45,
        fontFamily: 'z-cool',
        color: '#DA4633'
        //color: '#EBA5B5'
    },
    footerContainer: {
        alignItems: 'center',
    },
    footerTextContainer: {
        alignItems: 'center'
    },
    footerButton: {
        justifyContent: 'center',
        marginTop: 20,
        borderTopColor: 'black',
        borderTopWidth: 3
    },
    footerTextLg: {
        fontSize: 30,
        fontFamily: 'open-sans-bold',
        color: '#DA4633'
    }
});

export default HomeScreen;