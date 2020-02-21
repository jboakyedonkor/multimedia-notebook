import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';


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
        }
    }
);


export default createAppContainer(AppNavigator);