import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, View, Text, Image, borderColor, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import { Button, ListItem, Header, Input, Overlay } from "react-native-elements";

import { Ionicons, AntDesign, Fontisto, Entypo } from "@expo/vector-icons";



import {connect} from 'react-redux';

function List({ navigation, currentList }) {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const [list, setList] = useState([]);

  useEffect(()=>{
    const loadList = async() => {
      var rawResult = await fetch('http://172.17.1.71:3000/list');
      var result = await rawResult.json();
      setList(result)
    }
    loadList();
  
  },[])

  const addList = async() => {
    await fetch('http://172.17.1.197:3000/addList', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `name=${text}`
    });
  }

  async function DelList(id){
    if(id){
      await fetch('http://172.17.1.197:3000/deleteList', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `id=${id}`
      });
      var templist = [...list];
      templist = templist.filter(el => el._id !== id);
      setList(templist);
  }
  }

  const toggleOverlay = () => {
    setVisible(!visible);
};

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF2DF" }}>

      <Header
        containerStyle={{ backgroundColor: '#febf63', height: 90, paddingTop: 50 }}
        leftComponent={<AntDesign name="leftcircleo" size={24} color="white" />}
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
                <Ionicons name="ios-trash" size={24} color="black" onPress={()=> DelList(l._id)} />
          </View>
          </View>
        ))}
      </ScrollView>

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
        onPress={() => {setList([...list, {name:text}]); addList(); toggleOverlay()}}
        type="clear"
        buttonStyle={{ borderColor: 'white', justifyContent: 'center' }}
        titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingTop: 30 }}

        />
    </Overlay>

      {/* ---------------------------LISTE EXISTANTE FAVORITE------------------------------------------  */}

    {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>

      <Text style={{ marginTop: 50, fontSize: 20, fontFamily: "Kohinoor Telugu" }}>My shop list</Text>

      <ScrollView style={styles.scroll}>

        {list.map((l, i) => (
          <TouchableOpacity onPress={() => { navigation.navigate('GlobalList') }} >
            <View style={styles.blocScroll}>
              <Text> {l.name}</Text>
              <Text>{l.subtitle}</Text>


              <Button icon={<Entypo name="cross" size={24} color="black" />} buttonStyle={{ backgroundColor: '#FFFFFF', padding:18, borderRadius:50}}>
              </Button>
            </View>

          </TouchableOpacity>
        ))}
      </ScrollView>
    </View> */}

      {/* --------------BOUTON CREATION D'UNE LISTE DE FAVORI -----------------------------------------------*/}

      {/* <View style={{ alignItems: "center", justifyContent: 'center', marginTop: 15 }}>


        <Text style={{ fontSize: 20, fontFamily: "Kohinoor Telugu" }}>Creat a liste</Text>
        <Button
          icon={<Ionicons name="ios-add-circle-outline" size={60} color="black" />}
          buttonStyle={{ backgroundColor: '#FFF2DF' }}
        />
      </View> */}
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
}, scroll: {
    marginBottom: 50,
    marginTop: 20,
    backgroundColor: "#FFF2DF",
    width: 300,
    height: 300,
  }, blocScroll: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    justifyContent:'space-between'
  }
});
