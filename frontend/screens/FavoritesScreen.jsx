import React, {useState, useCallback, useEffect} from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';



import { SwipeListView } from 'react-native-swipe-list-view';
import { ListItem, Icon } from 'react-native-elements';

import * as notesActions from '../store/actions/notes';






const FavoritesScreen = props => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const favoriteNotes = useSelector(state => state.notes.favoriteNotes);


    fetchFavoriteNotes = useCallback(async () => {
        try {
            await dispatch(notesActions.fetchFavorites());
        } catch (err) {
            setError(err.message);
            //throw new Error(err.message);
            //Alert.alert("Could not load note")

        }

    }, [dispatch]);

    //get favorite notes
    useEffect(() => {
        setIsLoading(true);
        fetchFavoriteNotes();
        setIsLoading(false);
    }, [dispatch]);


    const deleteNote = async (noteTobeDeleted) => {

        try {
            await dispatch(notesActions.deleteNote(noteTobeDeleted))


        } catch (err) {
            console.log(err.message)
            setError(err.message)

        }
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

    //spinner display during network request
    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={'#DA4633'} />
            </View>
        );
    }

    return (

        <SafeAreaView style={styles.screen}>

            <SwipeListView
                data={favoriteNotes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (

                    //<Text>{item.name}</Text>

                    <ListItem
                        title={item.name}
                        subtitle={item.text}
                        bottomDivider
                        chevron
                        rightIcon={<Icon
                            name={item.favorite ? 'ios-star' : 'ios-star-outline'}
                            type='ionicon'
                            color='#DA4633'
                        onPress={() => updateFavorite(item)} 
                        />}
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

export default FavoritesScreen;