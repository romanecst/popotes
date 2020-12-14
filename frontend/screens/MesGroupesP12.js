import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet,Alert, TextInput} from "react-native";
import { Input, Button, Avatar, Accessory, Icon, Card, ListItem , CheckBox, Text, Header} from "react-native-elements";
// import { Icon } from "react-native-vector-icons/FontAwesome";
import { Ionicons, Entypo, AntDesign, Fontisto, MaterialIcons } from "@expo/vector-icons";

export default function MesGroupesP12() {

  const list = [
    {

      name: 'Jean-Michel ',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Achat des tomates',
      
    }
  
  ]
  

  return (
    <View style={{ flex:1, backgroundColor: "#e5f8f8" }}>



      {/* -------------------------HEADER---------------------------------- */}


      <Header
        containerStyle={{ backgroundColor: '#7FDBDA', height: 90, paddingTop: 50 }}
        leftComponent={<AntDesign name="leftcircleo" size={24} color="white" />}
        centerComponent={{ text: 'GROUPE', style: { color: '#fff', fontFamily: 'Kohinoor Telugu' } }}
        rightComponent={<Fontisto name="shopping-basket" size={24} color="white" onPress={() => { navigation.navigate('List') }} />}
      />


{/* ------------AVATAR DANS LA SCROLL VIEW------------------ */}

      <ScrollView showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={{ marginTop: 90, marginHorizontal: 10, marginBottom:20, paddingBottom:50 }}>
        <View >
          <Avatar
            rounded
            title="Jean"
            size={100}
            source={{
              uri:
                "https://geeko.lesoir.be/wp-content/uploads/sites/58/2020/05/avatar.jpg",
            }}  />
            <Text style={{textAlign:"center", fontFamily:'Kohinoor Telugu' }}>Jean Michel </Text>
        </View>
      </ScrollView >
      
      <View style={{alignItems:"center", marginBottom:10, marginTop:50}} >
          <Button
      buttonStyle={{ width: 230 , backgroundColor:"white", borderRadius:50}}
      containerStyle={{ margin: 0 }}
      disabledStyle={{
      borderWidth: 10,
      
      }}
      disabledTitleStyle={{ color: "#00F" }}
      title="Acheteur Principal"
      titleStyle={{ alignItems:"center" }}
      type="outline"
    />
      </View>

      <View style={{alignItems:"center", marginBottom:10, marginTop:20}} >
          <Button
      buttonStyle={{ width: 230 , backgroundColor:"white", borderRadius:50}}
      containerStyle={{ margin: 0 }}
      disabledStyle={{
      borderWidth: 60,
      borderColor: "black"
      }}
      disabledTitleStyle={{ color: "#00F" }}
      title="Acheteur Indépendant"
      titleStyle={{ alignItems:"center" }}
      type="outline" 
    />
      </View>

      {/* ---------------Scroll des recettes " sous forme de cards " -------------- */}
<ScrollView style={{ borderRadius:39, backgroundColor:"white"}} >
      <View style={{flexDirection:1, flexDirection:"column", width:400}} >
  {
    list.map((l, i) => (
      <ListItem key={i} bottomDivider style={{marginTop:5, Color:"red", vh:10}}>
        <Avatar source={{uri: l.avatar_url}} />
        <ListItem.Content>
          <ListItem.Title>{l.name}</ListItem.Title>
          <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    ))
  }
</View>
</ScrollView>
  
    </View>
  );
}
