import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image, 
  Linking
} from "react-native";
import { Input, Button, Avatar, Accessory, Overlay } from "react-native-elements";
import { TextInput } from "react-native";
import { Icon } from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import * as Contacts from 'expo-contacts';

import { connect } from "react-redux";

 function MesGroupes({tokenGroup, nameGroup}) {

  const [searchGroupe, setSearchGroupe] = useState("Chercher un Groupe");
  const [searchFriend, setSearchFriend] = useState("");
  const [listFriends, setListFriends] = useState ([]);
  const [visible, setVisible] = useState(false);
  const [listErrorFriends, setListErrorFriends] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);
  const [contact, setContact]= useState([]);


  const text =
  `Hello,${"\n"} I'm making the shopping list for our next party, join thegroup by connecting to :${"\n"}
   https://popotes/app/fr.${"\n"}
  Here is the access code to the group:${tokenGroup}, please inform what you
  are bringing. ${"\n"}
  See you soon.`

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });
// console.log("test data !!!!!!!", data.name)
        if (data.length > 0) {
          for (var i=0; i<data.length; i++){
          const contactPerso = data[i];
          setContact(contactPerso);}
          setHasPermission(true)
        } 
      }
    })();
  }, []);

  


  function back() {
    setVisible(false);
  }
  function addFriend() {
    setVisible(!visible);
     }

     var checkNameFriends = async function save() {
      var rawResponse = await fetch("http://192.168.1.21:3000/friends", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `nameFriendFromFront=${searchFriend}&tokenGroupFromFront=${tokenGroup}`,
      });
      var response = await rawResponse.json();
      console.log(response)
      var userName = response.userSearch.username;
  
      if (response.result == true && userName) {
      setListFriends([...listFriends, userName])
      setVisible(false);
        
      }else{
        listErrorFriends.push(`ton ami n'est pas enregistré`)
        return listErrorFriends
      } 
    };

    useEffect(() => { 
      console.log('liste amis à jour', listFriends)
    }, [listFriends]) 

var newList = listFriends.map(function(list, i){
  return <Button
  iconRight={true}
  title={list}
  key={i}
  buttonStyle={{ backgroundColor: "white" }}
  containerStyle={{
    borderRadius: 45,
    marginTop: 10,
    marginBottom: 10,
  }}
  titleStyle={{ color: "black", fontFamily: "Kohinoor Telugu", textAlign: "center" }}
/>
})

  return (
    <ScrollView>
    <View style={{ backgroundColor: "#ADE498" }}>
      <View
        style={{
          alignItems: "center",
          marginTop: 120,
        }}
      >
        <View>
          <Avatar
            rounded
            size={130}
            source={{
              uri:
                "https://geeko.lesoir.be/wp-content/uploads/sites/58/2020/05/avatar.jpg",
              justifyContent: "space-between",
            }}
          />
        </View>
        <Text>NameGroup : {nameGroup}</Text>
        <Text>Password: {tokenGroup}</Text>
        <View>
          <TextInput
            style={{
              height: 50,
              backgroundColor: "white",
              borderRadius: 15,
              textAlign: "center",
              width: 250,
              alignItems: "center",
              marginTop: 40,
              fontFamily: "Kohinoor Telugu",
            }}
            onChangeText={(text) => setSearchGroupe(text)}
            value={searchGroupe}
          />
        </View>
        <Button
          style={{ marginTop: 30, width: 130, fontFamily: "Kohinoor Telugu"}}
          title="Liste"
        />
        <Text
          style={{ marginTop: 20, fontSize: 25, fontFamily: "Kohinoor Telugu" }}
        >
          Participants :
        </Text>

    <View style={{alignContent: "center"}}> 
        {newList}
    </View>   

    <Text style={{ marginBottom: 10, fontFamily: "Kohinoor Telugu" }}>
                Invite your friends to download your app :
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
                    Linking.openURL(
                      `mailto:?subject=${nameGroup}&body=${text}`
                    );
                }}
              />
    

      
<TouchableOpacity>
        <Ionicons
          style={{ marginTop: 15, marginBottom: 35 }}
          name="ios-add-circle-outline"
          size={114}
          color="black"
          onPress={() => {
            addFriend();
          }}
        />
        </TouchableOpacity>
{/* ----------------------------------------------------------OVERLAY AJOUT PARTICPANTS------------------------------------- */}
        <View>
        <Overlay
          overlayStyle={{
            backgroundColor: "#dfe6e9",
            borderRadius: 30,
            width: 320,
          }}
          isVisible={visible}
          onBackdropPress={addFriend}
        >
          <ScrollView>
         
          
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
              
            </View>

            <View style={{ alignItems: "center" }}>
              <Text style={{ fontFamily: "Kohinoor Telugu" }}>
                Find your friends :
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
                placeholder="Friends name"
                onChangeText={(value) => {
                  setSearchFriend(value);
                }}
                value={searchFriend}
              />
                {/* <Text>{contact}</Text> */}

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

              

              <Button
                title="Go !"
                buttonStyle={{
                  backgroundColor: "#7FDBDA",
                  borderRadius: 30,
                  paddingHorizontal: 18,
                }}
                titleStyle={{ color: "white", fontFamily: "Kohinoor Telugu" }}
                onPress={() => {
                  checkNameFriends(searchFriend)
                }}
              />
            </View>
          </View>
          </ScrollView>
        </Overlay>

        </View>
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});

function mapStateToProps(state) {
  return { tokenGroup: state.tokenGroup, nameGroup: state.nameGroup};
}


export default connect(mapStateToProps,null)
(MesGroupes);