import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Button, Overlay, Input } from "react-native-elements";


import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { connect } from 'react-redux';

import { baseURL } from './components/adressIP'

import Ingredient from './components/ingredientcheck';
import Recette from './components/recettecheck';
import { withNavigationFocus } from 'react-navigation';



//display shopping list with ingredients displayed by recipe or by ingredient type
function GlobalList({ navigation, ingredientList, checkList, listInfo, clearIngredientList, addToList, addingredientList}) {

    const [isEnabled, setIsEnabled] = useState(false);
    const [visible, setVisible] = useState(false);
    const [text, setText] = useState('');
    const [textAmount, setTextAmount] = useState('');
    const [fav, setFav] = useState([]);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const Favourite = async()=>{
        const data = await fetch(`${baseURL}/getIngredients`, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `id=${listInfo._id}`
        });
        const body = await data.json();
        setFav(body.favorite_ingredient);
        return body.favorite_ingredient;
       
    }

    useEffect(()=>{
        (async function(){
        let add = await Favourite();
        addingredientList(add);
        })()
    },[])

//only keeps ingredient from recipes which were not checked in the ingredient checklist (items the user already has)
    let filteredIngredients= ingredientList.filter(el =>!checkList.includes(el.name));

    const FavouriteIngr = async(ingr)=>{
        let inFav = fav.filter(e=> e.name == ingr.name);
        if(inFav.length !== 0){
            let newArray = fav.filter(e=> e.name !== ingr.name);
            setFav(newArray);
            await fetch(`${baseURL}/delFavouriteIngredient`, {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `list=${listInfo._id}&ingredient=${JSON.stringify(newArray)}`
            });
        }else{
            await fetch(`${baseURL}/favouriteIngredient`, {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `list=${listInfo._id}&ingredient=${JSON.stringify(ingr)}`
            });
            setFav([...fav, ingr])
        }
       
    }

    const Clear = async()=>{
        let add = await Favourite();
        clearIngredientList(add)
    }

    var category = {};
    let isFav;
//sort ingredient by category 
    filteredIngredients.forEach(function (el) {
        isFav = fav.filter(e=> e.name == el.name);
        if(isFav.length !== 0){
            isFav = true;
        }else{
            isFav = false;
        }
        if (!(el.aisle in category) && !('Others' in category)) {
            if (el.aisle !== null && el.aisle !== '?') {
                category[el.aisle] = [<Ingredient ingr={el} name={el.name} amount={el.amount} measure={el.measure} IngredientsSelected={FavouriteIngr} isFav={isFav}/>];
            } else {
                category['Others'] = [<Ingredient ingr={el} name={el.name} amount={el.amount} measure={el.measure} IngredientsSelected={FavouriteIngr} isFav={isFav}/>];
            }
        } else {
            if (el.aisle in category) {
                category[el.aisle].push(<Ingredient ingr={el} name={el.name} amount={el.amount} measure={el.measure} IngredientsSelected={FavouriteIngr} isFav={isFav}/>)
            } else if (el.aisle === null || el.aisle === '?') {
                category['Others'].push(<Ingredient ingr={el} name={el.name} amount={el.amount} measure={el.measure} IngredientsSelected={FavouriteIngr} isFav={isFav}/>)
            }
        }
    })


    var displayByCategory = [];
//display ingredient by category
    for (const key in category) {
        displayByCategory.push(<View><Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 15, marginBottom: 5 }}>{key}</Text>{category[key]}</View>);
    }

    var recipeCat = {};
//sort ingredients by recipe
    filteredIngredients.forEach(function (el) {
        isFav = fav.filter(e=> e.name == el.name);
        if(isFav.length !== 0){
            isFav = true;
        }else{
            isFav = false;
        }
        if (!(el.recipeName in recipeCat)) {
            recipeCat[el.recipeName] = [<Recette ingr={el}  id={el.id} name={el.name} amount={el.amount} measure={el.measure} IngredientsSelected={FavouriteIngr} isFav={isFav}/>];
        } else {
            recipeCat[el.recipeName].push(<Recette ingr={el} id={el.id} name={el.name} amount={el.amount} measure={el.measure} IngredientsSelected={FavouriteIngr} isFav={isFav}/>);
        }
    })

    var recipesMap = []
//displays ingredient by recipe
    for (const key in recipeCat) {
        recipesMap.push(<View><Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 15, marginBottom: 5 }}>{key}</Text>{recipeCat[key]}</View>);
    }
//if display by recipe is chosen then displays by recipe and conversely
    if (isEnabled) {
        var ingredient = <ScrollView style={{ height: 380 }}>{displayByCategory}</ScrollView>
        var trier = "ingredients"
    } else {
        var ingredient = <ScrollView style={{ height: 380 }}>
            {recipesMap}
        </ScrollView>
        var trier = "recipe"

    }

    const addNewIngredient = async() =>{
  
        toggleOverlay(); 
        const data = await fetch(`${baseURL}/ingredientsDB`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `search=${text}`
        });
        const body = await data.json();
  
        let splitAmount = textAmount.split('');
        let nbr = '';
        let str = '';
        for(let i=0; i<splitAmount.length; i++){
            if(!isNaN(splitAmount[i]) ||  splitAmount[i] == '.' || splitAmount[i] == ','){
                if(splitAmount[i] == ','){
                    nbr += '.';
                }else{
                    nbr += splitAmount[i];
                }
            }else{
                str +=  splitAmount[i];
            }
        }
        nbr = parseFloat(nbr);
        addToList({aisle: body, amount: nbr, measure: str, name: text, recipeName: "Other"}); 
        setText(''); 
        setTextAmount('');
    }
     
    async function saveToDB(){
        await fetch(`${baseURL}/addIngredients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `list=${listInfo._id}&ingredients=${JSON.stringify(filteredIngredients)}`
      });}
    
    useEffect(()=>{
        if(ingredientList){
            saveToDB()
        }
    },[ingredientList])


    return (
        <View style={{ flex: 1, backgroundColor: '#FFF2DF' }}>

            {/* ------------------------- PARGE 1 TRIER PAR INGREDIENT ------------------------- */}
            <Header
                containerStyle={{ backgroundColor: '#febf63', height: 90, paddingTop: 50 }}
                leftComponent={<AntDesign name="leftcircleo" size={24} color="white" onPress={() => { navigation.navigate('List') }} />}
                centerComponent={{ text: listInfo.name, style: { color: '#fff', fontFamily: 'Kohinoor Telugu' , fontSize:22} }}
                rightComponent={<Fontisto name="shopping-basket" size={24} color="white" onPress={() => { navigation.navigate('List') }} />}
            />
            <View style={styles.container}>
                <Text style={{ fontFamily: 'Kohinoor Telugu' }}> Sorted by {trier} </Text>
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
                <TouchableOpacity onPress={() => { toggleOverlay() }}>
                    <View style={styles.ajoutListe}>
                        <MaterialIcons name="playlist-add" size={30} color="black" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.okList}>
                        <Octicons name="checklist" size={30} color="black" onPress={() => Clear()} />
                    </View>
                </TouchableOpacity>
            </View>

            <Button
                iconRight={true}
                title="Share with the group"
                buttonStyle={{ borderColor: 'white', marginHorizontal: 30, borderRadius: 30, backgroundColor: 'white', justifyContent: 'space-between', padding: 12, paddingHorizontal: 45 }}
                titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu' }}
                icon={<MaterialCommunityIcons name="account-group" size={36} color="black" />}
            />

            {/* ------------------------------ OVERLAY -----------------------------------------------*/}
            <Overlay overlayStyle={{ backgroundColor: '#dfe6e9', borderRadius: 30, padding: 30 }} isVisible={visible} onBackdropPress={toggleOverlay} >
                <View style={styles.overlay}>
                    <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingBottom: 30 }}>Add a product to your list : </Text>
                    <Input placeholder='Product name'
                        onChangeText={(value) => setText(value)}
                        value={text} />
                    <Input placeholder='Product amount'
                    onChangeText={(value) => setTextAmount(value)}
                    value={textAmount} />
                </View>
                
                <Button
                    title="Confirm"
                    buttonStyle={{ backgroundColor: '#febf63', padding: 10, borderRadius: 30, marginHorizontal: 30 }}
                    titleStyle={{ color: 'white', fontFamily: 'Kohinoor Telugu' }}
                    onPress={() => addNewIngredient()}
                />
            </Overlay>
        </View>
    );
}

function mapStateToProps(state) {
    return { ingredientList: state.ingredientList, checkList: state.checkList, recipeInfo: state.recipe, listInfo: state.listInfo }
}

function mapDispatchToProps(dispatch) {
    return {
        clearIngredientList: function (fav) {
            dispatch({ type: 'clearingredientList', fav })
        },
        addToList: function (ingr) {
            dispatch({ type: 'addIngr', ingr })
        },
        addingredientList: function (info) {
            dispatch({ type: 'ingredientList', ingredient: info })
          },
    }
}


var globalListScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(GlobalList);

export default withNavigationFocus(globalListScreen);


const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        alignItems: 'center',
        flexDirection: "row",
        marginTop: 15,
        marginBottom: 15,
        marginHorizontal: 90
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