import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
//import {createDrawerNavigator} from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import {Ionicons, FontAwesome} from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LandingScreen from '../screens/LandingScreen';
import UserDashboardScreen from '../screens/UserDashboardScreen';
import AddNoteScreen from '../screens/AddNoteScreen';
import SearchScreen from '../screens/SearchScreen';

const LoggedInStackNav = createStackNavigator({
    Landing: {
        screen: LandingScreen,
        navigationOptions:{
            headerTitle: 'Home',
        }
    }
});

const LoggedInTabNav = createBottomTabNavigator(
{

    LandingPage: {
        screen: LoggedInStackNav,
        navigationOptions:{
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor}) => {
                return <FontAwesome name = 'home' size = {25} color = {tintColor} />
            }
        }
    },
    AddNote: {
        screen: AddNoteScreen,
        navigationOptions:{
            tabBarLabel: 'New Note',
            tabBarIcon: ({tintColor}) => {
                return <Ionicons name = 'ios-add-circle-outline' size = {25} color = {tintColor} />
            }
        }
    },
    Search: {
        screen: SearchScreen,
        navigationOptions:{
            tabBarLabel: 'Search',
            tabBarIcon: ({tintColor}) => {
                return <Ionicons name = 'ios-search' size = {25} color = {tintColor} />
            }
        }
    },
    UserDashboard: {
        screen: UserDashboardScreen,
        navigationOptions:{
            tabBarLabel: 'Me',
            tabBarIcon: ({tintColor}) => {
                return <Ionicons name = 'md-person' size = {25} color = {tintColor} />
            }
        }
    }
},
{
    tabBarOptions: {
        activeTintColor: '#DA4633'
    }
}
);

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                headerShown: false
            }
        },
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                headerShown: true
            }
        },
        SignUp: {
            screen: SignUpScreen,
            navigationOptions: {
                headerShown: false
            }
        },
        LoggedIn: {
            screen: LoggedInTabNav,
            navigationOptions: {
                headerShown: false
            }
        }
    }
);


export default createAppContainer(AppNavigator);