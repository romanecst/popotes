import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from "react-native";
import { Input, Button, Overlay, Avatar } from "react-native-elements";
import { Icon } from "react-native-vector-icons/FontAwesome";
import { Ionicons, Entypo } from "@expo/vector-icons";
import {connect} from 'react-redux';

 function Group(props) {

  const [visible, setVisible] = useState(false);
  const [nameGroup, setNameGroup] = useState("")

  function createGroup(){
   setVisible(!visible);
  console.log('ca click');}

  var saveGroup = async function save(){
    var rawResponse = await fetch("http://172.17.1.129:3000/group", {
                  method: 'POST',
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                  body: `avatarGroupFromFront=lalalala&nameGroupFromFront=${nameGroup}`
                });
    var response = await rawResponse.json();
    console.log("test de réponses", response)
  }
  function save(){
    saveGroup();
    console.log('passage par la riute 2 ?')
  }


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
          <Ionicons name="ios-add-circle-outline" size={154} color="black"
           onPress={() => {createGroup()}}
              />
            <Overlay overlayStyle={{backgroundColor:'#dfe6e9', borderRadius: 50}} isVisible={visible} onBackdropPress={createGroup} >
            <Avatar 
            rounded
            size={90}
            source={{uri:"https://cdn.radiofrance.fr/s3/cruiser-production/2020/01/498986bd-e296-46b8-aa8d-054f57636fec/801x410_untitled_collage_2_8.jpg"}}></Avatar>
            <Button
          title="Return"
          type="clear"
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
          onPress = {() =>{props.checkNameGroup(nameGroup); save()}}
        />

          <Button
          title="Liste"
          type="route"
          buttonStyle={{ borderColor: 'white', justifyContent: 'center' }}
          titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingTop: 30 }}
        />

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
    checkNameGroup: function(nomDuGroupe) { 
      dispatch( {type: 'nameGroup', nomDuGroupe:nomDuGroupe }) 
    }
  }
};

export default connect(
    null, 
    mapDispatchToProps
)(Group);

