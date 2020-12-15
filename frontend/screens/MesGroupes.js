import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Input, Button, Avatar, Accessory } from "react-native-elements";
import { TextInput } from "react-native";
import { Icon } from "react-native-vector-icons/FontAwesome";
import { Ionicons, Entypo } from "@expo/vector-icons";

import { connect } from 'react-redux';

import {baseURL} from '../screens/components/adressIP'


function MesGroupes(props) {

  const [groupName, setGroupName]= useState('');
  const [groupParticipants, setGroupParticipants]= useState([]);

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
    }
    loadInfo();
  },[])

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
        />
        <Text
          style={{ marginTop: 20, fontSize: 25, fontFamily: "Kohinoor Telugu" }}
        >
          Participants :!!!!!!!!!!!!!!
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

        <Ionicons
          style={{ marginTop: 15, marginBottom: 35 }}
          name="ios-add-circle-outline"
          size={114}
          color="black"
        />
      </View>
    </View>
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
  return { tokenGroup: state.tokenGroup, token: state.token };
}


export default connect(mapStateToProps, null)(MesGroupes);

