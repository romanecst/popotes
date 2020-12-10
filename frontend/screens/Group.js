import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { Icon } from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";

export default function Group() {
  return (
    <View style={{ backgroundColor: "#ADE498", width: "100%", height: "100%" }}>
      <View style={{ marginTop: 100 }}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Kohinoor Telugu",
              fontSize: 25,
            }}
          >
            {/* -------------------------CREATION DE NOUVEAU GROUPE ---------------------------------- */}
            Creer un Groupe
          </Text>
          <Ionicons name="ios-add-circle-outline" size={154} color="black" />
        </View>

        <Text
          style={{
            textAlign: "center",
            fontFamily: "Kohinoor Telugu",
            fontSize: 21,
          }}
        >
          {/* ----------------------------Rejoindre un groupe grace au mots de pass------------------ */}
          Rejoindre un groupe existant{" "}
        </Text>

        <Input
          style={{
            textAlign: "center",
            backgroundColor: "white",
            marginTop: 10,
            borderRadius: 80,
            marginLeft: 50,
            marginRight: 50,
          }}
          placeholder="passwords for your party"
        />

        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            marginBottom: 13,
            fontFamily: "Kohinoor Telugu",
          }}
        >
          {/* -------------------Acces à mes groupe precedent ----------------------- */}
          Mes Groupes{" "}
        </Text>

        <ScrollView>
          <View
            style={{ textAlign: "center", marginLeft: 50, marginRight: 50 }}
          >
            <Button
              iconRight={true}
              title="Soirée chez Gilbert "
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
          </View>

          <View
            style={{ textAlign: "center", marginLeft: 50, marginRight: 50 }}
          >
            <Button
              iconRight={true}
              title="Nouvel An Chinois"
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
          </View>



          <View
            style={{ textAlign: "center", marginLeft: 50, marginRight: 50 }}
          >
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
          </View>





        </ScrollView>
      </View>
    </View>
  );
}
