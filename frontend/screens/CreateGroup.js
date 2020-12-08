import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import { Button, Overlay } from 'react-native-elements';


import { Ionicons } from '@expo/vector-icons';


export default function CreateGroup({navigation}) {

    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
    };


    return (
        <ImageBackground source={require('../assets/Background.jpeg')} style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
        <Image style={{ width: 300, height: 300 }} source={require('../assets/logo.png')} />
        <Overlay overlayStyle={{backgroundColor:'#dfe6e9', borderRadius: 50}} isVisible={!visible} onBackdropPress={toggleOverlay} >
        <View style={styles.overlay}>
        <Button
          title="skip"
          type="clear"
          buttonStyle={{ borderColor: '#dfe6e9', justifyContent: 'flex-end' }}
          titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu', fontSize: 11, paddingBottom: 20, paddingRight:3 }}
          onPress={() => {navigation.navigate('Home');setVisible(true)}}

        />
          <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 18 }}>Welcome to the function, create a group.{"\n"}Creating a group allows you to share your shop with friends {"\n"}{"\n"} ** video/screen de présentation**{"\n"}{"\n"}</Text>
          <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingBottom:30 }}>Don't hesitate to create your first group! click on "create a group" and let yourself be guided!</Text>
          <Button
          title="CREATE A GROUP"
          type="clear"
          buttonStyle={{justifyContent: 'center'}}
          titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu'}}
          onPress={() => {navigation.navigate('GlobalGroup');setVisible(true)}}
        />
        </View>
      </Overlay>
         </View>
        </ImageBackground>
     
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }, overlay: {
        width: 290,
        margin: 18,
        justifyContent: 'center',
    }
});