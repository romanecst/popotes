import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, View, Text, Image, BorderColor, TouchableOpacity, ImageBackground, ScrollView, AsyncStorage } from "react-native";
import { Avatar, Button, Header, Accessory, ListItem, Overlay, Input } from "react-native-elements";
import { AntDesign, Fontisto, Entypo } from "@expo/vector-icons";
import { connect } from 'react-redux';

import { baseURL } from '../screens/components/adressIP'
import Sign from './Sign';

import * as ImagePicker from "expo-image-picker";

function Profil(props) {

  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [glutenFree, setGlutenFree] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);
  const [lactoseFree, setLactoseFree] = useState(false);
  const [vegan, setVegan] = useState(false);
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [sign, setSign] = useState(false);


//if user is connected request user deteils from back
var getUserProfil = () => {
  AsyncStorage.getItem("user token",
    async function (error, data) {
      if (data) {
        props.addToken(data);
        const responseUser = await fetch(`${baseURL}/userProfil`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `token=${data}`
        })

        const responseJson = await responseUser.json()
        setEmail(responseJson.email)
        setUserName(responseJson.username)

      } else {
        setSign(true);
      }
    })
}

  useEffect(() => {

//permission to access picture library to add an avatar
    var permission = async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        } else {
          setHasPermission(true);
        }
      }
    }

    //get dietary prefetrences from async storage
    var pref = async () => {
      var preferences = ['gluten free', 'vegetarian', 'lactose free', 'vegan'];

      for (let i = 0; i < preferences.length; i++) {
        await AsyncStorage.getItem(preferences[i],
          function (error, data) {
            if (data === 'true') {

              if (preferences[i] === 'gluten free') {
                setGlutenFree(true);
              } else if (preferences[i] === 'vegetarian') {
                setVegetarian(true);
              } else if (preferences[i] === 'lactose free') {
                setLactoseFree(true);
              } else {
                setVegan(true);
              }

            }
          })

      }
    }
    getUserProfil()
    permission()
    pref()
  }, []);

if(props.token && sign){
 getUserProfil();
 setSign(false);
}

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


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

  // change preferences in LOCAL STORAGE ================>
  function favoriteAlim(diet) {
    AsyncStorage.getItem(diet, function (error, data) {
      if (data === null || data === 'false') {
        AsyncStorage.setItem(diet, 'true')
      } else if (data === true) {
        AsyncStorage.removeItem(diet)
      } else {
        AsyncStorage.setItem(diet, 'false')
      }
    })
  };


  /* send Updated user info to be stored in database */
  var updateUser = async () => {

    var userRegisters = await fetch(`${baseURL}/userUpdate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `token=${props.token}&usernameFromFront=${userName}&emailFromFront=${email}&passwordFromFront=${password}`
    })
    var response = await userRegisters.json();
  }

  return (


    <View style={{ flex: 1, backgroundColor: "#e5f8f8" }}>
      {/* --------------HEADER -----------------------*/}

      <Header
        containerStyle={{ backgroundColor: '#7FDBDA', height: 90, paddingTop: 50 }}
        centerComponent={{ text: 'PROFIL', style: { color: '#fff', fontFamily: 'Kohinoor Telugu', fontSize: 22 } }}
        rightComponent={<Fontisto name="shopping-basket" size={24} color="white" onPress={() => { props.navigation.navigate('List') }} />}
      />

      <ScrollView>
        {/* --------------BOUTON D'AJOUT DE PHOTO " AVATAR " -----------------------*/}
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>

        {sign && <Sign/>}

          <TouchableOpacity
            onPress={pickImage}
            activeOpacity={0.3}
            style={{ backgroundColor: 'black', borderRadius: 100, marginTop: 15, borderWidth: 1, marginBottom: 20 }}
          >
            {image ?
              <Image
                source={{ uri: image }}
                style={{ width: 130, height: 130, borderRadius: 60 }}
                containerStyle={{ borderRadius: 200 }}

              />
              :

              <Avatar
                size={130}
                rounded icon={{
                  name: 'add-a-photo', size: 60, color: 'black',
                }}
                containerStyle={{ backgroundColor: "white" }}
              />
            }
          </TouchableOpacity>

          {/* --------------------CHAMPS FORMULAIRE ------------------------------------ */}
          <Text style={{ fontSize: 20, color: "black", fontFamily: 'Kohinoor Telugu', marginBottom: 20 }} >Update user: </Text>

          <View>
            <Text style={{ fontFamily: "Kohinoor Telugu", fontSize: 12, paddingLeft: 15, marginBottom: 3 }}> Name :</Text>
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

            <Text style={{ fontFamily: "Kohinoor Telugu", fontSize: 12, paddingLeft: 15, marginBottom: 3 }}>New Password :</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.text}
              placeholder="Write your password"
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
          </View >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <Button
              title="Update"
              buttonStyle={{ backgroundColor: '#7FDBDA', borderRadius: 30, marginRight: 12 }}
              titleStyle={{ color: 'white', fontFamily: 'Kohinoor Telugu', paddingHorizontal: 8 }}
              onPress={() => updateUser()}
            />
            <Button
              title="Disconnect"
              buttonStyle={{ backgroundColor: '#7FDBDA', borderRadius: 30 }}
              titleStyle={{ color: 'white', fontFamily: 'Kohinoor Telugu', paddingHorizontal: 8 }}
              onPress={() =>{
                 AsyncStorage.setItem('user token', '');
                 props.addToken('');
                 setUserName('');
                 setEmail('');
                 setPassword('');
                }}
            />
          </View>

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
            onPress={() => { props.navigation.navigate('Profil'); updateUser() }}

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
  },
  overlay: {
    width: 290,
    margin: 18,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 20,
    height: 60,
    marginBottom: 20
  },
});

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: 'addToken', token: token })
    }
  }
}




function mapStateToProps(state) {
  return { token: state.token }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profil);
