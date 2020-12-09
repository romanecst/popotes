import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {ListItem, Header } from "react-native-elements";

import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


import { Ionicons } from '@expo/vector-icons';


export default function Map({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: '#FFF2DF' }}>

            <Header
                containerStyle={{ backgroundColor: '#febf63', height: 90, paddingTop: 50 }}
                leftComponent={<AntDesign name="leftcircleo" size={24} color="white" />}
                centerComponent={{ text: 'LIST', style: { color: '#fff', fontFamily: 'Kohinoor Telugu' } }}
                rightComponent={<Fontisto name="shopping-basket" size={24} color="white" onPress={() => { navigation.navigate('List') }} />}
            />

            <View>
            <Text>Je suis sur la page Global List</Text>
            </View>

        </View>
    );


}