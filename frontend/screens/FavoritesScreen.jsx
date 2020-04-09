import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import { Translation } from 'react-i18next';
import i18n from "../i18n.js"

const FavoritesScreen = props => {
    
    return (
        <Translation>
        {(t, {i18n}) =>
            <SafeAreaView style = {styles.screen}>
                <Text>{t('Favorites screen')}</Text>
            </SafeAreaView>
        }
        </Translation>
    )
}

const styles = StyleSheet.create({

    screen:{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems:'center'
    }
})

export default FavoritesScreen;