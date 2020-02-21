import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignUpScreen';


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
            screen: SignupScreen,
            navigationOptions:{
                headerTitle: 'Create New Account',
                headerShown: false
            }
        }
    }
);


export default createAppContainer(AppNavigator);