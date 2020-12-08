import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {Header} from 'react-native-elements';

import { Ionicons } from '@expo/vector-icons';

var colorHeader;
export default function homePage({navigation}) {
    return (
        <View >
             {/* <Header
      leftComponent={{ icon: 'menu', color: '#fff' }}
      centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
      rightComponent={{ icon: 'home', color: '#fff' }}
      containerStyle={{
          backgroundColor: "red"
      }} */}
    {/* /> */}
            <Text>Je suis sur la page HomePage</Text>
            
      </View>
    );
  

}