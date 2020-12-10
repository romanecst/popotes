import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  borderColor,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";

import { Button, ListItem, Header } from "react-native-elements";

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default function Profil({ navigation }) {
  const list = [
    {
      name: "Liste de Marseille ",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    },

    {
      name: "Soirée chez Gilbert  ",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    },
    {
      name: "Soirée chez Gilbert  ",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    },
    {
      name: "Soirée chez Gilbert  ",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    },
    {
      name: "Soirée chez Gilbert  ",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    },
  ];

  return (
    <View style={{flex:1, backgroundColor: "#FFF2DF" }}>

      <Header
        containerStyle={{ backgroundColor: '#febf63', height: 90, paddingTop: 50 }}
        leftComponent={<AntDesign name="leftcircleo" size={24} color="white"  />}
        centerComponent={{ text: 'LIST', style: { color: '#fff', fontFamily: 'Kohinoor Telugu' } }}
        rightComponent={<Fontisto name="shopping-basket" size={24} color="white" onPress={() => { navigation.navigate('List') }} />}
      />

      <View style={{ alignItems: "center", marginTop: 90 }}>
        <Text style={{ fontSize: 30 }}>Creer une liste</Text>

        {/* --------------BOUTON CREATION D'UNE LISTE DE FAVORI -----------------------------------------------*/}
        <Ionicons name="ios-add-circle-outline" size={134} color="black"/>
      </View>
      <Text
        style={{
          alignItems: "center",
          marginLeft: 80,
          marginTop: 40,
          fontSize: 20,
        }}
      >
        Mes Listes mes listes de course{" "}
      </Text>

      {/* ---------------------------LISTE EXISTANTE FAVORITE------------------------------------------  */}
      <ScrollView
        style={{
          marginBottom: 10,
          marginTop: 70,
          backgroundColor: "#FFF2DF",
          paddingLeft: 5,
          paddingRight: 5,
        }}
      >
        {list.map((l, i) => (
          <TouchableOpacity
          onPress={() => { navigation.navigate('GlobalList') }}>
          <ListItem
            key={i}
            bottomDivider
            style={{
              borderRadius: 90,
              marginLeft: 30,
              marginRight: 30,
              marginBottom: 10,
              top: 20,
            }}
          >
            <ListItem.Content style={{ flex: 1 }}>
              <View style={{ marginLeft: 300, top: 20 }}>
                <Ionicons name="ios-trash" size={24} color="black" />
              </View>

              <ListItem.Title> {l.name}</ListItem.Title>
              <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
