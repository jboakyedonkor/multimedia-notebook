import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';


const AppNavigator = createStackNavigator({
    Home: HomeScreen,
    //another way of creating stack navigation, gives you more access
    //to props
    Login: {
        screen: LoginScreen
    }
});


export default createAppContainer(AppNavigator);