import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';


const FavoritesScreen = props => {
    
    return (

        <SafeAreaView style = {styles.screen}>
            <Text>Favorites screen</Text>
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

export default FavoritesScreen;