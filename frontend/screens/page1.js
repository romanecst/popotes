import React, { useState } from 'react';
import { StyleSheet, View, Image, ImageBackground, TouchableOpacity,} from 'react-native';
import {Text, Button, Overlay} from 'react-native-elements';

export default function welcome() {

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <ImageBackground source={require('./assets/background.jpeg')} style={{flex: 1}}>
    <View style={styles.container}>
    <Image style={{width:300, height:300}} source={require('./assets/logo.png')} /> 
      <Text h1 style={{marginTop:120, color:'#FFFF', fontFamily: 'Kohinoor Telugu'}}>Welcome ! </Text>
      <Button      
           title="Suivant"
           type="outline"
           buttonStyle={{ borderColor:'#dfe6e9', marginTop:220, padding:10 }}
           titleStyle={{color:'#dfe6e9',fontFamily: 'Kohinoor Telugu', fontSize:20 }}
           onPress= {toggleOverlay}
      />
      <Overlay overlayStyle={{backgroundColor:'#dfe6e9', borderRadius: 50,}} isVisible={visible} onBackdropPress={toggleOverlay} >
        <Button
          title="passer"
          type="clear"
          buttonStyle={{ borderColor: '#dfe6e9', justifyContent: 'flex-end' }}
          titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu', fontSize: 11, paddingBottom: 20, paddingRight:17 }}
        />
        <View style={styles.overlay}>
          <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 18 }}>Let me learn more about you...{"\n"}{"\n"}</Text>
          <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingBottom:30 }}>First, select your preferences : </Text>
            <View style={styles.prefalim}>
              <TouchableOpacity style={styles.picto} activeOpacity={0.3}>
                <Image style={{width:100, height:100}}
                  source={require('./assets/noGluten.png')}
                />
                <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 11 }}>Gluten free</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.picto} activeOpacity={0.3}>
                <Image style={{width:100, height:100}}
                  source={require('./assets/noMeat.png')}
                />
                <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 11 }}>Vegetarian</Text>
              </TouchableOpacity>
              </View>
              <View style={styles.prefalim}>
              <TouchableOpacity style={styles.picto} activeOpacity={0.3}>
                <Image style={{width:100, height:100}}
                  source={require('./assets/noMilk.png')}
                />
                <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 11 }}>Lactiose free</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.picto} activeOpacity={0.3}>
                <Image style={{width:100, height:100}}
                  source={require('./assets/vegetalien.png')}
                />
                <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 11 }}>Vegan</Text>
              </TouchableOpacity>
            </View>
        <Button
          title="suivant"
          type="clear"
          buttonStyle={{ borderColor: 'white', justifyContent: 'flex-end' }}
          titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingTop: 30 }}
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
    justifyContent: 'flex-start',
      },overlay: {
        width: 290,
        margin:18,
        justifyContent: 'center',
      }, prefalim: {
        alignItems: 'center',
        justifyContent:'center',
        flexDirection:'row',
      }, picto: {
        alignItems: 'center',
        justifyContent:'center',
        margin:15,
      }
});

