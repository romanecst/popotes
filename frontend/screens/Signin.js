import React, { useState } from 'react';
import { Button, Overlay, Input, Avatar } from 'react-native-elements';
import { StyleSheet, Text, View , Image} from 'react-native';
import {Icon, Entypo} from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux'


function Signin({navigation, addToken}) {


  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  const [userExists, setUserExists] = useState(false)
  const [listErrorsSignin, setErrorsSignin] = useState([])


  const [visible, setVisible] = useState(true);




  var handleSubmitSignin = async () => {
 
    const data = await fetch('http://192.168.1.20:3000/sign-in', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`
    })

    const body = await data.json()

    if(body.result == true){
      console.log(body.token);
      addToken(body.token)
      setUserExists(true)
      
    }  else {
      setErrorsSignin(body.error)
    }
  }

  if(userExists){
    return navigation.navigate('List')
  }

  var tabErrorsSignin = listErrorsSignin.map((error,i) => {
    return(<Text>{error}</Text>)
  })

  



  const toggleOverlay = () => {
    setVisible(true);
  };



  return (
    <View>
      <Button title="Open Overlay" onPress={toggleOverlay} />

      <Overlay overlayStyle={{backgroundColor:'#dfe6e9', borderRadius: 50,}} isVisible={visible} onBackdropPress={toggleOverlay} >
        
        <View style={styles.overlay}>
          <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 25, marginLeft:100 }}>Sign-in{"\n"}{"\n"}</Text>
            <Avatar
                size="large"
                rounded
                title="LW"
                activeOpacity={1}
                containerStyle={{backgroundColor:"red",marginBottom:60,marginLeft:100}}
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
)(Signin);



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
      }
});