import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import HomeScreen from '../screens/home/HomeScreen';
import WorkoutScreen from '../screens/workout/WorkoutScreen';
const screens = {
  Home: {
    screen: HomeScreen,
  },
  WorkoutScreen: {
    screen: WorkoutScreen,
  },
};
const HomeStack = createStackNavigator(screens);
export default createAppContainer(HomeStack);
