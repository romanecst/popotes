import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  borderColor,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";

import { Button, ListItem, Header, Overlay, Input } from "react-native-elements";

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


import {connect} from 'react-redux';

function List({ navigation, currentList }) {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const [list, setList] = useState([]);

  useEffect(()=>{
    const loadList = async() => {
      var rawResult = await fetch('http://192.168.1.87:3000/list');
      var result = await rawResult.json();
      setList(result)
    }
    loadList();
  
  },[])

  const addList = async() => {
    await fetch('http://192.168.1.87:3000/addList', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `name=${text}`
    });
  }

  const toggleOverlay = () => {
    setVisible(!visible);
};

  return (
    <View style={{flex:1, backgroundColor: "#FFF2DF" }}>

      <Header
        containerStyle={{ backgroundColor: '#febf63', height: 90, paddingTop: 50 }}
        leftComponent={<AntDesign name="leftcircleo" size={24} color="white"  />}
        centerComponent={{ text: 'LIST', style: { color: '#fff', fontFamily: 'Kohinoor Telugu' } }}
        rightComponent={<Fontisto name="shopping-basket" size={24} color="white" onPress={() => { navigation.navigate('List') }} />}
      />

      <View style={{ alignItems: "center", marginTop: 90 }}>
        <Text style={{ fontSize: 30 }}>Create a new list</Text>

        {/* --------------BOUTON CREATION D'UNE LISTE DE FAVORI -----------------------------------------------*/}
        <Ionicons name="ios-add-circle-outline" size={134} color="black" onPress={toggleOverlay}/>
      </View>
      <Text
        style={{
          alignItems: "center",
          marginLeft: 80,
          marginTop: 40,
          fontSize: 20,
        }}
      >
        Mes Listes mes listes de course{" "}
      </Text>

      {/* ---------------------------LISTE EXISTANTE FAVORITE------------------------------------------  */}
      <ScrollView
        style={{
          marginBottom: 10,
          marginTop: 70,
          backgroundColor: "#FFF2DF",
          paddingLeft: 5,
          paddingRight: 5,
        }}
      >
        {list.map((l, i) => (
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        }}>
          <TouchableOpacity
          onPress={() => {currentList(l); navigation.navigate('GlobalList') }}>
          <ListItem
            key={i}
            bottomDivider
            style={{
              borderRadius: 90,
              marginLeft: 30,
              marginRight: 30,
              marginBottom: 10,
              top: 20,
              width: 300
            }}
          >
            <ListItem.Content style={{ flex: 1 }}>
              <Text> {l.name}</Text>
            </ListItem.Content>
          </ListItem>
          </TouchableOpacity>
          <View style={{top: 20 }}>
                <Ionicons name="ios-trash" size={24} color="black" onPress={()=> console.log('HELOO')} />
          </View>
          </View>
        ))}
      </ScrollView>

  {/* ------------------------------ OVERLAY -----------------------------------------------*/}
  <Overlay overlayStyle={{ backgroundColor: '#dfe6e9', borderRadius: 50, }} isVisible={visible} onBackdropPress={toggleOverlay} >
    <View style={styles.overlay}>
        <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingBottom: 30 }}>First, give a name to your list : </Text>
        <View style={styles.prefalim}>
            
        </View>
        <Input placeholder='Name'
        onChangeText= {(value) => setText(value)} 
        value={text}/>
        </View>
        <Button
        title="Confirm"
        onPress={() => {setList([...list, {name:text}]); addList(); toggleOverlay()}}
        type="clear"
        buttonStyle={{ borderColor: 'white', justifyContent: 'center' }}
        titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingTop: 30 }}

        />
    </Overlay>
    </View>
  );
}

function mapDispatchToProps(dispatch) {
  return {
      currentList: function(info) { 
          dispatch( {type: 'listInfo', listInfo: info} ) 
      }
  }
  }
      
  
  export default connect(
      null, 
      mapDispatchToProps
  )(List);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    width: 290,
    margin: 18,
    justifyContent: 'center',
},
prefalim: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    }, 
});
