import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, FlatList, Alert } from 'react-native';
import { SearchBar, ListItem, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';


import { SwipeListView } from 'react-native-swipe-list-view';

import * as notesActions from '../store/actions/notes';



const SearchScreen = props => {

    const dispatch = useDispatch();
    const searchedNotes = useSelector(state => state.notes.searchedNotes);
    const [searchText, setSearchText] = useState('');
    const [error, setError] = useState();

    const updateSearchField = searchTextField => {
        setSearchText(searchTextField);
        searchNotes(searchTextField);
    }

    const searchNotes = async (noteToFind) => {
        try{
            await dispatch(notesActions.searchNotes(noteToFind))
        } catch (err){
            setError(err.message)
        }

    }

    const deleteNote = async (noteTobeDeleted) => {

        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            { text: 'No', style: 'default' },
            {
              text: 'Yes',
              style: 'destructive',
              onPress: async () => {
                try {
                    await dispatch(notesActions.deleteNote(noteTobeDeleted))
        
        
                } catch (err) {
                    console.log(err.message)
                    setError(err.message)
        
                }
              }
            }
          ]);
    }

    const renderHiddenItem = (itemData, itemMap) => (

        <View style={styles.rowBack}>
            <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                <Text
                    style={styles.backTextWhite}
                    onPress={() => {
                    itemMap[itemData.index].closeRow()
                    deleteNote(itemData.item.name)
                    }}
                >
                    Delete</Text>
            </View>
        </View>

    )

    const updateFavorite = async ({ name, text, favorite, video_link, audio_link, created_at, accessed_at }) => {

        try {
            //update favorite's array in store
            await dispatch(notesActions.updateFavorites(name, text, favorite, video_link, audio_link, created_at, accessed_at));
            //update database and all store
            await dispatch(notesActions.updateNote(name, text, video_link, audio_link, !favorite));

        } catch (err) {
            console.log(err.message);
            return;
        }
        
    }
    const editNoteHandler = name => {
        props.navigation.navigate('EditNoteScreen', { noteName: name });
    };


    return (

        <SafeAreaView style={styles.screen}>
            <SearchBar
                platform={Platform.OS === 'android' ? 'android' : 'ios'}
                placeholder="Enter title of note"
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
                        onPress = {() => editNoteHandler(item.name)}
                        title={item.name}
                        subtitle={item.text}
                        bottomDivider
                        chevron
                        rightIcon={<Icon
                            name={item.favorite ? 'ios-star' : 'ios-star-outline'}
                            type='ionicon'
                            color='#DA4633'
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