import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, View, Text, Image, borderColor, TouchableOpacity, ImageBackground, ScrollView, AsyncStorage } from "react-native";
import { Button, ListItem, Header, Input, Overlay, Avatar } from "react-native-elements";

import { Ionicons, AntDesign, Fontisto, Entypo } from "@expo/vector-icons";

import { connect } from 'react-redux';

import { baseURL } from '../screens/components/adressIP'
import Sign from './Sign';
//display, create, delete lists from user
function List(props) {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const [lists, setLists] = useState([]);
  const [sign, setSign] = useState(false);

  const listInit = async () => {
    AsyncStorage.getItem("user token",
      async function (error, data) {
        console.log('DATAT', data)
        if (data) {
          props.addToken(data);
          //if user connected requests their shopping lists from backend
          const dataFetch = await fetch(`${baseURL}/getMyLists`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `token=${data}`
          });
          const body = await dataFetch.json();
          setLists(body)

        } else {
          setSign(true);
        }
      })
  }

  useEffect(() => {
  listInit();
  }, []);


  if(props.token && sign){
    listInit();
    setSign(false);
   }


  
//request backend to create a new list in the database with the name types by the user
  const addList = async () => {
    var rawResponse = await fetch(`${baseURL}/addList`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `name=${text}&user=${props.token}`
    });
    var response = await rawResponse.json();
    setLists([...lists, response])
    //reset text input
    setText('');
  }
//request backend to delete a specific list in the database
  async function DeleteList(id) {
    if (id) {
      await fetch(`${baseURL}/deleteList`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${id}&user=${props.token}`
      });
      var newlist = lists.filter(el => el._id !== id);
      setLists(newlist);
    }
  }

  const toggleOverlay = () => {
    setVisible(!visible);
  };

//display lists or no shooping list if user has no list
  if (lists.length == 0) {
    var listsShop =<Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 20, marginTop: 40, color: 'grey', marginLeft: 78 }}>No shopping list</Text>


  } else {
    var listsShop = lists.map((el, i) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 30, marginBottom: 12 }}>
        {/*on click add list info to reux store and redirect to global list */}
        <TouchableOpacity
          onPress={() => { props.currentList(el); props.addingredientList(el.ingredients); props.navigation.navigate('GlobalList') }}>
          <ListItem key={i} containerStyle={{ width: 280, flexDirection: 'row', alignItems: 'center', borderRadius: 30 }}>
            <ListItem.Content style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
              <Text> {el.name}</Text>
              <View>
                <Entypo name="cross" size={24} color="black" onPress={() => DeleteList(el._id)} />
              </View>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
      </View>
    ))

  };


  return (
    <View style={{ flex: 1, backgroundColor: "#FFF2DF" }}>

      <Header
        containerStyle={{ backgroundColor: '#febf63', height: 90, paddingTop: 50 }}
        leftComponent={<AntDesign name="leftcircleo" size={24} color="white" onPress={() => { props.navigation.goBack(null) }} />}
        centerComponent={{ text: 'LIST', style: { color: '#fff', fontFamily: 'Kohinoor Telugu', fontSize: 22 } }}
        rightComponent={<Fontisto name="shopping-basket" size={24} color="white" onPress={() => { props.navigation.navigate('List') }} />}
      />

      <View style={{ alignItems: "center", justifyContent: 'center', marginTop: 10, marginBottom: 20 }}>
      {sign && <Sign/>}
        <Text style={{ alignItems: "center", marginTop: 10, marginBottom: 20, fontSize: 22, fontFamily: 'Kohinoor Telugu' }}> My shopping list</Text>


        {/* ---------------------------LISTE EXISTANTE FAVORITE------------------------------------------  */}
        <ScrollView style={{ marginTop: 10, backgroundColor: "#FFF2DF", width: 300, height: 300, borderRadius: 20 }}>
          {listsShop}
        </ScrollView>

        {/* ------------------------------ OVERLAY -----------------------------------------------*/}
        <Overlay overlayStyle={{ backgroundColor: '#dfe6e9', borderRadius: 50, }} isVisible={visible} onBackdropPress={toggleOverlay} >
          <View style={styles.overlay}>
            <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingBottom: 30 }}>First, give a name to your list : </Text>
            <Input
              placeholder='Name of group'
              onChangeText={(value) => setText(value)}
              value={text}
              style={{backgroundColor:'white', borderRadius:10, paddingLeft:12}}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              />

          </View>

          <Button
            title="Confirm"
            buttonStyle={{ borderColor: 'white', marginTop: 10, padding: 10, marginHorizontal: 100, borderRadius: 30, marginBottom: 20, backgroundColor: "#febf63" }}
            titleStyle={{ color: 'white', fontFamily: 'Kohinoor Telugu' }}
            onPress={() => { addList(); toggleOverlay() }}
          />

        </Overlay>


        <Text style={{ fontSize: 22, marginTop: 40, marginBottom: 20, fontFamily: 'Kohinoor Telugu', }}>Create a new list</Text>

        {/* --------------BOUTON CREATION D'UNE LISTE DE FAVORI -----------------------------------------------*/}
        <Ionicons name="ios-add-circle-outline" size={60} color="black" onPress={toggleOverlay} />
      </View>

    </View>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    currentList: function (info) {
      dispatch({ type: 'listInfo', listInfo: info })
    },
    saveList: function (info) {
      dispatch({ type: 'addList', list: info })
    },
    delList: function (info) {
      dispatch({ type: 'delList', list: info })
    },
    addingredientList: function (info) {
      dispatch({ type: 'ingredientList', ingredient: info })
    },
    addToken: function (token) {
      dispatch({ type: 'addToken', token: token })
    }
  }
}


function mapStateToProps(state) {
  return { recipeList: state.recipeList, /*list: state.list ,*/ token: state.token }
}



export default connect(
  mapStateToProps,
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
    justifyContent: 'space-between'
  },
  input: {
    borderWidth: 1,
    borderRadius: 20,
    height: 60,
    marginBottom: 20
  },
});
