import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';


import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as userActions from '../store/actions/user';


import * as notesActions from '../store/actions/notes';
import NewNoteButton from '../components/NewNoteButton';
import HeaderButton from '../components/HeaderButton';

const MOCKDATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];


const LandingScreen = props => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    createNewNoteHandler = useCallback(() => {
        props.navigation.navigate({ name: 'BlankScreen' });
    }, [props])

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="NewNote"
                        iconName={
                            Platform.OS === 'android' ? 'md-add' : 'ios-add'
                        }
                        onPress={createNewNoteHandler}
                    />
                </HeaderButtons>
            )
        });
    }, [createNewNoteHandler]);

    displayNewNoteOptionModal = () => {
        setModalIsVisible(true);
    }

    openBlankScreen = () => {

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

    //get currently logged in user info 
    useEffect(() => {
        setIsLoading(true);
        try {
            dispatch(userActions.getUserInfo());
        } catch (err) {
            //Alert.alert("Could not load note")
        }
        setIsLoading(false);
    }, [dispatch]);


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