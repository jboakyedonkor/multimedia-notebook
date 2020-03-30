import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';


import CustomButton from './CustomButton';


const NewNoteButton = props => {


    return (
        <View style={styles.button}>
            <CustomButton
                title='New Note'
                style={styles.button1}
                onPress = {props.openBlankNote}
                //color={'white'}
            />

            <CustomButton
                title='...'
                onPress={props.showNewNoteOptions}
                style={styles.button2}
                //color={'white'}
            />
        </View>
    )
}

const styles = new StyleSheet.create({
    button: {
        flexDirection: "row",
        marginHorizontal: 10
    },

    button1: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: '#00AD83',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    button2: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        width: '20%',
        backgroundColor: '#006A4E',
        justifyContent: 'center',
        alignItems: 'center'

    }

})

export default NewNoteButton;