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
        />
        <View style={styles.overlay}>
          <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 18 }}>Bienvenue dans la fonction, créer un groupe.{"\n"}Créer un groupe permet de partager ses courses avec ses amis {"\n"}{"\n"} ** video/screen de présentation**{"\n"}{"\n"}</Text>
          <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingBottom:30 }}>N'hésitez pas à créer votre premier groupe ! cliquez sur "créer un groupe" et laissez vous guider ! </Text>
          <Button
          title="CREER UN GROUPE"
          type="clear"
          buttonStyle={{justifyContent: 'center'}}
          titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu', paddingRight:40}}
        />
        </View>
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