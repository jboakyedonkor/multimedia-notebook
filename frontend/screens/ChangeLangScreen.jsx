import React from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import i18n from "../i18n.js";


const ChangeLangScreen = props => {
    
    return (

        <SafeAreaView style = {styles.screen}>
            <CustomButton
                style={styles.footerButton}
                title='English'
                color={'black'}
                onPress={() => {
                    i18n.changeLanguage("en");
                }}
            />
            <CustomButton
                style={styles.footerButton}
                title="Español"
                color={'black'}
                onPress={() => {
                    i18n.changeLanguage("es");
                }}
            />
            <CustomButton
                style={styles.footerButton}
                title="عربى"
                color={'black'}
                onPress={() => {
                    i18n.changeLanguage("ar");
                }}
            />
        </SafeAreaView>
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

export default ChangeLangScreen;