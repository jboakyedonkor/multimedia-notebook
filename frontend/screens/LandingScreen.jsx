import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';


import * as notesActions from '../store/actions/notes';
import NewNoteButton from '../components/NewNoteButton';
import NewNoteOptionsModal from '../components/NewNoteOptionsModal';



const LandingScreen = props => {

    //const token = props.route.params.token;
    //console.log(token)

    //this fetches the token from async storage
    //let temp = AsyncStorage.getItem('token');
    //token.current = temp;
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const dispatch = useDispatch();

    displayNewNoteOptionModal = () => {
        setModalIsVisible(true);
    }

    openBlankScreen = () => {
        props.navigation.navigate({ name: 'BlankScreen' });
    }

    /*
    useEffect(() => {
        try{
            dispatch(notesActions.fetchNotes());
        }catch(err){
            //Alert.alert("Could not load note")
        }
    }, [dispatch]);
    */

    return (
        <View style={styles.screen}>
            <Text>Welcome home</Text>
            <NewNoteOptionsModal
                isVisible = {modalIsVisible}
                removeModal = {() => setModalIsVisible(false)}
            />

            <View style = {styles.newNoteButtonContainer}>
                <NewNoteButton
                    showNewNoteOptions = {displayNewNoteOptionModal}
                    openBlankNote = {openBlankScreen}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        //justifyContent: 'center',
        alignItems: 'center',
    },
    newNoteButtonContainer: {
        height: '100%',
        width: '80%',
        justifyContent: 'flex-end',
        paddingBottom: '5%'
    }
})

export default LandingScreen;