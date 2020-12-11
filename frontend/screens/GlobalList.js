import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Switch, ScrollView } from 'react-native';
import { ListItem, Header, Button } from "react-native-elements";
import { CheckBox } from 'react-native-elements';


import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { connect } from 'react-redux';

import { Ionicons } from '@expo/vector-icons';

import Ingredient from './components/ingredientcheck';
import Recette from './components/recettecheck';


function GlobalList({ navigation, ingredientList, checkList, recipeInfo }) {

    // bouton toggle // 
    const [isEnabled, setIsEnabled] = useState(false);
    
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    console.log(ingredientList)

    var filteredIngredients = [];
    for(var s=0; s<ingredientList.length; s++){
        var list = ingredientList[s].filter( function( el ) {
            return !checkList.includes( el.name );
        } );
        filteredIngredients.push(list);
    }
      {/* code dans le composant "ingredientcheck" */}
    var category = []
    for(var a=0; a<filteredIngredients.length; a++){
        for(var b=0; b<filteredIngredients[a].length; b++){
            if(!category.includes(filteredIngredients[a][b].aisle) && !category.includes('Others')){
                if(filteredIngredients[a][b].aisle !== null){
                    category.push({category:filteredIngredients[a][b].aisle, ingredients:[]})
                }else{
                    category.push({category:'Others', ingredients:[]})
                }
            }
        }
    }
    console.log(category);

    filteredIngredients.forEach((elem)=>{
        elem.forEach(function(el){
            for(var c=0; c<category.length; c++){
                if(category[c].category === el.aisle){
                    category[c].ingredients.push(<Ingredient name={el.name} amount={el.amount} measure={el.measure}/>)
                }else if(category[c].category === 'Others' && el.aisle=== null){
                    category[c].ingredients.push(<Ingredient name={el.name} amount={el.amount} measure={el.measure}/>)
                }
            }
         })
    })

    console.log('CATTTTTT', category);

    var displayByCategory = category.map(function(element){
        return <View><Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 15, marginBottom: 5 }}>{element.category}</Text>{element.ingredients}</View>
    })


    var recipesMap = filteredIngredients.map((array)=>{
        var recipeName = '';
        var recipes = array.map(function(el, j){
            recipeName = el.recipeName;
            return  <Recette key={j} name={el.name} amount={el.amount} measure={el.measure}/> 
        })
    return <View><Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 15, marginBottom: 5 }}> {recipeName} </Text>{recipes}</View>
    })
    //  bouton radio // 
    // useEffect(()=>{
    // let finalList = []
    // for(let i=0; i<ingredientList.length; i++){
    //     let inList = false;
    //     for(let j=0; j<checkList.length; j++) {
    //         console.log('ingredient:', ingredientList[i].name, 'check:', checkList[j]);
    //         if(ingredientList[i].name == checkList[j]){
    //             inList = true;
    //         }
    //     };
    //     if(!inList){
    //         console.log('hello')
    //         finalList.push(ingredientList[i])
    //     }       
    // };
    // console.log('CHECK LIST',checkList);
    // console.log('INGREDIENT LIST',ingredientList);
    // console.log('FINAL LIST',finalList);
    // },[])
    // for(var j=0; j<checkList.length; j++) {
    //     ingredientList.forEach(element => {
    //         console.log('ELE',element)
    //     });
    // }
    
    

    if (isEnabled) {
        var ingredient = <ScrollView style={{height:380}}>{displayByCategory}</ScrollView>    
        var trier = "recette"
    } else {
        var ingredient = <ScrollView style={{height:380}}>
        {recipesMap}
        </ScrollView>
        var trier = "ingredient"

    }


    return (
        <View style={{ flex: 1, backgroundColor: '#FFF2DF' }}>

            {/* ------------------------- PARGE 1 TRIER PAR INGREDIENT ------------------------- */}
            <Header
                containerStyle={{ backgroundColor: '#febf63', height: 90, paddingTop: 50 }}
                leftComponent={<AntDesign name="leftcircleo" size={24} color="white" />}
                centerComponent={{ text: 'LIST', style: { color: '#fff', fontFamily: 'Kohinoor Telugu' } }}
                rightComponent={<Fontisto name="shopping-basket" size={24} color="white" onPress={() => { navigation.navigate('List') }} />}
            />
            <View style={styles.container}>
                <Text style={{ fontFamily: 'Kohinoor Telugu'}}> Trier par {trier} </Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#febf63" }}
                    thumbColor={isEnabled ? "#FFF2DF" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            {/* ------------------------- PARGE 2 TRIER PAR RECETTES ------------------------- */}
            <View style={styles.ingredients}>

                {/* ------------------------- CATEGOEIRE / INGREDIENT / QUANTITE ou GRAMMAGE ---------------DEBUT--------- */}
                <View>

                    {ingredient}

                </View>

                {/* ------------------------- CATEGOEIRE / INGREDIENT / QUANTITE ou GRAMMAGE ---------------FIN---------- */}
            </View>
            <View style={{ flexDirection: 'row', marginHorizontal: 20, justifyContent: 'center' }}>
                <View style={styles.ajoutListe}>
                    <MaterialIcons name="playlist-add" size={30} color="black" />
                </View>
                <View style={styles.okList}>
                    <Octicons name="checklist" size={26} color="black" />
                </View>
            </View>
            <Button
                iconRight={true}
                title="Store close to you"
                buttonStyle={{ borderColor: 'white', marginHorizontal: 70, borderRadius: 30, backgroundColor: '#febf63', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, marginBottom: 10 }}
                titleStyle={{ color: 'white', fontFamily: 'Kohinoor Telugu' }}
                icon={<Fontisto name="shopping-store" size={20} color="white" />}
            />
            <Button
                iconRight={true}
                title="Share with the group"
                buttonStyle={{ borderColor: 'white', marginHorizontal: 30, borderRadius: 30, backgroundColor: 'white', justifyContent: 'space-between', padding: 25, paddingHorizontal: 45 }}
                titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu' }}
                icon={<MaterialCommunityIcons name="account-group" size={36} color="black" />}
            />
        </View>
    );
}

function mapStateToProps(state) {
    return { ingredientList: state.ingredientList, checkList: state.checkList, recipeInfo: state.recipe}
}

export default connect(
    mapStateToProps,
    null
)(GlobalList);


const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        alignItems: 'center',
        flexDirection: "row",
        marginTop: 15,
        marginBottom: 15,
        marginHorizontal:90
    }, ingredients: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        padding: 20,
        marginBottom: 3,
        borderRadius: 30,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    }, ajoutListe: {
        justifyContent: "space-around",
        backgroundColor: 'white',
        alignItems: "center",
        padding: 20,
        borderRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        width: 168,
        marginBottom: 15
    }, okList: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 30,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 30,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        width: 165,
        marginBottom: 15,
        marginLeft: 3
    }
});