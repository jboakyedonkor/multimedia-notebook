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
    Image
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';




import HeaderButton from '../components/HeaderButton';
import { Input, Icon } from 'react-native-elements';
import { Chip } from 'react-native-paper';

import Tags from "react-native-tags";


import * as notesActions from '../store/actions/notes';
import NewNoteOverlayDisplay from '../components/NewNoteOverlayDisplay';
import { Dialog } from 'react-native-simple-dialogs';
import { Ionicons, MaterialCommunityIcons, EvilIcons } from '@expo/vector-icons';
import { Translation } from 'react-i18next';
import i18n from "../i18n.js";

let tagArr = [];
const BlankNoteScreen = props => {

    const dispatch = useDispatch();

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [pickedImage, setPickedImage] = useState();

    const [titleIsInvalid, setTitleIsInvalid] = useState(true)
    const [bodyIsInvalid, setBodyIsInvalid] = useState(true)
    const [isLoading, setIsLoading] = useState(false);
    const [isImageDialogVisible, setIsImageDialogVisible] = useState(false);
    const [error, setError] = useState();





    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(
            Permissions.CAMERA_ROLL,
            Permissions.CAMERA
        );
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.Go to settings to change permissions.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const verifyAudioPermissions = async () => {
        const result = await Permissions.askAsync(
            Permissions.AUDIO_RECORDING
        );
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant microphone permissions to use this app.Go to settings to change permissions.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            //allowsEditing: true,
            quality: 0.5
        });

        setPickedImage(image.uri);
    };


    const showImageDialog = () => {
        setIsImageDialogVisible(true);
    }

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
                pickedImage,
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

    const recordAudio = async() => {
        const hasPermission = await verifyAudioPermissions();
        if (!hasPermission) {
            return;
        }
        RNVoiceRecorder.Record({
            onDone: (path) => {
                console.log(path)
            },
            onCancel: () => {
                console.log("CANCELLED!!")
            }
        })
    }

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="camera"
                        iconName={
                            Platform.OS === 'android' ? 'ios-camera' : 'ios-camera'
                        }
                        onPress={takeImageHandler}
                    />
                    <Item
                        title="mic"
                        iconName={
                            Platform.OS === 'android' ? 'ios-mic' : 'ios-mic'
                        }
                        onPress={recordAudio}
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
            <Dialog
                visible={isImageDialogVisible}
                title={t("Image preview")}
                onTouchOutside={() => setIsImageDialogVisible(false)} >
                <View style={styles.imagePicker}>
                    <View style={styles.imagePreview}>
                        <Image style={styles.image} source={{ uri: pickedImage }} />
                    </View>
                </View>
            </Dialog>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end'
            }}>
                {
                    !pickedImage ? (
                        <View></View>
                    ) : (
                            <View style={{ paddingHorizontal: 10 }}>
                                <Icon
                                    name='image'
                                    type='font-awesome'
                                    color='black'
                                    onPress={showImageDialog}
                                />
                            </View>
                        )
                }
            </View>

            <Text>{t('Tags') + ':'}</Text>
            <Tags
                initialText=""
                textInputProps={{
                    placeholder: t('Type in tag and space to enter, tap on tag to remove'),
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
    },
    imagePicker: {
        alignItems: 'center',
        marginBottom: 15
      },
      imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
      },
      image: {
        width: '100%',
        height: '100%'
      }

});


export default BlankNoteScreen;