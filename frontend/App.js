import React from 'react';

import {createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import { FontAwesome } from '@expo/vector-icons';

import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';


// BOTTOM NAVIGATOR =============================>
import Favorite from './screens/Favorite';
import Group from './screens/Group';
import homePage from './screens/homePage';
import Profil from './screens/Profil';

// STACK NAVIGATOR =============================>
import CreateGroup from './screens/CreateGroup';
import Welcome from './screens/Welcome';
import List from './screens/List';
import recipe from './reducers/recipeInfo';
import Recipe from './screens/Recipe';
import GlobalList from './screens/GlobalList';
import RecipeHome from './screens/components/recipeHome';
import MesGroupes from './screens/MesGroupes'; 
import MesGroupesP12 from './screens/MesGroupesP12';



// import OverlayCheck from './screens/overlayCheckIngredient'
import token from './reducers/token'
import checkList from './reducers/checkList';
import nameGroup from './reducers/nameGroup';
import tokenGroup from './reducers/tokenGroup';
import recipeList from './reducers/recipeList';
import ingredientList from './reducers/ingredientList';
import listInfo from './reducers/listInfo';
import list from './reducers/shoppinglist';

import BottomTabBar from "react-navigation-selective-tab-bar";

const store = createStore(combineReducers({recipe, nameGroup,tokenGroup, token, recipeList, checkList, ingredientList, listInfo, list}));


var BottomNavigator = createBottomTabNavigator({
  Favorite: { screen : Favorite},
  Group: { screen : Group},
  Home: { screen : homePage},
  Profil: { screen : Profil},
  List : {screen : List},
  MesGroupes: { screen : MesGroupes},
  MesGroupesP12: { screen :MesGroupesP12},
  Recipe :{screen : Recipe},
  GlobalList: {screen : GlobalList},

},
// {
//   backBehavior: 'history', 
// }, 
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      var iconName;
      
      if (navigation.state.routeName == 'Favorite') {
        iconName = 'heart-o';
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
    activeTintColor: '#5d5c5c',
    inactiveTintColor: '#ece9e9',
    style: {
      backgroundColor: '#fbfafa',
    }
  }  
 
})

var StackNavigator = createStackNavigator({
  Welcome: Welcome,
  CreateGroup: CreateGroup,
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



