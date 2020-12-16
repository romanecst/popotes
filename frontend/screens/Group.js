import React, { useState, useEffect } from "react";
import {View, ScrollView, TouchableOpacity, StyleSheet, TextInput, Image, Linking, AsyncStorage} from "react-native";
import { Input, Button, Overlay, Avatar, Header, Text } from "react-native-elements";
import { Icon } from "react-native-vector-icons/FontAwesome";
import { Ionicons, Entypo, AntDesign, Fontisto, MaterialIcons } from "@expo/vector-icons";
import { connect } from 'react-redux';


import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import Signin from './Signin';

import {baseURL} from '../screens/components/adressIP'



function Group(props) {

  const [visible, setVisible] = useState(false);

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
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`
    })

    const body = await data.json()

    if(body.result == true){
      
      console.log(body.token);
      props.addToken(body.token);

      const rawReponse = await fetch(`${baseURL}/getGroups`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `token=${body.token}`
    })

      const response = await rawReponse.json()
      setGroupList(response);
      AsyncStorage.setItem("user token", body.token);
      toggleSignin();
      
    }  else {
      setErrorsSignin(body.error)
    }
  }

  var tabErrorsSignin = listErrorsSignin.map((error,i) => {
    return(<Text>{error}</Text>)
  })

  var handleSubmitSignUp = async () => {

    const data = await fetch(`${baseURL}/sign-up`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`
    })

    const body = await data.json()
    if(body.result == true){
      props.addToken(body.token);
      AsyncStorage.setItem("user token", body.token);
      toggleSignup();


    } else {
      setListErrorSignUp(body.error)
    }
  }

  var tabErrorsSignup = listErrorSignUp.map((error,i) => {
    return(<Text>{error}</Text>)
  })


  const text =
      `Hello,${"\n"} I'm making the shopping list for our next party, join thegroup by connecting to :${"\n"}
       https://popotes/app/fr.${"\n"}
      Here is the access code to the group:${tokenGroup}, please inform what you
      are bringing. ${"\n"}
      See you soon.`
    
  

  useEffect(() => {
    (async () => {
      AsyncStorage.getItem("user token", 
              async function(error, data){
                if(data){
                props.addToken(data);
                const rawReponse = await fetch(`${baseURL}/getGroups`, {
                  method: 'POST',
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                  body: `token=${data}`
                })

               const response = await rawReponse.json()
              setGroupList(response);
                }else{
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

  //192.168.1.20 IP Leila Maison

  /* Create group */
  var saveGroup = async function save() {
    var rawResponse = await fetch(`${baseURL}/group`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `avatarGroupFromFront=${image}&nameGroupFromFront=${nameGroup}&userID=${props.token}`
    });
    var response = await rawResponse.json();
    var token = response.groupSave.group_token;

    if (response.result == true) {
      setTokenGroup(token);
      props.AddTokenGroup(token);
      setGroupList([...groupList, response.groupSave])
      createGroup()
    } else {
      setListErrorGroup(response.error);
    }
  };

  /* Deleted groupe */
  var handleClickDelete = async () => {
    console.log("click détecté");
    var rawResponse = await fetch(`${baseURL}/deleteGroup/${nameGroup}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    var response = await rawResponse.json();
    console.log("test update", response);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#e5f8f8" }}>
      {/* -------------------------HEADER---------------------------------- */}

      <Header
        containerStyle={{
          backgroundColor: "#7FDBDA",
          height: 90,
          paddingTop: 50,
        }}
        centerComponent={{ text:'GROUPE', style: { color: '#fff', fontFamily: 'Kohinoor Telugu' } }}
        rightComponent={<Fontisto name="shopping-basket" size={24} color="white" onPress={() => { props.navigation.navigate('List') }} />}
      />

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        {/* ----------------------------Rejoindre un groupe grace au mots de pass------------------ */}

        <Text
          style={{
            textAlign: "center",
            fontFamily: "Kohinoor Telugu",
            fontSize: 20,
            marginTop: 20,
          }}
        >
          Join an existing group
        </Text>

        <Input
          style={styles.text}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          placeholder="Passwords for your party"
        />

        {/* -------------------Acces à mes groupe precedent ----------------------- */}


        <Text style={{ marginTop: 20, fontSize: 20, fontFamily: "Kohinoor Telugu" }}>My group list</Text>

        <ScrollView style={styles.scroll}>

         {
         groupList.map(function(el, i){
           return  <TouchableOpacity key={i} onPress={() => {props.AddTokenGroup(el.group_token); props.navigation.navigate('MesGroupes') }} >
           <View style={styles.blocScroll}>
             <Text>{el.name}</Text>
             <Button
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
          
        </ScrollView>

        {/* -------------------------CREATION DE NOUVEAU GROUPE ---------------------------------- */}

        <Text style={{ fontFamily: "Kohinoor Telugu", fontSize: 20 }}>
          {" "}
          Create a group{" "}
        </Text>

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
                    style={{ width: 130, height: 130, borderRadius:60 }}
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
                  props.checkNameGroup(nameGroup),
                    saveGroup(),
                    Linking.openURL(
                      `mailto:?subject=${nameGroup}&body=${text}`
                    );
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
                  props.checkNameGroup(nameGroup), saveGroup();
                }}
              />
            </View>
          </View>
        </Overlay>

        {/* -------------------------OVERLAY ----- SIGN IN/UP ---------------------------------- */}


        <Overlay overlayStyle={{backgroundColor:'#dfe6e9', borderRadius: 50,}} isVisible={visibleSignin} >
        
        <View style={styles.overlay}>
          <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 25, marginLeft:100 }}>Sign-in{"\n"}{"\n"}</Text>
            <Avatar
                size="large"
                rounded
                title="LW"
                activeOpacity={1}
                containerStyle={{backgroundColor:"red",marginBottom:60,marginLeft:100}}
            />
             
            <Input
                containerStyle={styles.input}
                placeholder='Email'
                leftIcon={{ type: 'font-awesome', name: 'at' }}
                onChangeText={(val) => setSignInEmail(val)}
                val = {signInEmail}
            />
            <Input
                containerStyle={styles.input}
                placeholder='Password'
                leftIcon={{ type: 'font-awesome', name: 'unlock' }}
                onChangeText={(val) => setSignInPassword(val)}
                val = {signInPassword}
            />

              {tabErrorsSignin}

        <Button
          title="Sign-in"
          type="clear"
          buttonStyle={{ borderColor: 'white', justifyContent: 'center' }}
          titleStyle={{ color: 'red', fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingTop: 30 }}
          onPress={() => handleSubmitSignin()}
        />
        <TouchableOpacity onPress={()=>{toggleSignup(); toggleSignin();}}><Text>Not registered yet? Create an account</Text></TouchableOpacity>
        </View>
      </Overlay>


      <Overlay overlayStyle={{backgroundColor:'#dfe6e9', borderRadius: 50,}} isVisible={visibleSignup} >
        
        <View style={styles.overlay}>
          <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 25, marginLeft:100 }}>Sign-up{"\n"}{"\n"}</Text>
            <Avatar
                size="large"
                rounded
                title="LW"
                activeOpacity={1}
                containerStyle={{backgroundColor:"red",marginBottom:60,marginLeft:100}}
            />
             <Input
                containerStyle={styles.input}
                placeholder='Username'
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                onChangeText={(val) => setSignUpUsername(val)}
                val = {signUpUsername}
            />
            <Input
                containerStyle={styles.input}
                placeholder='Email'
                leftIcon={{ type: 'font-awesome', name: 'at' }}
                onChangeText={(val) => setSignUpEmail(val)}
                val = {signUpEmail}
            />
            <Input
                containerStyle={styles.input}
                placeholder='Password'
                leftIcon={{ type: 'font-awesome', name: 'unlock' }}
                onChangeText={(val) => setSignUpPassword(val)}
                val = {signUpPassword}
            />

            {tabErrorsSignup}

        <Button
          title="Sign-up"
          type="clear"
          buttonStyle={{ borderColor: 'white', justifyContent: 'center' }}
          titleStyle={{ color: 'red', fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingTop: 30 }}
          onPress={() => {handleSubmitSignUp()}}
        />
        <TouchableOpacity onPress={()=>{toggleSignin(); toggleSignup();}}><Text>Already have an account? Log in</Text></TouchableOpacity> 
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
    marginHorizontal: 40,
    fontSize: 14,
    padding: 20,
  },
  overlay: {
    width: 290,
    margin:18,
    justifyContent: 'center',
  },
input:{
    borderWidth:1,
    borderRadius:20,
    height:60,
    marginBottom:20
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
    addToken: function(token){
      dispatch({type: 'addToken', token: token})
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Group);
