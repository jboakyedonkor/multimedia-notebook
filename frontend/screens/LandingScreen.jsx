import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ListItem, Icon, Text } from 'react-native-elements';

import { Surface } from 'react-native-paper';


import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as userActions from '../store/actions/user';
import * as tagsActions from '../store/actions/tags';
import * as notesActions from '../store/actions/notes';


import NewNoteButton from '../components/NewNoteButton';
import HeaderButton from '../components/HeaderButton';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Translation } from 'react-i18next';
import i18n from "../i18n.js";


const LandingScreen = props => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const popularTags = useSelector(state => state.tags.popularTags);

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


    /*
    useEffect(() => {
        try{
            dispatch(notesActions.fetchNotes());
        }catch(err){
            //Alert.alert("Could not load note")
        }
    }, [dispatch]);
    */

    fetchData = useCallback(async () => {
        setError(null)
        setIsRefreshing(true)
        try {
            await dispatch(tagsActions.fetchPopularTags());
            await dispatch(userActions.getUserInfo());
            await dispatch(notesActions.fetchNotes());
        } catch (err) {
            setError(err.message);
            //throw new Error(err.message);
            //Alert.alert("Could not load note")

        }
        setIsRefreshing(false)

    }, [dispatch]);

    //get currently logged in user info and fetch different data needed for the app
    useEffect(() => {
        setIsLoading(true);
        fetchData();
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

    if (popularTags.length === 0) {
        return (
            <Translation>
            {(t, {i18n}) =>
            <View
                style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                <Text>{t("You currently do not have any popular tags")}</Text>
            </View>
            }
            </Translation>
        )
    }

    const deletePopularTag = async (tagTobeDeleted) => {

        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await dispatch(tagsActions.deletePopularTag(tagTobeDeleted))


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
                        deletePopularTag(itemData.item.name)
                    }}
                >
                    Delete</Text>
            </View>
        </View>

    )

    const updateFavorite = async ({ name, favorite }) => {

        try {
            dispatch(tagsActions.updatePopularTagFavorite(name, favorite));

        } catch (err) {
            setError(err.message)
        }

    }


    return (
        <View style={styles.screen}>
            <SwipeListView
                
                onRefresh = {fetchData}
                refreshing = {isRefreshing}
                ListHeaderComponent={<Text h4>Popular Tags</Text>}
                data={popularTags}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (

                    //<Text>{item.name}</Text>

                    <ListItem
                        //onPress = {()}
                        title={item.name}
                        subtitle={<Text style={{ fontStyle: 'italic' }}>{"created: " + item.created_at.substring(0, 10).replace(/-/g, '/')}</Text>}
                        bottomDivider
                        chevron
                        rightIcon={<Icon
                            name={item.favorite ? 'ios-star' : 'ios-star-outline'}
                            type='ionicon'
                            color='#DA4633'
                            onPress={() => updateFavorite(item)}

                        />}
                        leftIcon={<Icon
                            reverse
                            raised
                            name={item.favorite ? 'hashtag' : 'hashtag'}
                            type='font-awesome'
                            color='#DA4633'
                        //onPress={() => updateFavorite(item)} 

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
        </View>
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

export default LandingScreen;