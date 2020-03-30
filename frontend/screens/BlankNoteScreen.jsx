import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Dimensions, ScrollView, Platform, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';


const BlankNoteScreen = props => {

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [titleIsInvalid, setTitleIsInvalid] = useState(true)
    const [bodyIsInvalid, setBodyIsInvalid] = useState(true)

    titleChangeHandler = (text) => {
        setTitle(text)
        if (text.trim().length != 0) {
            setTitleIsInvalid(false)
        } else {
            setTitleIsInvalid(true)
        }
    }
    bodyChangeHandler = (text) => {
        setBody(text)
        if (text.trim().length != 0) {
            setBodyIsInvalid(false)
        } else {
            setBodyIsInvalid(true)
        }
    }

    submitHandler = () => {
        if (titleIsInvalid || bodyIsInvalid) {
            Alert.alert('Empty input!', 'Please enter text in the form.', [
                { text: 'Okay' }
            ]);
            return;
        }

        //setError here
        //setIsLoading(true);
        console.log("Form was valid")
        
    }

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="Save"
                        iconName={
                            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
                        }
                        onPress={submitHandler}
                    />
                </HeaderButtons>
            )
        });
    }, [submitHandler]);

    return (
        <View style={styles.screen}>
            <ScrollView
                style={styles.scrollview}
            >
                <View style={styles.blankNoteContainer}>
                    <View style={styles.titleViewContainer}>
                        <TextInput
                            style={styles.title}
                            maxLength={20}
                            placeholder={'Title'}
                            onChangeText={titleChangeHandler}
                            returnKeyType='next'
                        />
                    </View>
                    <View style={styles.textViewContainer}>
                        <TextInput
                            style={styles.text}
                            multiline={true}
                            placeholder={'Start writing'}
                            onChangeText={bodyChangeHandler}
                            returnKeyType='next'
                        />
                    </View>
                </View>
            </ScrollView>
        </View >

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

    },

    blankNoteContainer: {
        width: '100%',
        height: '100%',

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 2,
        //backgroundColor: 'yellow',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        height: 50
    },
    text: {
        fontSize: 17,
        paddingHorizontal: 2,
        //backgroundColor: 'blue',
        borderBottomColor: 'black',
        borderBottomWidth: 3,
        height: Dimensions.get('window').height

    }

});


export default BlankNoteScreen;