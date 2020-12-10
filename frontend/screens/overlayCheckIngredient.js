import React, { useState } from 'react';
import { Button, Overlay } from 'react-native-elements';
import { StyleSheet, Text, View, Switch, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native'

import { AntDesign, Fontisto, Entypo, Octicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function OverlayCheck() {


  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Overlay overlayStyle={{ backgroundColor: '#dfe6e9', borderRadius: 50, marginHorizontal:10 }} isVisible={!visible} onBackdropPress={toggleOverlay} >
        <View style={styles.container}>
          <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 15, marginHorizontal: 15 }}>You will add the ingredients to your shopping list:{"\n"}{"\n"}</Text>
          <Text style={{ fontFamily: 'Kohinoor Telugu', color: '#636e72', marginHorizontal: 50 }}>check the ingredients you already have:</Text>
        </View>


        <View style={styles.ingredients}>
      
          <ScrollView>
         <Text> HELOOOOOOOO</Text>
          </ScrollView>
        
        </View>


        <Button
          iconRight={true}
          title="Next"
          buttonStyle={{ borderColor: 'white', marginHorizontal: 100, borderRadius: 30, backgroundColor: 'white', justifyContent: 'center' }}
          titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu' }}
        />
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15
  }, ingredients: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 15,
    marginHorizontal: 10,
    paddingBottom: 15,
    paddingTop: 15,
    borderRadius: 30,
    height:300,
  }
});