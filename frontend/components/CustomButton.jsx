import React from 'react';
import {View, Button, StyleSheet} from 'react-native';


const CustomButton = props => {
    const {style, ...otherProps} = props;

    return (
        <View style = {{...styles.button, ...style}}>
            <Button {...otherProps}/>
        </View>
    )
}


const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 100,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 1,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
    }
})

export default CustomButton;