import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Linking, TextInput } from "react-native";
import { Input, Button, Avatar, Accessory, Overlay, Header } from "react-native-elements";
import { Icon } from "react-native-vector-icons/FontAwesome";
import { Ionicons, Entypo, AntDesign, Fontisto, MaterialIcons } from "@expo/vector-icons";

import { connect } from 'react-redux';

import { baseURL } from '../screens/components/adressIP'

//display info of a specific group
function MesGroupes(props) {

  const [visible, setVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupParticipants, setGroupParticipants] = useState([]);
  const [listID, setListID] = useState('');
  const [text, setText] = useState('');

  const [searchGroupe, setSearchGroupe] = useState("Chercher un Groupe");
  const [searchFriend, setSearchFriend] = useState("");
  const [listFriends, setListFriends] = useState([]);
  const [visibleFriends, setVisibleFriends] = useState(false);
  const [listErrorFriends, setListErrorFriends] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);
  const [contact, setContact] = useState([]);

  //gets group info from backend with token stored in redux 
  useEffect(() => {
    const loadInfo = async () => {
      const rawReponse = await fetch(`${baseURL}/getMyGroup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `token=${props.tokenGroup}`
      })
      const response = await rawReponse.json();
      setGroupName(response.mygroup.name);
      setGroupParticipants(response.users)

      if (response.mygroup.list_id) {
        setListID(response.mygroup.list_id)
      }else{
        setListID()
      }
    }
    if(props.tokenGroup){
      console.log('hello')
      loadInfo();
    }
  }, [props.tokenGroup])


  const toggleOverlay = () => {
    setVisible(!visible);
  }

//create a shopping list for the group
  const addList = async () => {
    const rawResponseList = await fetch(`${baseURL}/addList`, {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `name=${text}&user=${props.token}`
    });

    const responseList = await rawResponseList.json()

//adds list ID to group in db
    const rawResponseGroup = await fetch(`${baseURL}/updateGroup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `token=${props.tokenGroup}&listID=${responseList._id}`
    });

    const responseGroup = await rawResponseGroup.json()

    if (responseGroup) {
      setListID(responseList._id)
    }

  }

  //on click list is saved in redux and user is redirected to the group shopping list
  const List = () => {
    if (listID) {
      props.navigation.navigate('MesGroupesP12')
    } else {
      toggleOverlay();
    }

  }

  //text for the email sent to friends
  const textMail =
    `Hello,${"\n"} I'm making the shopping list for our next party, join thegroup by connecting to :${"\n"}
   https://popotes/app/fr.${"\n"}
  Here is the access code to the group:${props.tokenGroup}, please inform what you
  are bringing. ${"\n"}
  See you soon.`




  function back() {
    setVisibleFriends(false);
  }
  function addFriend() {
    setVisibleFriends(!visibleFriends);
  }

  //add user to group by username
  var checkNameFriends = async () => {
    var rawResponse = await fetch(`${baseURL}/friends`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `nameFriendFromFront=${searchFriend}&tokenGroupFromFront=${props.tokenGroup}`,
    });
    var response = await rawResponse.json();
    console.log(response)
    var userName = response.userSearch.username;

    if (response.result == true && userName) {
      setGroupParticipants([...groupParticipants, response.userSearch])
      setVisibleFriends(false);

    } else {
      listErrorFriends.push(`ton ami n'est pas enregistré`)
      return listErrorFriends
    }
  };

//  display PARTICIPANTs username

  if (groupParticipants.length == 0) {
    var participants =<Text style={{fontFamily: 'Kohinoor Telugu', fontSize:15, color:'grey', marginTop:30, marginLeft:60}}>No peoples</Text>

} else {
  var participants = groupParticipants.map(function (el, i) {
    return <View style={{ width: 200, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', marginBottom: 5, borderRadius: 45 }}>
      <Text style={{ marginLeft: 10, fontFamily: "Kohinoor Telugu" }}>{el.username}</Text>
      <Button
        buttonStyle={{ backgroundColor: "white", borderRadius: 45 }}
        icon={<Entypo name="cross" size={24} color="black" />}
      />
    </View>
  })}

  return (
    // <ScrollView>
    <View style={{ backgroundColor: "#e5f8f8", flex: 1 }}>


      {/* ===================== HEADER ========================================> */}

      <Header
        containerStyle={{ backgroundColor: '#7FDBDA', height: 90, paddingTop: 50 }}
        leftComponent={<AntDesign name="leftcircleo" size={24} color="white" onPress={() => { props.navigation.navigate('Group') }} />}
        centerComponent={{ text: 'GROUP', style: { color: '#fff', fontFamily: 'Kohinoor Telugu', fontSize:22 } }}
        rightComponent={<Fontisto name="shopping-basket" size={24} color="white" onPress={() => { props.navigation.navigate('List') }} />}
      />

      {/* ===================== BODY ========================================> */}

      <View style={{ alignItems: "center", marginTop: 10 }}>

        <Avatar
          rounded
          size={130}
          source={{
            uri:props.nameGroup.image,
            justifyContent: "space-between",
          }}
        />

        {/* <Text>NameGroup : {props.nameGroup}</Text>
        <Text>Password: {props.tokenGroup}</Text> */}

        <Text style={{ padding: 5, fontSize: 20, marginBottom: 20, fontFamily: "Kohinoor Telugu" }}>{groupName}</Text>

        <Text style={{ fontSize: 22, marginBottom: 5, fontFamily: "Kohinoor Telugu" }}>Share shopping list access :</Text>

        <Button
          title="Go to list"
          buttonStyle={{ backgroundColor: '#7FDBDA', marginTop: 5, width: 170, borderRadius: 20, fontFamily: "Kohinoor Telugu" }}
          titleStyle={{ color: 'white', fontFamily: 'Kohinoor Telugu' }}
          onPress={() => List()}
        />

        <Text style={{ marginTop: 30, fontSize: 22, fontFamily: "Kohinoor Telugu", marginBottom: 10 }}>Peoples :</Text>

        <ScrollView style={{width:200, height:170}}>
          {participants}
        </ScrollView>


        <Text style={{ marginTop: 10, fontSize: 22, fontFamily: "Kohinoor Telugu"}}>Add Peoples :</Text>

        <TouchableOpacity>
          <Ionicons
            style={{ marginTop:5 }}
            name="ios-add-circle-outline"
            size={60}
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
            isVisible={visibleFriends}
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
                        `mailto:?subject=${props.nameGroup.name}&body=${textMail}`
                      );
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          </Overlay>

        </View>
      </View>

      {/* ------------------------------ OVERLAY -----------------------------------------------*/}
      <Overlay overlayStyle={{ backgroundColor: '#dfe6e9', borderRadius: 50, }} isVisible={visible} onBackdropPress={toggleOverlay} >
        <View style={styles.overlay}>
          <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingBottom: 30 }}>First, give a name to your list : </Text>
          <Input placeholder='Name'
            onChangeText={(value) => setText(value)}
            value={text} />
        </View>
        <Button
          title="Confirm"
          onPress={() => { addList(); toggleOverlay() }}
          type="clear"
          buttonStyle={{ borderColor: 'white', justifyContent: 'center' }}
          titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingTop: 30 }}

        />
      </Overlay>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  overlay: {
    width: 290,
    margin: 18,
    justifyContent: 'center',
  },
});

function mapDispatchToProps(dispatch) {
  return {
    currentList: function (info) {
      dispatch({ type: 'listInfo', listInfo: info })
    },
  }
}

function mapStateToProps(state) {
  return { tokenGroup: state.tokenGroup, token: state.token, nameGroup: state.nameGroup };
}


export default connect(mapStateToProps, mapDispatchToProps)(MesGroupes);

