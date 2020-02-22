import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';


const SearchScreen = props => {
    
    return (

        <SafeAreaView style = {styles.screen}>
            <Text>Search screen</Text>
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

export default SearchScreen;