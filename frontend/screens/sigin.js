import React, { useState } from 'react';
import { Button, Overlay, Input, Avatar } from 'react-native-elements';
import { StyleSheet, Text, View , Image} from 'react-native';
import { TouchableOpacity } from 'react-native';
import {Icon} from 'react-native-vector-icons/FontAwesome';


export default function App() {


  const [visible, setVisible] = useState(true);

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
                onPress={() => console.log("Works!")}
                activeOpacity={1}
                containerStyle={{backgroundColor:"red",marginBottom:60,marginLeft:100}}
            />
             
            <Input
                containerStyle={styles.input}
                placeholder='Email'
                leftIcon={{ type: 'font-awesome', name: 'at' }}
            />
            <Input
                containerStyle={styles.input}
                placeholder='Password'
                leftIcon={{ type: 'font-awesome', name: 'unlock' }}
            />
        <Button
          title="Sign-in"
          type="clear"
          buttonStyle={{ borderColor: 'white', justifyContent: 'center' }}
          titleStyle={{ color: 'red', fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingTop: 30 }}
        />
        </View>
      </Overlay>
    </View>
  );
}

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