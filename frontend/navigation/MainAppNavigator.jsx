import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


//import {createDrawerNavigator} from '@react-navigation/drawer';

import { Ionicons, FontAwesome } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LandingScreen from '../screens/LandingScreen';
import UserDashboardScreen from '../screens/UserDashboardScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SearchScreen from '../screens/SearchScreen';
import StartupScreen from '../screens/StartupScreen';
import BlankNoteScreen from '../screens/BlankNoteScreen';


const LandingPageStackNavigator = createStackNavigator();
export const LandingPageNavigator = () => {
    return (
        <LandingPageStackNavigator.Navigator>
            <LandingPageStackNavigator.Screen
                name='Landing'
                component={LandingScreen}
                options={{ headerTitle: 'Home' }}
            />

            <LandingPageStackNavigator.Screen
                name='BlankScreen'
                component={BlankNoteScreen}
                options={{ headerTitle: 'Blank Note' }}
            />
        </LandingPageStackNavigator.Navigator>
    )
}
const UserDashboardStackNavigator = createStackNavigator();
export const UserDashboardNavigator = () => {

    return(
        <UserDashboardStackNavigator.Navigator>
            <UserDashboardStackNavigator.Screen
                name = 'Dashboard'
                component = {UserDashboardScreen}
                options = {{headerTitle: ''}}
            />

        </UserDashboardStackNavigator.Navigator>
    )
}

const LoggedInTabNavigator = createBottomTabNavigator();
const LoggedInNavigator = () => {
    return (
        <LoggedInTabNavigator.Navigator
            tabBarOptions={{
                activeTintColor: '#DA4633'
            }}
        >
            <LoggedInTabNavigator.Screen
                name='LandingPage'
                component={LandingPageNavigator}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome name='home' size={size} color={color} />
                    }
                }}
            />
            <LoggedInTabNavigator.Screen
                name='Favorites'
                component={FavoritesScreen}
                options={{
                    tabBarLabel: 'Favorites',
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name='ios-star' size={size} color={color} />
                    }
                }}
            />
            <LoggedInTabNavigator.Screen
                name='Search'
                component={SearchScreen}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name='ios-search' size={size} color={color} />
                    }
                }}
            />
            <LoggedInTabNavigator.Screen
                name='UserDashboardPage'
                component={UserDashboardNavigator}
                options={{
                    tabBarLabel: 'Me',
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name='md-person' size={size} color={color} />
                    }
                }}
            />
        </LoggedInTabNavigator.Navigator>
    )
}


const AuthStackNavigator = createStackNavigator();
const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator>
            <AuthStackNavigator.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    headerShown: false
                }}
            />
            <AuthStackNavigator.Screen
                name='Login'
                component={LoginScreen}
                options={{
                    headerShown: true
                }}
            />
            <AuthStackNavigator.Screen
                name='SignUp'
                component={SignUpScreen}
                options={{
                    headerShown: true,
                    headerTitle: 'New Account'
                }}
            />
            <AuthStackNavigator.Screen
                name='LoggedIn'
                component={LoggedInNavigator}
                options={{
                    headerShown: false
                }}
            />
        </AuthStackNavigator.Navigator>
    )
}
const MainAppNavigator = props => {

    const isAuth = useSelector(state => !!state.auth.token);
    const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

    return (
        <NavigationContainer>
            {isAuth && <LoggedInNavigator />}
            {!isAuth && didTryAutoLogin && <AuthNavigator />}
            {!isAuth && !didTryAutoLogin && <StartupScreen />}
        </NavigationContainer>
    )
}


export default MainAppNavigator;