import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet
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


  return (
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
          />
          </View>
          })
          
        }

        </ScrollView>

        <Ionicons
          style={{ marginTop: 15, marginBottom: 35 }}
          name="ios-add-circle-outline"
          size={114}
          color="black"
        />
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
  return { tokenGroup: state.tokenGroup, token: state.token };
}


export default connect(mapStateToProps, mapDispatchToProps)(MesGroupes);

