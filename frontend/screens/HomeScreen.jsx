import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions } from 'react-native';


import CustomButton from '../components/CustomButton';

const HomeScreen = props => {


    return (
        <View style={styles.screen}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>MULTI MEDIA NOTES</Text>
            </View>


            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/images/homepage.png')}
                    style={styles.image}
                    resizeMode='cover'
                />
            </View>

            <View style={styles.footerContainer}>
                <View style={styles.footerTextContainer}>
                    <Text style={styles.footerTextLg}>Create free notes</Text>
                    <Text>Welcome, we are happy that you are here</Text>
                    <Text>Now you can create multimedia notes for free!</Text>
                </View>

                <CustomButton
                    style={styles.footerButton}
                    title='SIGN IN'
                    color={'black'}
                    onPress={() => {
                        props.navigation.navigate({ name: 'Login' });
                    }}
                />


                <CustomButton
                    style={{ ...styles.footerButton, backgroundColor: '#DA4633' }}
                    title='CREATE NEW ACCOUNT'
                    color={'black'}
                    onPress={() => {
                        props.navigation.navigate({ name: 'SignUp' });
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {

        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 30,
        width: '100%',
        height: '100%',

        //maxWidth: Dimensions.get('window').width,
        //maxHeight: Dimensions.get('window').height
        //borderColor: 'black',
        //borderWidth: 3
    },
    headerContainer: {
        marginTop: 20,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: '15%'
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
        //height: '80%'
    },
    footerTextContainer: {
        alignItems: 'center',
        marginBottom: 50
    },
    footerButton: {
        width: Dimensions.get('window').width / 1.5,
    },
    footerTextLg: {
        fontSize: 30,
        fontFamily: 'open-sans-bold',
        color: '#DA4633'
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        //borderWidth: 1,
        //borderColor: '#DA4633',
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
    }
});

export default HomeScreen;