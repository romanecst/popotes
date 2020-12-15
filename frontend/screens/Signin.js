import React, { useState } from 'react';
import { Button, Overlay, Input, Avatar } from 'react-native-elements';
import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native';
import {Icon, Entypo} from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';
import { withNavigation } from 'react-navigation';

import {baseURL} from '../screens/components/adressIP'


function Signin(props) {


  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  const [userExists, setUserExists] = useState(false)
  const [listErrorsSignin, setErrorsSignin] = useState([])


  const [visible, setVisible] = useState(true);




  var handleSubmitSignin = async () => {
 
    const data = await fetch(`${baseURL}/sign-in`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`
    })

    const body = await data.json()

    if(body.result == true){
      console.log(body.token);
      props.addToken(body.token)
      setUserExists(true)
      
    }  else {
      setErrorsSignin(body.error)
    }
  }

  if(userExists){
    return props.navigation.navigate(props.screen)
  }

  var tabErrorsSignin = listErrorsSignin.map((error,i) => {
    return(<Text>{error}</Text>)
  })

  



  const toggleOverlay = () => {
    setVisible(!visible);
  };



  return (
    <View>

      <Overlay overlayStyle={{backgroundColor:'#dfe6e9', justifyContent:'center', alignItems:'center'}} isVisible={visible} >
        
        <View style={styles.overlay}>
          <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 25, marginLeft:100 }}>Sign-in</Text>
            <Avatar
                size="medium"
                rounded
                title="LW"
                activeOpacity={1}
                containerStyle={{backgroundColor:"red",marginBottom:20,marginLeft:100}}
            />
             
            <Input
                containerStyle={styles.input}
                placeholder='Email'
                leftIcon={{ type: 'font-awesome', name: 'at' }}
                onChangeText={(val) => setSignInEmail(val)}
                val = {signInEmail}
            />
            <Input
                containerStyle={styles.input}
                placeholder='Password'
                leftIcon={{ type: 'font-awesome', name: 'unlock' }}
                onChangeText={(val) => setSignInPassword(val)}
                val = {signInPassword}
            />

              {tabErrorsSignin}

        <Button
          title="Sign-in"
          type="clear"
          buttonStyle={{ borderColor: 'white', justifyContent: 'center' }}
          titleStyle={{ color: 'red', fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingTop: 30 }}
          onPress={() => handleSubmitSignin()}
        />
        <TouchableOpacity><Text>Already have an account? Log in</Text></TouchableOpacity> 
        </View>
      </Overlay>
    </View>
  );
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
)(withNavigation(Signin));



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
});