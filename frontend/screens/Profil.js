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


useEffect(() => {

  const Preferences = async()=>{
      var preferences = ['gluten free','vegetarian','lactose free','vegan'];
      var ifTrue = false;
      for (let i = 0; i<preferences.length; i++){
          await AsyncStorage.getItem(preferences[i], 
          function(error, data){
          if(data === 'true'){
              ifTrue = true;
              if(preferences[i]==='gluten free'){
                  setGlutenFree(true);
              }else if(preferences[i]==='vegetarian'){
                  setVegetarian(true);
              }else if(preferences[i]==='lactose free'){
                  setLactoseFree(true);
              }else{
                  setVegan(true);
              }
          }
          })
      };
      if(ifTrue){
          setPref(true);
      }else{
          var rawReponse = await fetch('http://192.168.1.18:3000/find');
          var response= await rawReponse.json();
          setListRecipe(response);
      }
  };

  Preferences();
  
      
}, []);

  /* Update user */
  var updateUser = async () => {

    var userRegisters = await fetch("http://172.17.1.53:3000/userUpdate", {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `token=${token}&usernameFromFront=${userName}&emailFromFront=${email}&passwordFromFront=${password}`
    })
    var response = await userRegisters.json();
    console.log(response);
  }

  return (


    <View style={{ flex: 1, backgroundColor: "#e5f8f8" }}>

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
            style={{ backgroundColor: 'black', borderRadius: 100, padding: 2, marginTop: 15 }}

          >

            <Avatar
              size="xlarge"
              rounded icon={{ name: 'add-a-photo', size: 65, color: 'black' }}
              containerStyle={{ backgroundColor: "white" }}
            />
          </TouchableOpacity>


        </View>


        {/* --------------------CHAMPS FORMULAIRE ------------------------------------ */}
        <TextInput
          style={{ borderRadius: 20, marginTop: 40, marginLeft: 30, marginRight: 30, height: 50, borderColor: "white", borderWidth: 1, backgroundColor: "white" }}
          placeholder=" Name"
          onChangeText={(text) => setUserName(text)}
          value={userName}
        />

        <TextInput
          style={{ borderRadius: 20, marginBottom: 20, marginTop: 20, marginLeft: 30, marginRight: 30, height: 50, borderColor: "white", borderWidth: 1, backgroundColor: "white" }}
          placeholder=" email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        <TextInput
          style={{ borderRadius: 20, marginTop: 20, marginLeft: 30, marginRight: 30, height: 50, borderColor: "white", borderWidth: 1, backgroundColor: "white" }}
          placeholder=" Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />

        <Text
          h2
          style={{
            marginTop: 10,
            color: "#FFFF",
            fontFamily: "Kohinoor Telugu",
          }}
        />
        <Text style={{ marginLeft: 45, fontSize: 30, color: "black" }} >Mes preferences alimentaire ? </Text>


        {/* ---------------------------CHOIX DES PREFERENCE ALIMENTAIRE --------------------------- */}
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

          title=" Valider "
          color=" # 841584 "
          buttonStyle={{ borderColor: 'white', justifyContent: 'center' }}
          titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingTop: 30 }}
          onPress={() => updateUser()}
        />
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
  }, taille: {

  }
});

function mapStateToProps(state) {
  return { token: state.token }
}

export default connect(
  mapStateToProps,
  null
)(Profil);