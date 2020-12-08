import React from 'react';
import { StyleSheet, Text, View, Stack, Button} from 'react-native';
import { Header } from 'react-native-elements';


import {createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import { FontAwesome } from '@expo/vector-icons';

import Welcome from './screens/Welcome';
import CreateGroup from './screens/CreateGroup';
import homePage from './screens/homePage';
import Map from './screens/Map';
import Favorite from './screens/Favorite';
import Profil from './screens/Profil';
import GlobalGroup from './screens/GlobalGroup';
import List from './screens/List';



var BottomNavigator = createBottomTabNavigator({
  Favorite: Favorite,
  GlobalGroup: GlobalGroup,
  Home: homePage,
  Map: Map,
  Profil: Profil,
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
      } else if (navigation.state.routeName == 'GlobalGroup') {
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
  Retour: BottomNavigator,
  
},
{headerMode:"none"}
);

var Navigation = createAppContainer(StackNavigator);


 export default function App() {
  return (
    
   
   <Navigation/>
   
  );
}



