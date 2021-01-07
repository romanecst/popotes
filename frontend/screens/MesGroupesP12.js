import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Input, Button, Avatar, Text, Header, Overlay } from "react-native-elements";
// import { Icon } from "react-native-vector-icons/FontAwesome";
import { AntDesign, Fontisto, MaterialIcons, Octicons } from "@expo/vector-icons";


import { baseURL } from '../screens/components/adressIP'
import { connect } from 'react-redux';
import IngredientGroup from './components/ingredientGroup'


//display shopping list from group
function MesGroupesP12(props) {

  const [user, setUser] = useState();
  const [groupName, setGroupName]= useState('');
  const [groupParticipants, setGroupParticipants]= useState([]);
  const [listName, setListName]= useState('');
  const [ingredients, setIngredients]= useState([]);
    const [visible, setVisible] = useState(false);
    const [text, setText] = useState('');


  const toggleOverlay = () => {
    setVisible(!visible);
  };
//get group info from back 
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

      var currentUser = response.users.filter(el => el.token == props.token);

      setUser(currentUser[0]);
//get ingredients from group list
      const rawReponseList= await fetch(`${baseURL}/getIngredients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${props.listInfo.id}`
      })
      const responseList = await rawReponseList.json();
 
      setListName(responseList.name)
      setIngredients(responseList.ingredients)


    }
    loadInfo();
  }, [])


  return (
    <View style={{ flex: 1, backgroundColor: "#e5f8f8" }}>

      {/* -------------------------HEADER---------------------------------- */}

      <Header
        containerStyle={{ backgroundColor: '#7FDBDA', height: 90, paddingTop: 50 }}
        leftComponent={<AntDesign name="leftcircleo" size={24} color="white" onPress={() => { props.navigation.navigate('MesGroupes') }} />}
        centerComponent={{ text: 'GROUP', style: { color: '#fff', fontFamily: 'Kohinoor Telugu' , fontSize:22} }}
        rightComponent={<Fontisto name="shopping-basket" size={24} color="white" onPress={() => { props.navigation.navigate('List') }} />}
      />

      <View style={{ alignItems: "center", justifyContent: 'center' }}>


        <Text h4 style={{ marginTop: 10, marginBottom: 8, fontFamily: 'Kohinoor Telugu' }}>{groupName}</Text>
        <Text h5 style={{ marginTop: 10, marginBottom: 15, fontFamily: 'Kohinoor Telugu', borderRadius: 17, borderWidth: 1, padding: 6 }}>{groupParticipants.length} participants</Text>

        {/* ------------AVATAR DANS LA SCROLL VIEW------------------ */}


        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.overlayH}>
          <View style={{ flexDirection: 'row' }}>
            {groupParticipants.map(function (el, i) {
              return <View style={{ alignItems: 'center' }}>
                <View style={{ borderWidth: 10, borderColor: el.salt, borderRadius: 100, marginRight: 5 }}>
                  <Avatar
                    rounded
                    title={el.username.substring(0,2)}
                    size={100}
                    source={{ uri: "" }}
                  />
                </View>
                <Text style={{ fontFamily: 'Kohinoor Telugu' }}>{el.username}</Text>
              </View>
            })}

          </View>
        </ScrollView >



        {/* ---------------Scroll des recettes  -------------- */}

        <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 18 }}>{listName}</Text>

        <ScrollView style={styles.scroll}>

          <View style={styles.blocScroll}>
            <Text>Ingredients :</Text>

              {ingredients.map(function(el, i){              
             return  <IngredientGroup key={i} ingredient={el} user={user}/>
              })
              }

          </View>

        </ScrollView>

        <View style={{ flexDirection: 'row', marginHorizontal: 20, justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => { toggleOverlay() }}>
            <View style={styles.ajoutListe}>
              <MaterialIcons name="playlist-add" size={30} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.okList}>
              <Octicons name="checklist" size={30} color="black" onPress={() => clearIngredientList()} />
            </View>
          </TouchableOpacity>
        </View>

      </View>
      {/* ------------------------------ OVERLAY -----------------------------------------------*/}
      <Overlay overlayStyle={{ backgroundColor: '#dfe6e9', borderRadius: 50, padding: 30 }} isVisible={visible} onBackdropPress={toggleOverlay} >
        <View style={styles.overlay}>
          <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingBottom: 30 }}>Add a product to your list : </Text>
          <Input placeholder='Product name'
            onChangeText={(value) => setText(value)}
            value={text} />
        </View>
      
        <Button
          title="Confirm"
          buttonStyle={{ backgroundColor: '#7FDBDA', padding: 10, borderRadius:30, marginHorizontal:30 }}
          titleStyle={{ color: 'white', fontFamily: 'Kohinoor Telugu' }}
          onPress={() => { toggleOverlay() }}
        />
      </Overlay>
    </View>
  );
}


const styles = StyleSheet.create({
  overlayH: {
    marginTop: 10,
    marginBottom: 8,
    width: 360,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  }, scroll: {
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    width: 330,
    height: 250,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 15
  }, ajoutListe: {
    justifyContent: "space-around",
    backgroundColor: 'white',
    alignItems: "center",
    padding: 20,
    borderRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    width: 164,
    marginBottom: 15,
    marginTop: 3
  },
  okList: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    width: 164,
    marginBottom: 15,
    marginLeft: 3,
    marginTop: 3
  }
});

function mapStateToProps(state) {
  return { tokenGroup: state.tokenGroup, token: state.token, listInfo: state.listInfo };
}


export default connect(mapStateToProps, null)(MesGroupesP12);