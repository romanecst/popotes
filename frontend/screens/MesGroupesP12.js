import React, { useState } from "react";
import {
  View,
 
  ScrollView,
  TouchableOpacity,
  StyleSheet,Alert
} from "react-native";
import { Input, Button, Avatar, Accessory, Icon, Card, ListItem , CheckBox, Text,} from "react-native-elements";
import { TextInput } from "react-native";
// import { Icon } from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";

export default function MesGroupesP12() {

  const list = [
    {
      
      name: 'Jean-Michel ',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Achat des tomates',
      
    },
    {
      name: 'Albert',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Chips'
    },
    {
      name: 'Monique',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Epinard'
    },
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },{
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },

  
  
  
  
  
  
  
  
  
  ]
  

  return (
    <View style={{ marginTop: 50, backgroundColor: "#ADE498",alignItems:"center", marginBottom:10, marginTop:20 }}>
      <ScrollView showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={{ marginTop: 90, marginHorizontal: 10, marginBottom:20, paddingBottom:50 }}>
{/* ------------AVATAR DANS LA SCROLL VIEW------------------ */}
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
       

        <View >
          <Avatar
            rounded
            title="Mickael"
            size={100}
            source={{
              uri:
                "https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2FFAC.2Fvar.2Ffemmeactuelle.2Fstorage.2Fimages.2Factu.2Fnews-actu.2Fgrichka-bogdanoff-revele-ce-qui-a-modifie-son-visage-45378.2F14794182-1-fre-FR.2Fgrichka-bogdanoff-revele-ce-qui-a-modifie-son-visage.2Ejpg/1200x1200/quality/80/crop-from/center/grichka-bogdanoff-revele-ce-qui-a-modifie-son-visage.jpeg",
            }}  />
            <Text style={{textAlign:"center", fontFamily:'Kohinoor Telugu' }}>Jean Michel </Text>
        </View>

        <View >
          <Avatar
            rounded
            title="Jean"
            size={100}
            source={{
              uri:
                "https://cdn-www.konbini.com/fr/images/files/2016/06/cover-2-810x425-1.jpg?webp=",
            }}  />
            <Text style={{textAlign:"center", fontFamily:'Kohinoor Telugu' }}>Jean Michel </Text>
        </View>

        <View >
          <Avatar
            rounded
            title="Jean"
            size={100}
            source={{
              uri:
                "https://pixnio.com/free-images/2017/11/30/2017-11-30-18-14-56.jpg",
            }}  />
            <Text style={{textAlign:"center", fontFamily:'Kohinoor Telugu' }}>Jean Michel </Text>
        </View>

        <View >
          <Avatar
            rounded
            title="Jean"
            size={100}
            source={{
              uri:
                "https://resize-europe1.lanmedia.fr/r/622,311,forcex,center-middle/img/var/europe1/storage/images/europe1/politique/le-prix-de-la-personnalite-politique-de-lannee-decerne-a-xavier-bertrand-3853007/52079186-1-fre-FR/Le-prix-de-la-Personnalite-politique-de-l-annee-decerne-a-Xavier-Bertrand.jpg",
            }}  />
            <Text style={{textAlign:"center", fontFamily:'Kohinoor Telugu' }}>Jean Michel </Text>
        </View>

        <View >
          <Avatar
            rounded
            title="Jean"
            size={100}
            source={{
              uri:
                "https://cdn-europe1.lanmedia.fr/var/europe1/storage/images/europe1/politique/sondage-quelle-personnalite-politique-incarne-le-mieux-la-gauche-3923724/53580399-1-fre-FR/Sondage-quelle-personnalite-politique-incarne-le-mieux-la-gauche.jpg",
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
