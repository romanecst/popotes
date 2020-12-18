import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, View, Text, Image, borderColor, TouchableOpacity, ImageBackground, ScrollView, AsyncStorage } from "react-native";
import { Button, ListItem, Header, Input, Overlay, Avatar } from "react-native-elements";

import { Ionicons, AntDesign, Fontisto, Entypo } from "@expo/vector-icons";

import { connect } from 'react-redux';

import { baseURL } from '../screens/components/adressIP'


function List(props) {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const [lists, setLists] = useState([])

  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  const [listErrorsSignin, setErrorsSignin] = useState([])

  const [visibleSignin, setVisibleSignin] = useState(false);
  const [visibleSignup, setVisibleSignup] = useState(false);

  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');



  const [listErrorSignUp, setListErrorSignUp] = useState([]);

  const toggleSignin = () => {
    setVisibleSignin(!visibleSignin);
  }

  const toggleSignup = () => {
    setVisibleSignup(!visibleSignup);
  }

  useEffect(() => {
    (async () => {
      AsyncStorage.getItem("user token",
        async function (error, data) {
          console.log('DATAT', data)
          if (data) {
            props.addToken(data);
            const dataFetch = await fetch(`${baseURL}/getMyLists`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: `token=${data}`
            });
            const body = await dataFetch.json();
            setLists(body)

          } else {
            setVisibleSignup(true);
          }
        })
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        } else {
          setHasPermission(true);
        }
      }
    })();
  }, []);

  var handleSubmitSignin = async () => {

    const data = await fetch(`${baseURL}/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`
    })

    const body = await data.json()

    if (body.result == true) {

      console.log(body.token);
      props.addToken(body.token);
      AsyncStorage.setItem("user token", body.token);
      toggleSignin();
      const dataFetch = await fetch(`${baseURL}/getMyLists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `token=${body.token}`
      });
      const bodyFetch = await dataFetch.json();
      setLists(bodyFetch)

    } else {
      setErrorsSignin(body.error)
    }
  }

  var tabErrorsSignin = listErrorsSignin.map((error, i) => {
    return (<Text>{error}</Text>)
  })

  var handleSubmitSignUp = async () => {

    const data = await fetch(`${baseURL}/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`
    })

    const body = await data.json()
    if (body.result == true) {
      props.addToken(body.token);
      AsyncStorage.setItem("user token", body.token);
      const dataFetch = await fetch(`${baseURL}/getMyLists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `token=${body.token}`
      });
      const bodyFetch = await dataFetch.json();
      setLists(bodyFetch)
      toggleSignup();


    } else {
      setListErrorSignUp(body.error)
    }
  }

  var tabErrorsSignup = listErrorSignUp.map((error, i) => {
    return (<Text>{error}</Text>)
  })

  const addList = async () => {
    var rawResponse = await fetch(`${baseURL}/addList`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `name=${text}&user=${props.token}`
    });
    var response = await rawResponse.json();
    setLists([...lists, response])
    setText('');
  }

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

  useEffect(() => { console.log('LISTSTSTTSTSTST', lists) }, [lists])

  if (lists.length == 0) {
    var listsShop =
      <View>
        <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 20, marginTop: 40, color: 'grey', marginLeft: 78 }}>No shopping list</Text>
        <Image
          style={{ width: 150, height: 150, marginLeft: 78 }}
          source={require('../assets/sad.png')} />
      </View>

  } else {
    var listsShop = lists.map((el, i) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 30, marginBottom: 12 }}>
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


      {/* -------------------------OVERLAY ----- SIGN IN/UP ---------------------------------- */}


      <Overlay overlayStyle={{ backgroundColor: '#dfe6e9', borderRadius: 50, }} isVisible={visibleSignin} >

<View style={styles.overlay}>
  <Button
    title="Return"
    type="clear"
    onPress={() => { props.navigation.goBack(null); toggleSignup() }}
    buttonStyle={{ borderColor: "#dfe6e9", justifyContent: "flex-start" }}
    titleStyle={{
      color: "black",
      fontFamily: "Kohinoor Telugu",
      fontSize: 11,
      marginRight: 35,
    }}
  />
  <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 25, marginLeft: 100, marginBottom: 20 }}>Sign-in</Text>

  <Input
    containerStyle={styles.input}
    placeholder='Email'
    leftIcon={{ type: 'font-awesome', name: 'at' }}
    onChangeText={(val) => setSignInEmail(val)}
    val={signInEmail}
    inputContainerStyle={{ borderBottomWidth: 0 }}
  />
  <Input
    containerStyle={styles.input}
    secureTextEntry={true}
    placeholder='Password'
    leftIcon={{ type: 'font-awesome', name: 'unlock' }}
    onChangeText={(val) => setSignInPassword(val)}
    val={signInPassword}
  />

  {tabErrorsSignin}


  <Button
    title="Sign-in"
    buttonStyle={{ backgroundColor: '#7FDBDA', borderRadius: 30, marginHorizontal: 80, marginBottom: 50 }}
    titleStyle={{ color: 'white', fontFamily: 'Kohinoor Telugu', marginHorizontal: 20 }}
    onPress={() => handleSubmitSignin()}
  />

  <TouchableOpacity onPress={() => { toggleSignup(); toggleSignin(); }}><Text style={{ marginTop: 10, fontStyle: 'italic' }}>Not registered yet ? <Text style={{ color: "#35abd5", textDecorationLine: 'underline' }}>Create an account</Text></Text>




  </TouchableOpacity>
</View>
</Overlay>


<Overlay overlayStyle={{ backgroundColor: '#dfe6e9', borderRadius: 50, }} isVisible={visibleSignup} >

<View style={styles.overlay}>
  <Button
    title="Return"
    type="clear"
    onPress={() => { props.navigation.goBack(null); toggleSignup() }}
    buttonStyle={{ borderColor: "#dfe6e9", justifyContent: "flex-start" }}
    titleStyle={{
      color: "black",
      fontFamily: "Kohinoor Telugu",
      fontSize: 11,
      marginRight: 35,
    }}
  />
  <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 25, marginLeft: 100, marginBottom: 40 }}>Sign-up</Text>

  <Input
    containerStyle={styles.input}
    placeholder='Username'
    leftIcon={{ type: 'font-awesome', name: 'user' }}
    onChangeText={(val) => setSignUpUsername(val)}
    val={signUpUsername}
    inputContainerStyle={{ borderBottomWidth: 0 }}
  />
  <Input
    containerStyle={styles.input}
    placeholder='Email'
    leftIcon={{ type: 'font-awesome', name: 'at' }}
    onChangeText={(val) => setSignUpEmail(val)}
    val={signUpEmail}
    inputContainerStyle={{ borderBottomWidth: 0 }}
  />
  <Input
    secureTextEntry={true}
    containerStyle={styles.input}
    placeholder='Password'
    leftIcon={{ type: 'font-awesome', name: 'unlock' }}
    onChangeText={(val) => setSignUpPassword(val)}
    val={signUpPassword}
    inputContainerStyle={{ borderBottomWidth: 0 }}
  />

  {tabErrorsSignup}

  <Button
    title="Sign-Up"
    buttonStyle={{ backgroundColor: '#7FDBDA', borderRadius: 30, marginHorizontal: 70 }}
    titleStyle={{ color: 'white', fontFamily: 'Kohinoor Telugu', marginHorizontal: 20 }}
    onPress={() => { handleSubmitSignUp() }}
  />
  <TouchableOpacity onPress={() => { toggleSignin(); toggleSignup(); }}><Text style={{ marginTop: 50, fontStyle: 'italic' }}>Already have an account ? <Text style={{ color: "#35abd5", textDecorationLine: 'underline' }}>Log in</Text></Text></TouchableOpacity>
</View>
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
