import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, View, Text, Image, BorderColor, TouchableOpacity, ImageBackground, ScrollView, AsyncStorage } from "react-native";
import { Avatar, Button, Header, Accessory, ListItem } from "react-native-elements";
import { AntDesign, Fontisto, Entypo } from "@expo/vector-icons";
import { connect } from 'react-redux';

function Profil({ navigation, token }) {


  const [visible, setVisible] = useState(false);
  const [glutenFree, setGlutenFree] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);
  const [lactoseFree, setLactoseFree] = useState(false);
  const [vegan, setVegan] = useState(false);

  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  // COULEUR APRES SELECTION  ================>
  var iconUser = `<AntDesign name="adduser" size={24} color="black" />`;


  var gluten = { backgroundColor: '#FFFFFF', borderRadius: 400, width: 100, height: 100 };
  var vegeta = { backgroundColor: '#FFFFFF', borderRadius: 400, width: 100, height: 100 };
  var lactose = { backgroundColor: '#FFFFFF', borderRadius: 400, width: 100, height: 100 };
  var vega = { backgroundColor: '#FFFFFF', borderRadius: 400, width: 100, height: 100 };

  // CHOIX PREFERENCE =========================>
  if (glutenFree) {
    gluten = { backgroundColor: '#ADE498', width: 100, height: 100, borderRadius: 400, borderColor: 'black' }
  };
  if (vegetarian) {
    vegeta = { backgroundColor: '#ADE498', width: 100, height: 100, borderRadius: 400, borderColor: 'black' }
  };
  if (lactoseFree) {
    lactose = { backgroundColor: '#ADE498', width: 100, height: 100, borderRadius: 400, borderColor: 'black' }
  };
  if (vegan) {
    vega = { backgroundColor: '#ADE498', width: 100, height: 100, borderRadius: 400, borderColor: 'black' }
  };

  function favoriteAlim(diet) {
    AsyncStorage.getItem(diet, function (error, data) {
      if (data === null || data === 'false') {
        AsyncStorage.setItem(diet, 'true')
      } else {
        AsyncStorage.setItem(diet, 'false')
      }
    })
  };

  /* Update user */
  var updateUser = async () => {

<<<<<<< HEAD
    var userRegisters = await fetch("http://172.17.1.53:3000/userUpdate", {
=======
    var userRegisters = await fetch("http://172.17.1.71:3000/userUpdate", {
>>>>>>> c3604204aca3ad67a0f0b683bcdc43284c9e0c0d
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `token=${token}&usernameFromFront=${userName}&emailFromFront=${email}&passwordFromFront=${password}`
    })
    var response = await userRegisters.json();
    console.log(response);
  }

  return (


    <View style={{ flex: 1, backgroundColor: "#e5f8f8" }}>
      {/* --------------HEADER -----------------------*/}

      <Header
        containerStyle={{ backgroundColor: '#7FDBDA', height: 90, paddingTop: 50 }}
        leftComponent={<AntDesign name="leftcircleo" size={24} color="white" />}
        centerComponent={{ text: 'PROFIL', style: { color: '#fff', fontFamily: 'Kohinoor Telugu' } }}
        rightComponent={<Fontisto name="shopping-basket" size={24} color="white" onPress={() => { navigation.navigate('List') }} />}
      />

      <ScrollView>
        {/* --------------BOUTON D'AJOUT DE PHOTO " AVATAR " -----------------------*/}
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>

          <TouchableOpacity
            onPress={() => console.log("Works!")}
            activeOpacity={0.3}
            style={{ backgroundColor: 'black', borderRadius: 100, marginTop: 15, borderWidth: 1, marginBottom: 20 }}
          >

            <Avatar
              size={130}
              rounded icon={{
                name: 'add-a-photo', size: 65, color: 'black',
              }}
              containerStyle={{ backgroundColor: "white" }}
            />
          </TouchableOpacity>

          {/* --------------------CHAMPS FORMULAIRE ------------------------------------ */}
          <Text style={{ fontSize: 20, color: "black", fontFamily: 'Kohinoor Telugu', marginBottom: 20 }} >Sign-Up : </Text>

          <View>
            <Text style={{ fontFamily: "Kohinoor Telugu", fontSize: 12, paddingLeft: 15, marginBottom: 3 }}>Name :</Text>
            <TextInput
              style={styles.text}
              placeholder="Write your Name..."
              onChangeText={(text) => setUserName(text)}
              value={userName}
            />

            <Text style={{ fontFamily: "Kohinoor Telugu", fontSize: 12, paddingLeft: 15, marginBottom: 3 }}>Email :</Text>
            <TextInput
              style={styles.text}
              placeholder="Write your email..."
              onChangeText={(text) => setEmail(text)}
              value={email}
            />

            <Text style={{ fontFamily: "Kohinoor Telugu", fontSize: 12, paddingLeft: 15, marginBottom: 3 }}>Password :</Text>
            <TextInput
              style={styles.text}
              placeholder="Write your password"
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
          </View>

          <Button
            title="sign-up"
            buttonStyle={{ backgroundColor: '#7FDBDA', borderRadius: 30 }}
            titleStyle={{ color: 'white', fontFamily: 'Kohinoor Telugu', paddingHorizontal: 8 }}
          />

          {/* ---------------------------CHOIX DES PREFERENCE ALIMENTAIRE --------------------------- */}

          <Text style={{ fontSize: 20, color: "black", fontFamily: 'Kohinoor Telugu', marginTop: 20 }} >select your preferences :</Text>

          <View>
            <View style={styles.prefalim}>
              <TouchableOpacity
                style={styles.picto}
                activeOpacity={0.3}
                onPress={() => {
                  favoriteAlim("gluten free");
                  setGlutenFree(!glutenFree);
                }}
              >
                <Image style={gluten} source={require("../assets/noGluten.png")} />
                <Text style={{ fontFamily: "Kohinoor Telugu", fontSize: 11 }}>
                  Gluten free
            </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.picto}
                activeOpacity={0.3}
                onPress={() => {
                  favoriteAlim("vegetarian");
                  setVegetarian(!vegetarian);
                }}
              >
                <Image style={vegeta} source={require("../assets/noMeat.png")} />
                <Text style={{ fontFamily: "Kohinoor Telugu", fontSize: 11 }}>
                  Vegetarian
            </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.prefalim}>
              <TouchableOpacity
                style={styles.picto}
                activeOpacity={0.3}
                onPress={() => {
                  favoriteAlim("Lactose free");
                  setLactoseFree(!lactoseFree);
                }}
              >
                <Image style={lactose} source={require("../assets/noMilk.png")} />
                <Text style={{ fontFamily: "Kohinoor Telugu", fontSize: 11 }}>
                  Lactiose free
            </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.picto}
                activeOpacity={0.3}
                onPress={() => {
                  favoriteAlim("vegan");
                  setVegan(!vegan);
                }}
              >
                <Image style={vega} source={require("../assets/vegetalien.png")} />
                <Text style={{ fontFamily: "Kohinoor Telugu", fontSize: 11 }}>
                  Vegan
            </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Button
            title="validate"
            buttonStyle={{ backgroundColor: '#7FDBDA', borderRadius: 30 }}
            titleStyle={{ color: 'white', fontFamily: 'Kohinoor Telugu', paddingHorizontal: 8 }}
            onPress={() => { navigation.navigate('Profil'); updateUser() }}

          />
        </View>

      </ScrollView>
    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  }, overlay: {
    width: 290,
    margin: 18,
    justifyContent: 'center',
  }, prefalim: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  }, picto: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  }, text: {
    fontFamily: 'Kohinoor Telugu',
    width: 230,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 12,
    backgroundColor: "white"
  }
});

function mapStateToProps(state) {
  return { token: state.token }
}

export default connect(
  mapStateToProps,
  null
)(Profil);