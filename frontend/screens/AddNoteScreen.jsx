import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';


const AddNoteScreen = props => {
    
    return (

        <SafeAreaView style = {styles.screen}>
            <Text>Add Note screen</Text>
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

export default AddNoteScreen;