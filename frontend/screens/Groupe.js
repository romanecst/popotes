import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from "react-native";
import { Input, Button, Overlay, Avatar, Image } from "react-native-elements";
import { Icon } from "react-native-vector-icons/FontAwesome";
import { Ionicons, Entypo } from "@expo/vector-icons";
import {connect} from 'react-redux';


import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

 function Groupe(props) {

  const [visible, setVisible] = useState(false);
  const [nameGroup, setNameGroup] = useState("")
  const [tokenGroup, setTokenGroup] = useState("")

  const [groupExists, setGroupExists] = useState(false);
  const [listErrorGroup, setListErrorGroup] = useState([]);

  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState("");


  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        } else{
          setHasPermission(true)
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

    console.log('essai permission result', result);
    if (!result.cancelled) {
      setImage(result.uri)}}

  function createGroup(){
   setVisible(!visible);
  }
  function back(){
    setVisible(false);
   }

//192.168.1.20 IP Leila Maison

  var saveGroup = async function save(){
    var rawResponse = await fetch("http://192.168.1.20:3000/group", {
                  method: 'POST',
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                  body: `avatarGroupFromFront=${image}=${nameGroup}`
                });
    var response = await rawResponse.json();
    var token= response.groupSave.group_token;
    
    if (response.result==true){
    setTokenGroup(token)
    setGroupExists(true)
    props.AddTokenGroup(token)
    setVisible(false)
  }
  else {
    setListErrorGroup(response.error)
  }}



  return (
    <View style={{ backgroundColor: "#ADE498", width: "100%", height: "100%"}}>
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
          <Ionicons name="ios-add-circle-outline" size={154} color="black"
           onPress={() => {createGroup()}}
              />
            <Overlay overlayStyle={{backgroundColor:'#dfe6e9', borderRadius: 50}} isVisible={visible} onBackdropPress={createGroup} >
            <Avatar 
            activeOpacity={0.2}
            onPress={pickImage}
            overlayContainerStyle={{}}
            placeholderStyle={{}}
            rounded
            showAccessory
            size="small"
            source={{uri: "" }}
            title=""
            titleStyle={{}}
            rounded
            showAccessory 
            size={50}
            >
            <View style={{flex: 1, alignItems:"center", justifyContent:"center"}}>
              {image ?<Image  source={{ uri: image }} style={{ width: 100, height: 100}} containerStyle={{borderRadius: 500}}/>: <Entypo name="add-user" size={24} color="black" />}
            </View>
            </Avatar>
            <Button
          title="Return"
          type="clear"
          onPress={() => {back()}}
          buttonStyle={{ borderColor: '#dfe6e9', justifyContent: 'flex-end' }}
          titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu', fontSize: 11, paddingBottom: 20, paddingRight:17 }}
        />
        <TextInput 
              Style={{ 
            height:16,
            width:250,
            alignItems: "stretch",
            textAlign: "center",
            marginTop: 50,
            borderRadius: 50,
            marginLeft: 20,
            marginRight: 20,
          }}
          placeholder="Group Name"
          onChangeText={(value)=>{setNameGroup(value)}}
          value= {nameGroup}
          />

          <Button
         
          title = " Valider "
          color = " # 841584 "
          buttonStyle={{ borderColor: 'white', justifyContent: 'center' }}
          titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingTop: 30 }}
          onPress = {() =>{ props.checkNameGroup(nameGroup), saveGroup()}}
        />

          <Button
          title="Liste"
          type="route"
          buttonStyle={{ borderColor: 'white', justifyContent: 'center' }}
          titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingTop: 30 }}
        />

        <Text> Participants</Text>

          <View style={styles.overlay}>
         </View>
           
            </Overlay>
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

const styles = StyleSheet.create({
  overlay: {
  width: 290,
  margin:18,
  justifyContent: 'center',
}, prefalim: {
  alignItems: 'center',
  justifyContent:'center',
  flexDirection:'row',
}, picto: {
  alignItems: 'center',
  justifyContent:'center',
  margin:15,
}
});


function mapDispatchToProps(dispatch) {
  return {
    checkNameGroup: function(nameGroup) { 
      dispatch({type: 'nameGroup', nameGroup:nameGroup }) 
    },
    AddTokenGroup: function(tokenGroup) { 
      dispatch({type: 'tokenGroup', tokenGroup:tokenGroup }) 
    }
  }
};

export default connect(
    null, 
    mapDispatchToProps
)(Groupe);

