import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, View, Text, Image, BorderColor, TouchableOpacity, ImageBackground, ScrollView, AsyncStorage } from "react-native";
import { Avatar, Button, Header, Accessory, ListItem, Overlay, Input } from "react-native-elements";
import { AntDesign, Fontisto, Entypo } from "@expo/vector-icons";
import { connect } from 'react-redux';
import Signin from "./Signin";
import { baseURL } from '../screens/components/adressIP'


import * as ImagePicker from "expo-image-picker";

function Profil(props) {

  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);

  const [visible, setVisible] = useState(false);
  const [glutenFree, setGlutenFree] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);
  const [lactoseFree, setLactoseFree] = useState(false);
  const [vegan, setVegan] = useState(false);


  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  const [listErrorsSignin, setErrorsSignin] = useState([])

  const [visibleSignin, setVisibleSignin] = useState(false);
  const [visibleSignup, setVisibleSignup] = useState(false);

  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [reload, setReload] = useState(false);

  const [listErrorSignUp, setListErrorSignUp] = useState([]);

  const toggleSignin = () => {
    setVisibleSignin(!visibleSignin);
  }

  const toggleSignup = () => {
    setVisibleSignup(!visibleSignup);
  }

  useEffect(() => {

    var getUserProfil = () => {
      console.log("tesssst")
      AsyncStorage.getItem("user token",
        async function (error, data) {
          console.log(`DATA`, data);
          if (data) {
            props.addToken(data);
            const responseUser = await fetch(`${baseURL}/userProfil`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: `token=${data}`
            })

            const responseJson = await responseUser.json()
            console.log("test", responseJson);
            setEmail(responseJson.email)
            setPassword(responseJson.password)
            setUserName(responseJson.username)

          } else {
            setVisibleSignup(true);
          }
        })
    }

    var permission = async () => {
      console.log("perm", permission);
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

    var pref = async () => {
      var preferences = ['gluten free', 'vegetarian', 'lactose free', 'vegan'];

      for (let i = 0; i < preferences.length; i++) {
        console.log("pref", preferences[i]);
        await AsyncStorage.getItem(preferences[i],
          function (error, data) {
            console.log('hello', data)
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
    setReload(false)
  }, [reload]);

  var handleSubmitSignin = async () => {

    const data = await fetch(`${baseURL}/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`
    })

    const body = await data.json()

    if (body.result == true) {

      console.log(body.token);
      props.addToken(body.token);


      AsyncStorage.setItem("user token", body.token);
      toggleSignin();

    } else {
      setErrorsSignin(body.error)
    }
    setReload(true);
  }

  var tabErrorsSignin = listErrorsSignin.map((error, i) => {
    return (<Text>{error}</Text>)
  })

  var handleSubmitSignUp = async () => {

    const data = await fetch(`${baseURL}/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`
    })

    const body = await data.json()
    if (body.result == true) {
      props.addToken(body.token);
      AsyncStorage.setItem("user token", body.token);
      toggleSignup();


    } else {
      setListErrorSignUp(body.error)
    }
    setReload(true);
  }

  var tabErrorsSignup = listErrorSignUp.map((error, i) => {
    return (<Text>{error}</Text>)
  })

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("essai permission result", result);
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

  // LOCAL STORAGE ================>
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
    setReload(true)
  };


  /* Update user */
  var updateUser = async () => {

    var userRegisters = await fetch(`${baseURL}/userUpdate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `token=${props.token}&usernameFromFront=${userName}&emailFromFront=${email}&passwordFromFront=${password}`
    })
    var response = await userRegisters.json();
    console.log(response);
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
            <Text style={{ fontFamily: "Kohinoor Telugu", fontSize: 12, paddingLeft: 15, marginBottom: 3 }}> New Name :</Text>
            <TextInput
              style={styles.text}
              placeholder="Write your Name..."
              onChangeText={(text) => setUserName(text)}
              value={userName}
            />

            <Text style={{ fontFamily: "Kohinoor Telugu", fontSize: 12, paddingLeft: 15, marginBottom: 3 }}>New Email :</Text>
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
              title="Disconnection"
              buttonStyle={{ backgroundColor: '#7FDBDA', borderRadius: 30 }}
              titleStyle={{ color: 'white', fontFamily: 'Kohinoor Telugu', paddingHorizontal: 8 }}
              onPress={() => AsyncStorage.setItem('user token', '')}
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

      {/* -------------------------OVERLAY ----- SIGN IN/UP ---------------------------------- */}


      <Overlay overlayStyle={{ backgroundColor: '#dfe6e9', borderRadius: 50, }} isVisible={visibleSignin} >

        <View style={styles.overlay}>
          <Button
            title="Return"
            type="clear"
            onPress={() => { props.navigation.goBack(null); toggleSignup() }}
            buttonStyle={{ borderColor: "#dfe6e9", justifyContent: "flex-start" }}
            titleStyle={{
              color: "black",
              fontFamily: "Kohinoor Telugu",
              fontSize: 11,
              marginRight: 35,
            }}
          />
          <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 25, marginLeft: 100, marginBottom: 20 }}>Sign-in</Text>

          <Input
            containerStyle={styles.input}
            placeholder='Email'
            leftIcon={{ type: 'font-awesome', name: 'at' }}
            onChangeText={(val) => setSignInEmail(val)}
            val={signInEmail}
            inputContainerStyle={{ borderBottomWidth: 0 }}
          />
          <Input
            containerStyle={styles.input}
            secureTextEntry={true}
            placeholder='Password'
            leftIcon={{ type: 'font-awesome', name: 'unlock' }}
            onChangeText={(val) => setSignInPassword(val)}
            val={signInPassword}
          />

          {tabErrorsSignin}


          <Button
            title="Sign-in"
            buttonStyle={{ backgroundColor: '#7FDBDA', borderRadius: 30, marginHorizontal: 80, marginBottom: 50 }}
            titleStyle={{ color: 'white', fontFamily: 'Kohinoor Telugu', marginHorizontal: 20 }}
            onPress={() => handleSubmitSignin()}
          />

          <TouchableOpacity onPress={() => { toggleSignup(); toggleSignin(); }}><Text style={{ marginTop: 10, fontStyle: 'italic' }}>Not registered yet ? <Text style={{ color: "#35abd5", textDecorationLine: 'underline' }}>Create an account</Text></Text>




          </TouchableOpacity>
        </View>
      </Overlay>


      <Overlay overlayStyle={{ backgroundColor: '#dfe6e9', borderRadius: 50, }} isVisible={visibleSignup} >

        <View style={styles.overlay}>
          <Button
            title="Return"
            type="clear"
            onPress={() => { props.navigation.goBack(null); toggleSignup() }}
            buttonStyle={{ borderColor: "#dfe6e9", justifyContent: "flex-start" }}
            titleStyle={{
              color: "black",
              fontFamily: "Kohinoor Telugu",
              fontSize: 11,
              marginRight: 35,
            }}
          />
          <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 25, marginLeft: 100, marginBottom: 40 }}>Sign-up</Text>

          <Input
            containerStyle={styles.input}
            placeholder='Username'
            leftIcon={{ type: 'font-awesome', name: 'user' }}
            onChangeText={(val) => setSignUpUsername(val)}
            val={signUpUsername}
            inputContainerStyle={{ borderBottomWidth: 0 }}
          />
          <Input
            containerStyle={styles.input}
            placeholder='Email'
            leftIcon={{ type: 'font-awesome', name: 'at' }}
            onChangeText={(val) => setSignUpEmail(val)}
            val={signUpEmail}
            inputContainerStyle={{ borderBottomWidth: 0 }}
          />
          <Input
            secureTextEntry={true}
            containerStyle={styles.input}
            placeholder='Password'
            leftIcon={{ type: 'font-awesome', name: 'unlock' }}
            onChangeText={(val) => setSignUpPassword(val)}
            val={signUpPassword}
            inputContainerStyle={{ borderBottomWidth: 0 }}
          />

          {tabErrorsSignup}

          <Button
            title="Sign-Up"
            buttonStyle={{ backgroundColor: '#7FDBDA', borderRadius: 30, marginHorizontal: 70 }}
            titleStyle={{ color: 'white', fontFamily: 'Kohinoor Telugu', marginHorizontal: 20 }}
            onPress={() => { handleSubmitSignUp() }}
          />
          <TouchableOpacity onPress={() => { toggleSignin(); toggleSignup(); }}><Text style={{ marginTop: 50, fontStyle: 'italic' }}>Already have an account ? <Text style={{ color: "#35abd5", textDecorationLine: 'underline' }}>Log in</Text></Text></TouchableOpacity>
        </View>
      </Overlay>


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
