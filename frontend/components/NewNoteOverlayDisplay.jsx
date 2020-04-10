import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import { Ionicons, MaterialCommunityIcons, EvilIcons } from '@expo/vector-icons';
import { Overlay } from "react-native-elements";

import { Translation } from 'react-i18next';
import i18n from "../i18n.js"


const NewNoteOverlayDisplay = props => {

    const { isVisible, removeModal } = props;
    return (
        <Overlay
            animationType="slide"
            transparent={true}
            visible={isVisible}
            windowBackgroundColor="rgba(255, 255, 255, .5)"
            overlayBackgroundColor='#DA4633'
            width="auto"
            height="auto"
            borderRadius={Dimensions.get('window').height * 0.03}
        >
            <View>

                <View style={styles.closeModalButton}>
                    <TouchableWithoutFeedback
                        onPress={
                            removeModal
                        }
                    >
                        <EvilIcons
                            name='close-o'
                            size={50}
                        />
                    </TouchableWithoutFeedback>
                </View>



                <View style={styles.groupButtonContainer}>

                    <View style={styles.singleButtonContainer}>
                        <View style={styles.icon}>
                            <Ionicons
                                name='md-pricetag'
                                size={40}
                            />
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity>
                                <Translation>
                                {(t, {i18n}) =>
                                    <Text>{t('Add tags')}</Text>
                                }
                                </Translation>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.singleButtonContainer}>
                        <View style={styles.icon}>
                            <Ionicons
                                name='ios-mic'
                                size={40}
                            />
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity>
                                <Translation>
                                {(t, {i18n}) =>
                                    <Text>{t('Record audio')}</Text>
                                }
                                </Translation>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.singleButtonContainer}>
                        <View style={styles.icon}>
                            <Ionicons
                                name='ios-attach'
                                size={40}
                            />
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity>
                                <Translation>
                                {(t, {i18n}) =>
                                    <Text>{t('Add attachment')}</Text>
                                }
                                </Translation>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={styles.singleButtonContainer}>
                        <View style={styles.icon}>
                            <Ionicons
                                name='md-color-palette'
                                size={40}
                            />
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity>
                                <Translation>
                                {(t, {i18n}) =>
                                    <Text>{t('Start sketching')}</Text>
                                }
                                </Translation>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={styles.singleButtonContainer}>
                        <View style={styles.icon}>
                            <Ionicons
                                name='ios-camera'
                                size={40}
                            />
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity>
                                <Translation>
                                {(t, {i18n}) =>
                                    <Text>{t('Take photo')}</Text>
                                }
                                </Translation>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
        </Overlay>

    )
}


const styles = new StyleSheet.create({
    closeModalButton: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        paddingRight: 5,
        paddingTop: 5,
        //borderWidth: 3,
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
    button: {
    }

});


export default NewNoteOverlayDisplay;