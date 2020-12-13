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
import { Avatar, Button, Header } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {connect} from 'react-redux';







function Profil({navigation,token}) {


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




  var gluten = { width: 100, height: 100 };
  var vegeta = { width: 100, height: 100 };
  var lactose = { width: 100, height: 100 };
  var vega = { width: 100, height: 100 };



  if (glutenFree) {
    gluten = {
      backgroundColor: "#ADE498",
      width: 100,
      height: 100,
      borderRadius: 400,
      borderColor: "black",
    };
  }
  if (vegetarian) {
    vegeta = {
      backgroundColor: "#ADE498",
      width: 100,
      height: 100,
      borderRadius: 400,
      borderColor: "black",
    };
  }
  if (lactoseFree) {
    lactose = {
      backgroundColor: "#ADE498",
      width: 100,
      height: 100,
      borderRadius: 400,
      borderColor: "black",
    };
  }
  if (vegan) {
    vega = {
      backgroundColor: "#ADE498",
      width: 100,
      height: 100,
      borderRadius: 400,
      borderColor: "black",
    };
  }



  /* Update user */
  var updateUser = async () => {
    
    var userRegisters = await fetch("http://172.17.1.53:3000/userUpdate",{
      method:'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body:`token=${token}&usernameFromFront=${userName}&emailFromFront=${email}&passwordFromFront=${password}`
  })
    var response = await userRegisters.json();
    console.log(response);
  }

  return (

    
    <View style={{flex:1, backgroundColor: "#e5f8f8" }}>

      <Header
        containerStyle={{ backgroundColor: '#7FDBDA', height: 90, paddingTop: 50 }}
        leftComponent={<AntDesign name="leftcircleo" size={24} color="white" />}
        centerComponent={{ text: 'PROFIL', style: { color: '#fff', fontFamily: 'Kohinoor Telugu' } }}
        rightComponent={<Fontisto name="shopping-basket" size={24} color="white" onPress={() => { navigation.navigate('List') }} />}
      />
    <ScrollView>
      {/* --------------BOUTON D'AJOUT DE PHOTO " AVATAR " -----------------------*/}
      <View >
        <AntDesign style={{ marginTop: 65, marginLeft: 165, borderColor: "white" }} name="adduser" size={80} color="black" />


        <Avatar size="large"
          title="user"
          rounded

          onPress={() => console.log("Works!")}
          activeOpacity={0.5}
          containerStyle={{ marginLeft: 165, backgroundColor: "black" }}
        />


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
         
         title = " Valider "
         color = " # 841584 "
         buttonStyle={{ borderColor: 'white', justifyContent: 'center' }}
         titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingTop: 30 }}
         onPress = {() => updateUser()}
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