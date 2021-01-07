import React from 'react';

import {createAppContainer } from 'react-navigation';

import { FontAwesome } from '@expo/vector-icons';


// BOTTOM NAVIGATOR =============================>
import Favorite from './screens/Favorite';
import Group from './screens/Group';
import homePage from './screens/homePage';
import Profil from './screens/Profil';
import BottomTabBar from "react-navigation-selective-tab-bar";
import {createBottomTabNavigator} from 'react-navigation-tabs';

// STACK NAVIGATOR =============================>
import Welcome from './screens/Welcome';
import List from './screens/List';
import Recipe from './screens/Recipe';
import GlobalList from './screens/GlobalList';
import RecipeHome from './screens/components/recipeHome';
import MesGroupes from './screens/MesGroupes'; 
import MesGroupesP12 from './screens/MesGroupesP12'; 
import {createStackNavigator} from 'react-navigation-stack';


// Redux store
import preferences from './reducers/preferences';
import recipe from './reducers/recipeInfo';
import token from './reducers/token'
import checkList from './reducers/checkList';
import nameGroup from './reducers/nameGroup';
import tokenGroup from './reducers/tokenGroup';
import recipeList from './reducers/recipeList';
import ingredientList from './reducers/ingredientList';
import listInfo from './reducers/listInfo';
import list from './reducers/shoppinglist';
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';


const store = createStore(combineReducers({recipe, nameGroup,tokenGroup, token, recipeList, checkList, ingredientList, listInfo, list, preferences}));


var BottomNavigator = createBottomTabNavigator({
  Home: { screen : homePage},
  Group: { screen : Group},
  Favorite: { screen : Favorite},
  Profil: { screen : Profil},
  List : {screen : List},
  MesGroupes: { screen : MesGroupes},
  MesGroupesP12:{ screen: MesGroupesP12},
  Recipe :{screen : Recipe},
  GlobalList: {screen : GlobalList},

},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      var iconName;
      
      if (navigation.state.routeName == 'Favorite') {
        iconName = 'heart';
      } else if (navigation.state.routeName == 'Group') {
        iconName = "users";
      }else if (navigation.state.routeName == 'Home') {
        iconName = 'home';
      }else if (navigation.state.routeName == 'Map') {
        iconName = 'map-o';
      }else if (navigation.state.routeName == 'Profil') {
          iconName = 'user';
      }
      return <FontAwesome name={iconName} size={25} color={tintColor} />;
    },
    tabBarComponent: props => {
      return (
        <BottomTabBar
          {...props} // Required
          display={["Favorite", "Group", "Home", "Profil"]} // Required
          background="black" // Optional
        />
      );
    }
  }),
  tabBarOptions: {
    activeTintColor: 'black',
    inactiveTintColor: '#ece9e9',
    style: {
      backgroundColor: 'white',
    }
  }  
 
})

var StackNavigator = createStackNavigator({
  Welcome: Welcome,
  homePage : homePage,
  List: List,
  Recipe: Recipe,
  GlobalList: GlobalList,
  RecipeHome: RecipeHome,
  MesGroupes:MesGroupes,
  MesGroupesP12:MesGroupesP12,
  Retour: BottomNavigator,
  
  
},
{headerMode:"none"}
);

var Navigation = createAppContainer(StackNavigator);


 export default function App() {
  return (
    
  <Provider store={store}>
   <Navigation/>
   </Provider>
   
  );
}



