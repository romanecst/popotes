import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet, TextInput, Image, Linking, AsyncStorage } from "react-native";
import { Input, Button, Overlay, Avatar, Header, Text } from "react-native-elements";
import { Icon } from "react-native-vector-icons/FontAwesome";
import { Ionicons, Entypo, AntDesign, Fontisto, MaterialIcons } from "@expo/vector-icons";
import { connect } from 'react-redux';


import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import Signin from './Signin';

import { baseURL } from '../screens/components/adressIP'


//displays different groups to which the user belongs
function Group(props) {

  const [visible, setVisible] = useState(false);
  const [val, setVal] = useState("");
  const [nameGroup, setNameGroup] = useState("");
  const [tokenGroup, setTokenGroup] = useState("");
  const [listErrorGroup, setListErrorGroup] = useState([]);

  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState("");

  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  const [listErrorsSignin, setErrorsSignin] = useState([])

  const [visibleSignin, setVisibleSignin] = useState(false);
  const [visibleSignup, setVisibleSignup] = useState(false);

  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');


  const [listErrorSignUp, setListErrorSignUp] = useState([]);
  const [groupList, setGroupList] = useState([]);

  const toggleSignin = () => {
    setVisibleSignin(!visibleSignin);
  }

  const toggleSignup = () => {
    setVisibleSignup(!visibleSignup);
  }

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
//if user is connected request user's group from backend
      const rawReponse = await fetch(`${baseURL}/getGroups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `token=${body.token}`
      })

      const response = await rawReponse.json()
      setGroupList(response);
      AsyncStorage.setItem("user token", body.token);
      toggleSignin();

    } else {
      setErrorsSignin(body.error)
    }
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
  }

  var tabErrorsSignup = listErrorSignUp.map((error, i) => {
    return (<Text>{error}</Text>)
  })


  



  useEffect(() => {
    (async () => {
      AsyncStorage.getItem("user token",
        async function (error, data) {
          if (data) {
            props.addToken(data);
            const rawReponse = await fetch(`${baseURL}/getGroups`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: `token=${data}`
            })

            const response = await rawReponse.json()
            setGroupList(response);
          } else {
            setVisibleSignup(true);
          }
        })
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
    })();
  }, []);

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

  function createGroup() {
    setVisible(!visible);
  }
  function back() {
    setVisible(false);
  }

  /* request backend to Create group in db and add current user's token */
  var saveGroup = async function save() {
    var rawResponse = await fetch(`${baseURL}/group`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `avatarGroupFromFront=${image}&nameGroupFromFront=${nameGroup}&userID=${props.token}`
    });
    var response = await rawResponse.json();
    console.log(response)
    var token = response.groupSave.group_token;
//save group token in redux
    if (response.result == true) {
      setTokenGroup(token);
      props.AddTokenGroup(token);
      setGroupList([...groupList, response.groupSave]);
      //if user shares to friends sen email
      const text =`Hello,${"\n"} I'm making the shopping list for our next party, join thegroup by connecting to :${"\n"}
       https://popotes/app/fr.${"\n"}
      Here is the access code to the group:${token}, please inform what you
      are bringing. ${"\n"}
      See you soon.`;
      createGroup();
      Linking.openURL(
        `mailto:?subject=${nameGroup}&body=${text}`
      );
    } else {
      setListErrorGroup(response.error);
    }
  };

  /* Deleted groupe from db */
  var handleClickDelete = async (tokenGroup) => {
    console.log("click détecté");
    var rawResponse = await fetch(`${baseURL}/deleteGroup`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `token=${tokenGroup}&userToken=${props.token}`
    });
    console.log("delete", rawResponse);
    var response = await rawResponse.json();
    setGroupList(response.returnGroup)
    console.log("test update", response);
  };
//display groups
  if (groupList.length == 0) {
    var groupe =
      <>
        <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 15, color: 'grey', marginTop: 50, marginLeft: 115 }}>No groups</Text>
        <Image
          style={{ width: 110, height: 110, marginLeft: 50, marginLeft: 90 }}
          source={require('../assets/nopeoples.png')} />
      </>

  } else {
    var groupe = groupList.map(function (el, i) {
      console.log("test el", el.group_token);
      return <TouchableOpacity key={i} onPress={() => { props.AddTokenGroup(el.group_token); props.navigation.navigate('MesGroupes') }} >
        <View style={styles.blocScroll}>
          <Text>{el.name}</Text>
          <Button
            onPress={() => handleClickDelete(el.group_token)}
            icon={<Entypo name="cross" size={24} color="black" />}
            buttonStyle={{
              backgroundColor: "#FFFFFF",
              padding: 18,
              borderRadius: 50,
            }}
          ></Button>
        </View>
      </TouchableOpacity>
    })
  }
//user enters the group token that was sent to them to joint the group
//add user token to this group in db
  async function SearchToken() {
    console.log('TOKEN',props.token,'VAL',val)
    var rawResponse = await fetch(`${baseURL}/addUserGroup`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `tokenGroup=${val}&token=${props.token}`
    });
    var response = await rawResponse.json();
    console.log("gorup update", response);
  }


  return (
    <View style={{ flex: 1, backgroundColor: "#e5f8f8" }}>
      {/* -------------------------HEADER---------------------------------- */}

      <Header
        containerStyle={{ backgroundColor: "#7FDBDA", height: 90, paddingTop: 50 }}
        centerComponent={{ text: 'GROUP', style: { color: '#fff', fontFamily: 'Kohinoor Telugu', fontSize: 22 } }}
        rightComponent={<Fontisto name="shopping-basket" size={24} color="white" onPress={() => { props.navigation.navigate('List') }} />}
      />

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        {/* ----------------------------Rejoindre un groupe grace au mots de pass------------------ */}

        <Text style={{ textAlign: "center", justifyContent: 'center', fontFamily: "Kohinoor Telugu", fontSize: 20, marginTop: 20, }}>Join a existing group :</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 50, justifyContent: 'flex-start' }}>
          <Input
            style={styles.text}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            placeholder="Passwords for your party"
            value={val}
            onChangeText={(value) => setVal(value)}

          />
          <Button
            title="Go !"
            buttonStyle={styles.bouton}
            titleStyle={{ color: 'white', fontFamily: 'Kohinoor Telugu' }}
            onPress={() => SearchToken()} />
        </View>

        {/* -------------------Acces à mes groupe precedent ----------------------- */}


        <Text style={{ marginTop: 20, fontSize: 20, fontFamily: "Kohinoor Telugu" }}>My group list</Text>

        <ScrollView style={styles.scroll}>

          {groupe}

        </ScrollView>

        {/* -------------------------CREATION DE NOUVEAU GROUPE ---------------------------------- */}

        <Text style={{ fontFamily: "Kohinoor Telugu", fontSize: 20, marginTop: 25, marginBottom: 8 }}>Create a group</Text>

        <Ionicons
          name="ios-add-circle-outline"
          size={60}
          color="black"
          onPress={() => {
            createGroup();
          }}
        />

        {/* -------------------------OVERLAY ----- NOUVEAU GROUPE ---------------------------------- */}

        <Overlay
          overlayStyle={{
            backgroundColor: "#dfe6e9",
            borderRadius: 30,
            width: 320,
          }}
          isVisible={visible}
          onBackdropPress={createGroup}
        >
          <View>
            <View
              style={{
                alignItems: "flex-start",
                flexDirection: "row",
                marginBottom: 30,
              }}
            >
              <Button
                title="Return"
                type="clear"
                onPress={() => {
                  back();
                }}
                buttonStyle={{
                  borderColor: "#dfe6e9",
                  justifyContent: "flex-end",
                }}
                titleStyle={{
                  color: "black",
                  fontFamily: "Kohinoor Telugu",
                  fontSize: 11,
                  marginRight: 35,
                }}
              />
              <Avatar
                activeOpacity={0.2}
                onPress={pickImage}
                rounded
                size={130}
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 130, height: 130, borderRadius: 60 }}
                    containerStyle={{ borderRadius: 200 }}
                  />
                ) : (
                    <MaterialIcons
                      name="add-a-photo"
                      size={30}
                      color="black"
                      style={{
                        marginLeft: 40,
                        marginTop: 10,
                        marginBottom: 15,
                        borderWidth: 2,
                        borderRadius: 27,
                        padding: 10,
                      }}
                    />
                  )}
              </Avatar>
            </View>

            <View style={{ alignItems: "center" }}>
              <Text style={{ fontFamily: "Kohinoor Telugu" }}>
                Choose the name of your group :
              </Text>
              <TextInput
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 30,
                  padding: 12,
                  width: 230,
                  marginTop: 10,
                  marginBottom: 50,
                  textAlign: "center",
                }}
                placeholder="Group Name"
                onChangeText={(value) => {
                  setNameGroup(value);

                }}
                value={nameGroup}
              />

              <Text style={{ marginBottom: 10, fontFamily: "Kohinoor Telugu" }}>
                Generate personal random color :
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 45,
                  padding: 5,
                  marginBottom: 50,
                }}
              >
                <Image
                  source={require("../assets/rainbow.jpg")}
                  style={{ borderRadius: 40, width: 50, height: 50 }}
                />
              </TouchableOpacity>

              <Text style={{ marginBottom: 10, fontFamily: "Kohinoor Telugu" }}>
                Invite your friends :
              </Text>
              <Button
                title="share the link"
                buttonStyle={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  paddingHorizontal: 18,
                  marginBottom: 60,
                  borderWidth: 2,
                  borderColor: "#7FDBDA",
                }}
                titleStyle={{ color: "#7FDBDA", fontFamily: "Kohinoor Telugu" }}
                onPress={() => {
                  props.checkNameGroup({ name: nameGroup, image: image });
                  saveGroup();
                  setNameGroup('');
                }}
              />

              <Button
                title="Go !"
                buttonStyle={{
                  backgroundColor: "#7FDBDA",
                  borderRadius: 30,
                  paddingHorizontal: 18,
                }}
                titleStyle={{ color: "white", fontFamily: "Kohinoor Telugu" }}
                onPress={() => {
                  console.log('IMAGEGEGEGEGEG', image);
                  props.checkNameGroup({ name: nameGroup, image: image });
                  saveGroup();
                }}
              />
            </View>
          </View>
        </Overlay>

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
              secureTextEntry={true}
              containerStyle={styles.input}
              placeholder='Password'
              leftIcon={{ type: 'font-awesome', name: 'unlock' }}
              onChangeText={(val) => setSignInPassword(val)}
              val={signInPassword}
              inputContainerStyle={{ borderBottomWidth: 0 }}
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
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    marginTop: 10,
    backgroundColor: "#e5f8f8",
    width: 300,
    height: 280,
  },
  blocScroll: {
    backgroundColor: "white",
    flexDirection: "row",
    marginBottom: 15,
    paddingLeft: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    justifyContent: "space-between",
  },
  text: {
    backgroundColor: "white",
    paddingLeft: 12,
    marginTop: 10,
    borderRadius: 10,
    fontSize: 14,
    padding: 20,
  },
  overlay: {
    width: 290,
    margin: 18,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: "white",
    borderRadius: 20,
    height: 60,
    marginBottom: 20,
    alignItems: 'center',
  }, bouton: {
    borderColor: 'white',
    backgroundColor: "#7FDBDA",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 40,
    padding: 14,
    marginBottom: 13,
    marginRight: 7
  },
});

function mapStateToProps(state) {
  return { tokenGroup: state.tokenGroup, token: state.token };
}

function mapDispatchToProps(dispatch) {
  return {
    checkNameGroup: function (nameGroup) {
      dispatch({ type: "nameGroup", nameGroup: nameGroup });
    },
    AddTokenGroup: function (tokenGroup) {
      dispatch({ type: "tokenGroup", tokenGroup: tokenGroup });
    },
    addToken: function (token) {
      dispatch({ type: 'addToken', token: token })
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Group);
