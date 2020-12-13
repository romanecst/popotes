import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text, Image, borderColor, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import { Button, ListItem, Header } from "react-native-elements";

import { Ionicons, AntDesign, Fontisto, Entypo } from "@expo/vector-icons";


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
    <View style={{ flex: 1, backgroundColor: "#FFF2DF" }}>

      <Header
        containerStyle={{ backgroundColor: '#febf63', height: 90, paddingTop: 50 }}
        leftComponent={<AntDesign name="leftcircleo" size={24} color="white" />}
        centerComponent={{ text: 'LIST', style: { color: '#fff', fontFamily: 'Kohinoor Telugu' } }}
        rightComponent={<Fontisto name="shopping-basket" size={24} color="white" onPress={() => { navigation.navigate('List') }} />}
      />


      {/* ---------------------------LISTE EXISTANTE FAVORITE------------------------------------------  */}

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>

        <Text style={{ marginTop: 50, fontSize: 20, fontFamily: "Kohinoor Telugu" }}>My shop list</Text>

        <ScrollView style={styles.scroll}>

          {list.map((l, i) => (
            <TouchableOpacity onPress={() => { navigation.navigate('GlobalList') }} >
              <View style={styles.blocScroll}>
                <Text> {l.name}</Text>
                <Text>{l.subtitle}</Text>


                <Button icon={<Entypo name="cross" size={24} color="black" />} buttonStyle={{ backgroundColor: '#FFFFFF', padding:18, borderRadius:50}}>
                </Button>
              </View>

            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* --------------BOUTON CREATION D'UNE LISTE DE FAVORI -----------------------------------------------*/}

      <View style={{ alignItems: "center", justifyContent: 'center', marginTop: 15 }}>


        <Text style={{ fontSize: 20, fontFamily: "Kohinoor Telugu" }}>Creat a liste</Text>
        <Button
          icon={<Ionicons name="ios-add-circle-outline" size={60} color="black" />}
          buttonStyle={{ backgroundColor: '#FFF2DF' }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, scroll: {
    marginBottom: 50,
    marginTop: 20,
    backgroundColor: "#FFF2DF",
    width: 300,
    height: 300,
  }, blocScroll: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  
    justifyContent:'space-between'
  }
});
