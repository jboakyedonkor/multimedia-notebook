import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';


import * as notesActions from '../store/actions/notes';


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
                <FlatList
                    data={searchedNotes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                        //console.log(searchedNotes)
                        //<Text>{item.name}</Text>
                        
                        <ListItem
                        title = {item.name}
                        subtitle = {item.text}
                        bottomDivider
                        chevron
                        />
                        
                    )}
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
    }
})

export default SearchScreen;