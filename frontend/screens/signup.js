import React, { useState } from 'react';
import { Button, Overlay, Input, Avatar } from 'react-native-elements';
import { StyleSheet, Text, View , Image} from 'react-native';
import { TouchableOpacity } from 'react-native';
import {Icon} from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import { withNavigation } from 'react-navigation';

import {baseURL} from '../screens/components/adressIP'



function Signup(props) {


  const [visible, setVisible] = useState(true);

  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const [listErrorSignUp, setListErrorSignUp] = useState([]);


  var handleSubmitSignUp = async () => {

    const data = await fetch(`${baseURL}/sign-up`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`
    })

    const body = await data.json()
    if(body.result == true){
      props.addToken(body.token)
      props.navigation.navigate(props.screen)

    } else {
      setListErrorSignUp(body.error)
    }
  }

  var tabErrorsSignup = listErrorSignUp.map((error,i) => {
    return(<Text>{error}</Text>)
  })


  
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>

      <Overlay overlayStyle={{backgroundColor:'#dfe6e9', borderRadius: 50,}} isVisible={visible} >
        
        <View style={styles.overlay}>
          <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 25, marginLeft:100 }}>Sign-up{"\n"}{"\n"}</Text>
            <Avatar
                size="large"
                rounded
                title="LW"
                activeOpacity={1}
                containerStyle={{backgroundColor:"red",marginBottom:60,marginLeft:100}}
            />
             <Input
                containerStyle={styles.input}
                placeholder='Username'
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                onChangeText={(val) => setSignUpUsername(val)}
                val = {signUpUsername}
            />
            <Input
                containerStyle={styles.input}
                placeholder='Email'
                leftIcon={{ type: 'font-awesome', name: 'at' }}
                onChangeText={(val) => setSignUpEmail(val)}
                val = {signUpEmail}
            />
            <Input
                containerStyle={styles.input}
                placeholder='Password'
                leftIcon={{ type: 'font-awesome', name: 'unlock' }}
                onChangeText={(val) => setSignUpPassword(val)}
                val = {signUpPassword}
            />

            {tabErrorsSignup}

        <Button
          title="Sign-up"
          type="clear"
          buttonStyle={{ borderColor: 'white', justifyContent: 'center' }}
          titleStyle={{ color: 'red', fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingTop: 30 }}
          onPress={() => {handleSubmitSignUp()}}
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
)(withNavigation(Signup));



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