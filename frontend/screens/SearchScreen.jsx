import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { SearchBar, ListItem, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';


import { SwipeListView } from 'react-native-swipe-list-view';

import * as notesActions from '../store/actions/notes';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Translation } from 'react-i18next';
import i18n from "../i18n.js"


const SearchScreen = props => {

    const dispatch = useDispatch();
    const searchedNotes = useSelector(state => state.notes.searchedNotes);
    const [searchText, setSearchText] = useState('');
    const [error, setError] = useState();

    const updateSearchField = search => {
        setSearchText(search)
        fetchNotes(search)
    }

    const fetchNotes = async (noteToFind) => {

        try {
            await dispatch(notesActions.searchNotes(noteToFind))

        } catch (err) {
            console.log(err.message)
            setError(err.message)

        }

    }

    const deleteNote = async (noteTobeDeleted) => {

        try {
            await dispatch(notesActions.deleteNote(noteTobeDeleted))


        } catch (err) {
            console.log(err.message)
            setError(err.message)

        }
    }

    const renderHiddenItem = (itemData, itemMap) => (

        <Translation>
        {(t, {i18n}) =>
            <View style={styles.rowBack}>
                <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                    <Text
                        style={styles.backTextWhite}
                        onPress={() => deleteNote(itemData.item.name)}
                    >
                        {t('Delete')}</Text>
                    
                </View>
            </View>
        }
        </Translation>
    )

    const updateFavorite = async ({name, text, favorite, video_link, audio_link}) => {

        try{
            await dispatch(notesActions.updateNote(name, text, video_link,audio_link,!favorite));
        } catch(err) {
            console.log(err.message);
        }

    }


    return (
        <Translation>
        {(t, {i18n}) =>
            <SafeAreaView style={styles.screen}>
                
                        <SearchBar
                            platform={Platform.OS === 'android' ? 'android' : 'ios'}
                            placeholder={t("Enter title of note")}
                            onChangeText={updateSearchField}
                            value={searchText}
                            lightTheme
                            round
                            placeholderTextColor='black'
                        />
                
                
                <SwipeListView
                    data={searchedNotes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        
                        //<Text>{item.name}</Text>

                        <ListItem
                            title={item.name}
                            subtitle={item.text}
                            bottomDivider
                            chevron
                            rightIcon = {<Icon
                                name={item.favorite ? 'ios-star' : 'ios-star-outline'}
                                type='ionicon'
                                color = '#DA4633'
                                onPress={() => updateFavorite(item)} />}
                        />

                    )}
                    renderHiddenItem={renderHiddenItem}
                    leftOpenValue={75}
                    rightOpenValue={0}
                /*
                onRowOpen = {(itemKey, itemMap) => {
                    console.log("--------------------------------------------------------------")
                    console.log(itemMap)
                    setTimeout(() => {
                        itemMap[itemKey].closeRow()
                    }, 3000)
                }}
                */

                />
            </SafeAreaView>
        }
        </Translation>
    )
}

const styles = StyleSheet.create({

    screen: {
        height: '100%',
        width: '100%',

    },
    scrollView: {
        flex: 1,
        borderWidth: 1
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        left: 0,
    },
    backTextWhite: {
        color: '#FFF',
    },
})

export default SearchScreen;