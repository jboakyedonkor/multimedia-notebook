import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


//import {createDrawerNavigator} from '@react-navigation/drawer';

import { Ionicons, FontAwesome } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LandingScreen from '../screens/LandingScreen';
import UserDashboardScreen from '../screens/UserDashboardScreen';
import AddNoteScreen from '../screens/AddNoteScreen';
import SearchScreen from '../screens/SearchScreen';


const LandingPageStackNavigator = createStackNavigator();
export const LandingPageNavigator = () => {
    return (
        <LandingPageStackNavigator.Navigator>
            <LandingPageStackNavigator.Screen
                name='Landing'
                component={LandingScreen}
                options={{ headerTitle: 'Home' }}
            />
        </LandingPageStackNavigator.Navigator>
    )

}

const LoggedInTabNavigator = createBottomTabNavigator();
const LoggedInNavigator = () => {
    return (
        <LoggedInTabNavigator.Navigator
            tabBarOptions = {{
                activeTintColor: '#DA4633'
            }}
        >
            <LoggedInTabNavigator.Screen
                name= 'LandingPage'
                component={LandingPageNavigator}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome name='home' size= {size} color = {color}/>
                    }
                }}
            />
            <LoggedInTabNavigator.Screen
                name='AddNote'
                component={AddNoteScreen}
                options={{
                    tabBarLabel: 'New Note',
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name='ios-add-circle-outline' size= {size} color = {color}/>
                    }
                }}
            />
            <LoggedInTabNavigator.Screen
                name= 'Search'
                component={SearchScreen}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name='ios-search' size= {size} color = {color}/>
                    }
                }}
            />
            <LoggedInTabNavigator.Screen
                name= 'UserDashboard'
                component={UserDashboardScreen}
                options={{
                    tabBarLabel: 'Me',
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name='md-person' size= {size} color = {color} />
                    }
                }}
            />
        </LoggedInTabNavigator.Navigator>
    )
}


const AppStackNavigator = createStackNavigator();
const AppNavigator = () => {
    return (
        <AppStackNavigator.Navigator>
            <AppStackNavigator.Screen
                name = 'Home'
                component = {HomeScreen}
                options = {{
                    headerShown: false
                }}
            />
            <AppStackNavigator.Screen
                name = 'Login'
                component = {LoginScreen}
                options = {{
                    headerShown: true
                }}
            />
            <AppStackNavigator.Screen
                name = 'SignUp'
                component = {SignUpScreen}
                options = {{
                    headerShown: false
                }}
            />
            <AppStackNavigator.Screen
                name = 'LoggedIn'
                component = {LoggedInNavigator}
                options = {{
                    headerShown: false
                }}
            />
        </AppStackNavigator.Navigator>
    )
}
const MainAppNavigator = props => {
    return (
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
    )
}


export default MainAppNavigator;