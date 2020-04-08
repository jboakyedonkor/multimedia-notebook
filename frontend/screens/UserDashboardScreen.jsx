import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar} from 'react-native-elements';

import * as authActions from '../store/actions/auth.js';

const UserDashboardScreen = props => {


    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user.userInfo);
    const { first_name, last_name, email, language } = userInfo;
    const [isLoading, setIsLoading] = useState(false);

    const logOutHandler = useCallback(async () => {
        await dispatch(authActions.logout());
    }, [dispatch]);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (

                <TouchableOpacity
                    onPress={logOutHandler}
                >
                    <View style={styles.logout}>
                        <Text style={{ color: '#DA4633', fontSize: 20 }}>Sign out</Text>
                    </View>
                </TouchableOpacity>

            )
        });
    }, [logOutHandler]);



    return (

        <SafeAreaView style={styles.screen}>
            <ScrollView>
                <View style={styles.avatar}>
                    <Avatar
                        rounded title={first_name.charAt(0) + last_name.charAt(0)}
                        size='xlarge'
                        
                    />
                </View>
                <View style = {styles.texts}>
                    <Text style={styles.text}>{first_name + ' ' + last_name}</Text>
                    <Text style={styles.text}>{userInfo.email}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    screen: {
        height: '100%',
        width: '100%',
    },
    avatar: {
        paddingVertical: 10,
        alignItems: 'center'
    },
    logout: {
        paddingHorizontal: 5
    },
    texts: {
        alignItems: 'center'
    },
    text: {
        fontWeight: 'bold',
        marginVertical: 2
    }
})

export default UserDashboardScreen;