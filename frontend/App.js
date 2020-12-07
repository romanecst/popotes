import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import { FontAwesome } from '@expo/vector-icons';

import page1 from './screens/page1';
import page2 from './screens/page2';
import page3 from './screens/page3';
import page8 from './screens/page8';
import page6 from './screens/page6';
import page10 from './screens/page10';
import page12 from './screens/page12';


var BottomNavigator = createBottomTabNavigator({
  Favorite: page6,
  RecapGroup: page12,
  Home: page3,
  Map: page8,
  Profil: page10
},
// {
//   backBehavior: 'history', 
// }, 
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      var iconName;
      var biblio;
      if (navigation.state.routeName == 'Favorite') {
        iconName = 'heart-o';
      } else if (navigation.state.routeName == 'RecapGroup') {
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
    activeTintColor: '#009788',
    inactiveTintColor: '#FFFFFF',
    style: {
      backgroundColor: '#111224',
    }
  }  
 

})

var StackNavigator = createStackNavigator({
  Welcome: page1,
  Group: page2,
  Retour: BottomNavigator
});


var Navigation = createAppContainer(StackNavigator);

 export default function App() {
  return (
   <Navigation/>
  );
}



