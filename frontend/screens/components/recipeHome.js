
import React, {useState, useEffect} from 'react';
import { AsyncStorage, StyleSheet, Text, View, Picker, ScrollView, TouchableOpacity, Image } from 'react-native';
import {Button, Overlay, Card, SearchBar} from 'react-native-elements';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

import {connect} from 'react-redux';
import { withNavigation } from 'react-navigation';

import OverlayCheck from './overlayCheckIngredient'



function RecipeHome(props){
    const [like, setLike] = useState(false)
    

function colorLike(){
    setLike(!like);
}


useEffect(()=>{
    if(like){
        var found = props.recipeList.find(element => element.title === props.recipeInfo.title)
        if(!found){
            props.saveRecipe(props.recipeInfo);
        }
    }else{
        props.deleteRecipe(props.recipeInfo.title);
    }
},[like])

var colorHeart;

var likes = props.recipeList.find(element => element.title == props.recipeInfo.title);

if(likes != undefined){
    colorHeart = {color:'#FF0000'}
}else{
    colorHeart = {color:'black'}
}

        return (
        <View >
        <Card containerStyle= {{width:200, height:190, borderRadius:20}}>
        <TouchableOpacity onPress={()=>{props.goToRecipe(props.recipeInfo); props.navigation.navigate('Recipe')}}>
            <Image source={{uri:props.image}} style={styles.small}/> 
            <Text style={{ textAlign: "center"}}>{props.title}</Text>
        </TouchableOpacity>
        <View style={styles.View}>
             <IconFontAwesome
            name="heart"
            size={20}
            style= {colorHeart}
            onPress={() => {colorLike() }}/>
            
        
           
            <IconFontAwesome
            name="list"
            size={20}
            color="#1e272e"
            />
            
            
            </View>
        </Card>
            
    </View>
) 
}
         

function mapDispatchToProps(dispatch) {
return {
    goToRecipe: function(info) { 
        dispatch( {type: 'recipeInfo', recipeInfo: info} ) 
    },
    saveRecipe: function(info) { 
        dispatch( {type: 'recipeList', recipeInfo: info} ) 
    },
    deleteRecipe: function(info) { 
        dispatch( {type: 'recipeListDel', title: info} ) 
    }
}
}

function mapStateToProps(state) {
    return { recipeList: state.recipeList }
  }
    

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(withNavigation(RecipeHome));

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