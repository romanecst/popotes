import React, { useState } from 'react';
import { Button, Overlay, Input, Avatar } from 'react-native-elements';
import { StyleSheet, Text, View , Image, TouchableOpacity, AsyncStorage} from 'react-native';
import {Icon, Entypo} from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';
import { withNavigation } from 'react-navigation';

import {baseURL} from './components/adressIP'


function Sign(props) {


  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [userExists, setUserExists] = useState(false)
  const [listErrorsSignin, setErrorsSignin] = useState([])

  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [listErrorSignUp, setListErrorSignUp] = useState([]);

  const [visible, setVisible] = useState(true);
  const [signin, setSignin] = useState(false);


  var handleSubmitSignin = async () => {

    const data = await fetch(`${baseURL}/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`
    })

    const body = await data.json()
    console.log('body', body);
    if (body.result == true) {

      console.log(body.token);
      await AsyncStorage.setItem("user token", body.token);
      props.addToken(body.token);
      toggleOverlay();

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
      await AsyncStorage.setItem("user token", body.token);
      props.addToken(body.token);
      toggleOverlay();


    } else {
      setListErrorSignUp(body.error)
    }
  }

  var tabErrorsSignup = listErrorSignUp.map((error, i) => {
    return (<Text>{error}</Text>)
  })


  const toggleOverlay = () => {
    setVisible(!visible);
  };


if(!signin){
  return (
    <Overlay overlayStyle={{ backgroundColor: '#dfe6e9', borderRadius: 50, }} isVisible={visible} >

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
      <TouchableOpacity  style={styles.touch} onPress={() =>setSignin(true)}><Text style={{ marginTop: 50, fontStyle: 'italic' }}>Already have an account ? <Text style={{ color: "#35abd5", textDecorationLine: 'underline' }}>Log in</Text></Text></TouchableOpacity>
    </View>
    </Overlay>
  );
}else{
  return (
    <Overlay overlayStyle={{ backgroundColor: '#dfe6e9', borderRadius: 50, }} isVisible={visible} >
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
        secureTextEntry={true}
        containerStyle={styles.input}
        placeholder='Password'
        leftIcon={{ type: 'font-awesome', name: 'unlock' }}
        onChangeText={(val) => setSignInPassword(val)}
        val={signInPassword}
        inputContainerStyle={{ borderBottomWidth: 0 }}
      />

      {tabErrorsSignin}


      <Button
        title="Sign-in"
        buttonStyle={{ backgroundColor: '#7FDBDA', borderRadius: 30, marginHorizontal: 80, marginBottom: 50 }}
        titleStyle={{ color: 'white', fontFamily: 'Kohinoor Telugu', marginHorizontal: 20 }}
        onPress={() => handleSubmitSignin()}
      />

      <TouchableOpacity style={styles.touch} onPress={() =>setSignin(false)}><Text style={{ marginTop: 50, fontStyle: 'italic' }}>Not registered yet ? <Text style={{ color: "#35abd5", textDecorationLine: 'underline' }}>Create an account</Text></Text></TouchableOpacity>
    </View>
    </Overlay>
  );
}
}



function mapDispatchToProps(dispatch){
  return {
    addToken: function(token){
      dispatch({type: 'addToken', token: token})
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withNavigation(Sign));



const styles = StyleSheet.create({
    overlay: {
        width: 290,
        margin:18,
        justifyContent: 'center',
      },
    input:{
        borderWidth:1,
        borderRadius:20,
        height:60,
        marginBottom:20
      },
    touch:{
      height:70
    }
});