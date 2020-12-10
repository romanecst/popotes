
import React, {useState, useEffect} from 'react';
import { AsyncStorage, StyleSheet, Text, View, Picker, ScrollView, TouchableOpacity, Image } from 'react-native';
import {Button, Overlay, Card, SearchBar} from 'react-native-elements';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';



export default function RecipeLike(props){

    const [like, setLike] = useState(false);
    const [recipeHome, setRecipeHome] = useState([]);

    // useEffect(() => {
    //        async function SaveRecipe(){
    //          await AsyncStorage.getItem("recipeList",
    //         function(err, data) {                
    //           var userData = JSON.parse(data); 
    //           console.log('test USERDATA lalalal', userData);
             
    //         //   setRecipeHome(userData)
                
    //         } )
    //     }
    //     SaveRecipe()
    // },[])

    useEffect(() => {
        setRecipeHome([...recipeHome, userData])
        // AsyncStorage.setItem("recipeList", JSON.stringify(recipeHome));
        console.log("test recipe Home lEILA ", recipeHome)
 },[recipeHome])

var userDataRecipe = {picture: props.image, title:props.title}

function colorLike(userDataRecipe){
    // var recipeList = AsyncStorage.getItem("recipeList")
    // recipeList.push()
    // AsyncStorage.setItem("recipeList", JSON.stringify(userDataRecipe))
    setLike(!like);
    
}

var saveList = async function SaveRecipe(){
    await AsyncStorage.getItem("recipeList",
   function(err, data) { 
       var userData = JSON.parse(data); 
     console.log('test USERData', userData);
       })}

saveList();


 

var colorHeart;

 if(like===true){
    colorHeart = {color:'#FF0000'}
} else {
   colorHeart = {color:'black'}
}
        return (
        <View >
        <Card containerStyle= {{width:200, height:190, borderRadius:20}}>
        <Image source={{uri:props.image}} style={styles.small}/> 
    <Text style={{ textAlign: "center"}}>{props.title}</Text>
        <View style={styles.View}>
             <IconFontAwesome
            name="heart"
            size={20}
            style= {colorHeart}
            onPress={() => {colorLike(userDataRecipe) }}/>
            
        
           
            <IconFontAwesome
            name="list"
            size={20}
            color="#1e272e"
            onPress={() => {colorLike()}}/>
            
            
            </View>
        </Card>
    </View>
         ) }
         const styles = StyleSheet.create({
        small: {
                width: 170,
                height: 100,
                borderRadius:20,
             
             },
         View:{
            flexDirection:'row',
            justifyContent:'space-between',
            marginTop: 20,
        }
    })