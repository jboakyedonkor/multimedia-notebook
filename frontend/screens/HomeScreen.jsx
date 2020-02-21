import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions } from 'react-native';

const HomeScreen = props => {

    getMoviesFromApiAsync =  () => {
        console.log('here')
        return fetch('http://10.136.112.92:8000/admin')
          .then((response) => response.text())
          .then((responseJson) => {
            console.log(responseJson);
          })
          .catch((error) => {
            console.error(error);
          });
      }


    return (
        <View style={styles.screen}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>MULTI MEDIA NOTES</Text>
            </View>


            <View style = {styles.imageContainer}>
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
                <View style={styles.footerButton}>
                    <Button
                        title='SIGN IN'
                        color = {'black'}
                        onPress={() => {
                            props.navigation.navigate({ routeName: 'Login' });
                        }}
                    />
                </View>
                <View style={{...styles.footerButton, backgroundColor:'#DA4633'}}>
                    <Button
                        title='CREATE NEW ACCOUNT'
                        color = {'black'}
                        onPress={() => {
                            props.navigation.navigate({routeName: 'SignUp'})
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
        marginTop: 20,
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
        alignItems: 'center',
        marginBottom: 50
    },
    footerButton: {
        width: Dimensions.get('window').width / 1.5,
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 100,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 1,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
    },
    footerTextLg: {
        fontSize: 30,
        fontFamily: 'open-sans-bold',
        color: '#DA4633'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
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