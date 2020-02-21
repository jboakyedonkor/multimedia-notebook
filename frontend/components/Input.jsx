import React from 'react';
import {TextInput, StyleSheet, Dimensions} from 'react-native';


{/*
    This is a custom Text input component I created. The styling can be modified
    by passing styling to the 'style' prop
*/}
const Input = props => {
    return <TextInput  {...props} style = {{...styles.input, ...props.style}}/>
}


const styles = StyleSheet.create({
    input: {
        height: 50,
        width: Dimensions.get('window').width/1.3,
        borderColor: 'grey',
        fontSize: 15,
        borderRadius: 100,
        paddingHorizontal: 15,
        //to achieve elevation on iOS
        shadowColor: 'black',
        shadowOffset: {width: 0, height:2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
    }
});

export default Input;