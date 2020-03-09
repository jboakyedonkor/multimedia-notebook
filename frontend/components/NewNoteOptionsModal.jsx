import React, { useState } from 'react';
import { Modal, Text, View, StyleSheet, Dimensions, Button, TouchableWithoutFeedback } from 'react-native';

import { Ionicons, MaterialCommunityIcons, EvilIcons } from '@expo/vector-icons';



const NewNoteOptionsModal = props => {

    const { isVisible, removeModal } = props;
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}


        >
            <View style={styles.modalView}>

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
                    <View style = {styles.singleButtonContainer}>
                        <View style = {styles.icon}>
                            <Ionicons
                                name = 'ios-mic'
                                size = {40}
                            />
                        </View>
                        <View style = {styles.button}>
                            <Button
                                title='Record audio'
                                color = 'white'
                            />
                        </View>
                    </View>

                    <View style = {styles.singleButtonContainer}>
                        <View style = {styles.icon}>
                            <Ionicons
                                name = 'ios-attach'
                                size = {40}
                            />
                        </View>
                        <View style = {styles.button}>
                            <Button
                                title='Add attachment'
                                color = 'white'
                            />
                        </View>
                    </View>
                    
                    
                    <View style = {styles.singleButtonContainer}>
                        <View style = {styles.icon}>
                            <Ionicons
                                name = 'md-color-palette'
                                size = {40}
                            />
                        </View>
                        <View style = {styles.button}>
                            <Button
                                title='Stark sketching'
                                color = 'white'
                            />
                        </View>
                    </View>
                    
                    
                    <View style = {styles.singleButtonContainer}>
                        <View style = {styles.icon}>
                            <Ionicons
                                name = 'ios-camera'
                                size = {40}
                            />
                        </View>
                        <View style = {styles.button}>
                            <Button
                                title='Take photo'
                                color = 'white'
                            />
                        </View>
                    </View>

                    
                    <View style = {styles.singleButtonContainer}>
                        <View style = {styles.icon}>
                            <Ionicons
                                name = 'ios-paper'
                                size = {40}
                            />
                        </View>
                        <View style = {styles.button}>
                            <Button
                                title='Blank note'
                                color = 'white'
                            />
                        </View>
                    </View>
                </View>

            </View>
        </Modal>

    )
}


const styles = new StyleSheet.create({

    modalView: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: Dimensions.get('window').width * 0.6,
        //height: Dimensions.get('window').height * 0.5,
        alignSelf: 'center',
        top: Dimensions.get('window').height * 0.3,
        borderRadius: Dimensions.get('window').height * 0.03,
    },
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
    singleButtonContainer:{
        flexDirection: 'row',
        //borderWidth: 3,
    },
    icon: {
        paddingRight: 10
    },
    button: {
        
    }

});


export default NewNoteOptionsModal;