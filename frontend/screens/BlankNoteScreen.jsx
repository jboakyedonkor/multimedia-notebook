import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Dimensions,
    ScrollView,
    Platform,
    Alert,
    ActivityIndicator
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';



import HeaderButton from '../components/HeaderButton';
import * as notesActions from '../store/actions/notes';
import NewNoteOverlayDisplay from '../components/NewNoteOverlayDisplay';
import { Translation } from 'react-i18next';
import i18n from "../i18n.js"


const BlankNoteScreen = props => {

    const dispatch = useDispatch();

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [titleIsInvalid, setTitleIsInvalid] = useState(true)
    const [bodyIsInvalid, setBodyIsInvalid] = useState(true)
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

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

    displayOptionModal = () => {
        setModalIsVisible(true);
    }

    submitHandler = useCallback(async () => {
        if (titleIsInvalid || bodyIsInvalid) {
            Alert.alert('Empty input!', 'Please enter text in the form.', [
                { text: 'Okay' }
            ]);
            return;
        }
        setError(null);
        setIsLoading(true);

        try {
            await dispatch(notesActions.createNote(
                title,
                body,
                "https://www.googleapis.com/youtube/v3",
                "https://www.googleapis.com/youtube/v3"
            )
            );
            props.navigation.goBack();
        } catch (err) {
            console.log(err.message)
            setError(err.message);
        }
        setIsLoading(false);
    }, [dispatch, titleIsInvalid, bodyIsInvalid, title, body]);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="Info"
                        iconName={
                            Platform.OS === 'android' ? 'ios-more' : 'ios-more'
                        }
                        onPress={displayOptionModal}
                    />
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


    //spinner display during network request
    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={'#DA4633'} />
            </View>
        );
    }

    return (
        <Translation>
        {(t, {i18n}) =>
            <View style={styles.screen}>
                <NewNoteOverlayDisplay
                    isVisible={modalIsVisible}
                    removeModal={() => setModalIsVisible(false)}
                />
                <ScrollView
                    style={styles.scrollview}
                >
                    <View style={styles.blankNoteContainer}>
                        <View style={styles.titleViewContainer}>
                            <TextInput
                                style={styles.title}
                                maxLength={20}
                                placeholder={t('Title')}
                                onChangeText={titleChangeHandler}
                                returnKeyType='next'
                            />
                    
                        </View>
                        <View style={styles.textViewContainer}>
                            <TextInput
                                style={styles.text}
                                multiline={true}
                                placeholder={t('Start writing')}
                                onChangeText={bodyChangeHandler}
                                returnKeyType='next'
                            />
                            
                        </View>
                    </View>
                </ScrollView>
            </View >
        }
        </Translation>
        

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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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