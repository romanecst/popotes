import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Input, Button, Avatar, Accessory } from "react-native-elements";
import { TextInput } from "react-native";
import { Icon } from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";

export default function MesGroupes() {
  const [searchGroupe, setSearchGroupe] = useState("Chercher un Groupe");

  return (
    <View style={{ backgroundColor: "#ADE498" }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-betwen",
          marginTop: 120,
        }}
      >
        <View>
          <Avatar
            rounded
            size={130}
            source={{
              uri:
                "https://geeko.lesoir.be/wp-content/uploads/sites/58/2020/05/avatar.jpg",
              justifyContent: "space-between",
            }}
          />
        </View>
        <View>
          <TextInput
            style={{
              height: 50,
              
              
              backgroundColor: "white",
              borderRadius: 15,
              textAlign: "center",
              width: 250,
              alignItems: "center",
              marginTop: 40,
              fontFamily: "Kohinoor Telugu",
            }}
            onChangeText={(text) => setSearchGroupe(text)}
            value={searchGroupe}
          />
        </View>
        <Button
          style={{ marginTop: 30, width: 130, fontFamily: "Kohinoor Telugu"}}
          title="Liste"
        />
        <Text
          style={{ marginTop: 20, fontSize: 25, fontFamily: "Kohinoor Telugu" }}
        >
          Participants :
        </Text>

        <ScrollView>
          <Button
            iconRight={true}
            title="Soirée du 16 octobre "
            buttonStyle={{ backgroundColor: "white" }}
            containerStyle={{
              borderRadius: 45,
              marginTop: 10,
              marginBottom: 10,
            }}
            titleStyle={{ color: "black", fontFamily: "Kohinoor Telugu" }}
            icon={
              <View style={{ marginLeft: 140 }}>
                <Ionicons name="ios-trash" size={30} color="black" />
              </View>
            }
          />

          <Button
            iconRight={true}
            title="Noel chez Monique "
            buttonStyle={{ backgroundColor: "white" }}
            containerStyle={{
              borderRadius: 45,
              marginTop: 10,
              marginBottom: 10,
            }}
            titleStyle={{ color: "black", fontFamily: "Kohinoor Telugu" }}
            icon={
              <View style={{ marginLeft: 140 }}>
                <Ionicons name="ios-trash" size={30} color="black" />
              </View>
            }
          />

          <Button
            iconRight={true}
            title="Soirée chez Albert "
            buttonStyle={{ backgroundColor: "white" }}
            containerStyle={{
              borderRadius: 45,
              marginTop: 10,
              marginBottom: 10,
            }}
            titleStyle={{ color: "black", fontFamily: "Kohinoor Telugu" }}
            icon={
              <View style={{ marginLeft: 140 }}>
                <Ionicons name="ios-trash" size={30} color="black" />
              </View>
            }
          />
        </ScrollView>

        <Ionicons
          style={{ marginTop: 15, marginBottom: 35 }}
          name="ios-add-circle-outline"
          size={114}
          color="black"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});
