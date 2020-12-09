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

import { Button, ListItem } from "react-native-elements";

import { Ionicons } from "@expo/vector-icons";

export default function Profil({}) {
  const list = [
    {
      name: "Liste de Marseile ",
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
    <View style={{ backgroundColor: "#FFF2DF", width: "100%", height: "100%" }}>
      <View style={{ alignItems: "center", marginTop: 90 }}>
        <Text style={{ fontSize: 30 }}>Creer une liste</Text>

        {/* --------------BOUTON CREATION D'UNE LISTE DE FAVORI -----------------------------------------------*/}
        <Ionicons name="ios-add-circle-outline" size={134} color="black" />
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
