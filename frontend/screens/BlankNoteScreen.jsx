import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, ScrollView } from 'react-native';

import Input from '../components/Input';

const BlankNoteScreen = props => {

    return (

        <View style={styles.screen}>
            <ScrollView style={styles.scrollview}>
                <View style={styles.blankNoteContainer}>
                    <View style={styles.titleViewContainer}>
                        <TextInput
                            style={styles.title}
                            maxLength={20}
                            placeholder = {'Title'}
                        />
                    </View>
                    <View style={styles.textViewContainer}>
                        <TextInput
                            style={styles.text}
                            multiline={true}
                            placeholder = {'Start writing'}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>

    )

}


const styles = new StyleSheet.create({

    screen: {
        height: '100%',
        width: '100%',
        //justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
    },

    scrollview: {
        height: '100%',
        width: '100%',
        borderWidth: 3

    },

    blankNoteContainer: {
        width: '100%',
        height: '100%',
        borderWidth: 3,
        borderColor: 'red',

    },
    titleViewContainer: {
        //height: '20%',
        //width: '100%',
        //borderWidth: 10
        

    },
    textViewContainer:{
        //height: '90%',
        //borderWidth: 10
        //paddingTop: 10
    },
    title: {
        paddingHorizontal: 2,
        backgroundColor: 'yellow',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        borderTopWidth: 3,
        height: 50
    },
    text: {
        paddingHorizontal: 2,
        backgroundColor: 'blue',
        borderBottomColor: 'black',
        borderBottomWidth: 3,
        borderTopWidth: 3,
        height: Dimensions.get('window').height

    }

});


export default BlankNoteScreen;