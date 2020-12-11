import React, { useState } from 'react';
import { Button, Overlay } from 'react-native-elements';
import { StyleSheet, Text, View, Switch, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import {withNavigation} from 'react-navigation';
import Checking from './checkingOverlay';

import { AntDesign, Fontisto, Entypo, Octicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

function OverlayCheck({navigation}) {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Overlay overlayStyle={{ backgroundColor: '#dfe6e9', borderRadius: 50, marginHorizontal: 10 }} isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={styles.container}>
          <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 18, marginHorizontal: 15 }}>You will add the ingredients to your shopping list:{"\n"}{"\n"}</Text>
          <Text style={{ fontFamily: 'Kohinoor Telugu', color: '#636e72', marginHorizontal: 50, fontSize:15 }}>check the ingredients you already have:</Text>
        </View>


        <View style={styles.ingredients}>

          <ScrollView>
            {/* code se trouve dans le composant "checkingOverlay" */}
            <Checking />
            <Checking />
          </ScrollView>

        </View>
        {/* DROP DOWN -- LIST HERE !!  */}
        <View style={{justifyContent:'center', alignItems:'center', marginVertical:10}}>
        <DropDownPicker
          items={[
            { label: 'Noel', value: 'item1' },
            { label: 'Weekend normandie', value: 'item2' },
          ]}
          defaultIndex={0}
          defaultNull placeholder="Select an list"
          containerStyle={{width: 150, height: 70}} 
          style={{marginBottom:10}}
          onChangeItem={item => console.log(item.label, item.value)}
        />
        <Button
          iconRight={true}
          title="Next  "
          buttonStyle={{ borderColor: 'white', marginHorizontal: 100, borderRadius: 30, backgroundColor: 'white', justifyContent: 'center' }}
          titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu'}}
          onPress={() => { navigation.navigate('List') }}
        />
        </View>
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
    marginHorizontal: 10,
    paddingBottom: 15,
    paddingTop: 15,
    borderRadius: 30,
    height: 300,
  }
});

export default withNavigation(OverlayCheck)