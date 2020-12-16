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
import { Ionicons, Entypo } from "@expo/vector-icons";

import { connect } from 'react-redux';

import {baseURL} from '../screens/components/adressIP'


function MesGroupes(props) {

  const [visible, setVisible] = useState(false);
  const [groupName, setGroupName]= useState('');
  const [groupParticipants, setGroupParticipants]= useState([]);
  const [listID, setListID]= useState('');
  const [text, setText] = useState('');

  const [searchGroupe, setSearchGroupe] = useState("Chercher un Groupe");
  const [searchFriend, setSearchFriend] = useState("");
  const [listFriends, setListFriends] = useState ([]);
  const [visibleFriends, setVisibleFriends] = useState(false);
  const [listErrorFriends, setListErrorFriends] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);
  const [contact, setContact]= useState([]);

  useEffect(()=>{
    const loadInfo = async()=>{
      const rawReponse= await fetch(`${baseURL}/getMyGroup`, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `token=${props.tokenGroup}`
      })
      const response = await rawReponse.json();
      setGroupName(response.mygroup.name);
      setGroupParticipants(response.users)

      if(response.mygroup.list_id){
        setListID(response.mygroup.list_id)
      }
    }
    loadInfo();
  },[])

  const toggleOverlay = () => {
    setVisible(!visible);
  }

  
  const addList = async() => {
    const rawResponseList = await fetch(`${baseURL}/addList`, {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `name=${text}`
    });

    const responseList = await rawResponseList.json()
    

    const rawResponseGroup = await fetch(`${baseURL}/updateGroup`, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `token=${props.tokenGroup}&listID=${responseList._id}`
  });

  const responseGroup = await rawResponseGroup.json()

  if(responseGroup){
    setListID(responseList._id)
  }

  }

  const List = ()=>{
    if(listID){
      props.currentList({id:listID})
      props.navigation.navigate('MesGroupesP12')
    }else{
      toggleOverlay();
    }
    
  }

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

     var checkNameFriends = async()=> {
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
        
      }else{
        listErrorFriends.push(`ton ami n'est pas enregistré`)
        return listErrorFriends
      } 
    };


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
    <View style={{ backgroundColor: "#ADE498", flex:1 }}>
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
        {/* <Text>NameGroup : {props.nameGroup}</Text>
        <Text>Password: {props.tokenGroup}</Text> */}
        <View>
          <Text style={{padding: 20, fontSize: 20}}>{groupName}</Text>
        </View>
        <Button
          style={{ marginTop: 30, width: 130, fontFamily: "Kohinoor Telugu"}}
          title="Liste"
          onPress={()=>List()}
        />
        <Text
          style={{ marginTop: 20, fontSize: 25, fontFamily: "Kohinoor Telugu" }}
        >
          Participants :
        </Text>

        <ScrollView>
          {groupParticipants.map(function(el, i){
            return <View style={{width:350,flex:1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: 45}}>
            <Text style={{marginLeft: 10, fontFamily: "Kohinoor Telugu"}}>{el.username}</Text>
          <Button
            title=""
            buttonStyle={{ backgroundColor: "white", borderRadius: 45 }}
            icon={<Entypo name="cross" size={24} color="black" />}
            onPress={() => {props.navigation.navigate('MesGroupesP12')}}
          />
          </View>
          })
          
        }

        </ScrollView>
    {/* <View style={{alignContent: "center"}}> 
        {newList}
    </View>    */}
    

      
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
                      `mailto:?subject=${props.nameGroup}&body=${textMail}`
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
        onChangeText= {(value) => setText(value)} 
        value={text}/>
        </View>
        <Button
        title="Confirm"
        onPress={() => {addList(); toggleOverlay()}}
        type="clear"
        buttonStyle={{ borderColor: 'white', justifyContent: 'center' }}
        titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingTop: 30 }}

        />
    </Overlay>

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
  overlay: {
    width: 290,
    margin: 18,
    justifyContent: 'center',
},
});

function mapDispatchToProps(dispatch) {
  return {
      currentList: function(info) { 
          dispatch( {type: 'listInfo', listInfo: info} ) 
      },
  }
}

function mapStateToProps(state) {
  return { tokenGroup: state.tokenGroup, token: state.token, nameGroup: state.nameGroup };
}


export default connect(mapStateToProps, mapDispatchToProps)(MesGroupes);

