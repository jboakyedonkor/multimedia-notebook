import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    ScrollView,
    Platform,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
    Button
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';



import HeaderButton from '../components/HeaderButton';
import { Input } from 'react-native-elements';
import { Chip } from 'react-native-paper';

import Tags from "react-native-tags";


import * as notesActions from '../store/actions/notes';
import NewNoteOverlayDisplay from '../components/NewNoteOverlayDisplay';
import { Dialog } from 'react-native-simple-dialogs';
import { Ionicons, MaterialCommunityIcons, EvilIcons } from '@expo/vector-icons';

let tagArr = [];
const EditNoteScreen = props => {

    const dispatch = useDispatch();

    const noteName = props.route.params ? props.route.params.noteName : null;
    const editedNote = useSelector(state =>
        state.notes.allNotes.find(note => note.name === noteName)
      );

    const [title, setTitle] = useState(editedNote.name)
    const [body, setBody] = useState(editedNote.text)

    const [titleIsInvalid, setTitleIsInvalid] = useState(true)
    const [bodyIsInvalid, setBodyIsInvalid] = useState(true)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    



    const titleChangeHandler = (text) => {
        setTitle(text)
        if (text.trim().length != 0) {
            setTitleIsInvalid(false)
        } else {
            setTitleIsInvalid(true)
        }
    }

    const bodyChangeHandler = (text) => {
        setBody(text)
        if (text.trim().length != 0) {
            setBodyIsInvalid(false)
        } else {
            setBodyIsInvalid(true)
        }
    }


    const submitHandler = useCallback(async () => {
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
                "https://www.googleapis.com/youtube/v3",
                tagArr
            )
            );
            tagArr = []
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
                        title="camera"
                        iconName={
                            Platform.OS === 'android' ? 'ios-camera' : 'ios-camera'
                        }
                        //onPress={displayTagDialog}
                    />
                    <Item
                        title="mic"
                        iconName={
                            Platform.OS === 'android' ? 'ios-mic' : 'ios-mic'
                        }
                        //onPress={displayTagDialog}
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
        <View style={styles.screen}>

            <Text>Tags:</Text>
            <Tags
                initialText=""
                textInputProps={{
                    placeholder: "Type in tag and space to enter, tap on tag to remove",
                    placeholderTextColor: 'black'
                }}
                initialTags={tagArr}
                onChangeTags={tags => {
                    tagArr = tags
                    //console.log("--------------------")
                    console.log(tagArr)
                }}
                containerStyle={{ justifyContent: "center", padding: 10 }}
                onTagPress={(index, tagLabel, event, deleted) => {

                    //console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
                }
                }
                containerStyle={{ justifyContent: "center" }}
                //inputStyle={{ backgroundColor: "white" }}
                renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
                    <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
                        <View
                            key={`${tag}-${index}`}
                            style={styles.tagView}
                        >
                            <Text>#{tag}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />


            <ScrollView
                style={styles.scrollview}
            >

                <View style={styles.blankNoteContainer}>
                    <View style={styles.titleViewContainer}>
                        <TextInput
                            value = {title}
                            style={styles.title}
                            maxLength={20}
                            placeholder={'Title'}
                            onChangeText={titleChangeHandler}
                            returnKeyType='next'
                        />
                    </View>
                    <View style={styles.textViewContainer}>
                        <TextInput
                            value = {body}
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
        //width: '100%',
        //justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        //alignItems: 'center',
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
    },
    groupButtonContainer: {
        paddingVertical: '10%',
        paddingHorizontal: '10%',
    },
    singleButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
        //borderWidth: 3,
    },
    icon: {
        paddingRight: 10
    },
    tagView: {
        borderRadius: 10,
        borderRadius: 100,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 1,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        paddingVertical: 2,
        paddingHorizontal: 5,
        marginHorizontal: 5
    }

});


export default EditNoteScreen;