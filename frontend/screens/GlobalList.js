import React, { useState } from "react";
import { StyleSheet, Text, View, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Button, Overlay, Input } from "react-native-elements";


import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { connect } from 'react-redux';


import Ingredient from './components/ingredientcheck';
import Recette from './components/recettecheck';
import { withNavigationFocus } from 'react-navigation';



//display shopping list with ingredients displayed by recipe or by ingredient type
function GlobalList({ navigation, ingredientList, checkList, listInfo, clearIngredientList }) {

    const [isEnabled, setIsEnabled] = useState(false);
    const [visible, setVisible] = useState(false);
    const [text, setText] = useState('');

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const toggleOverlay = () => {
        setVisible(!visible);
    };
//only keeps ingredient from recipes which were not checked in the ingredient checklist (items the user already has)
    var filteredIngredients = [];
    for (var s = 0; s < ingredientList.length; s++) {
        var list = ingredientList[s].filter(function (el) {
            return !checkList.includes(el.name);
        });
        filteredIngredients.push(list);
    }
//converts an array of array into a simple array for an easier processing
    var simpleList = [];
    filteredIngredients.forEach((elem) => {
        elem.forEach(function (el) {
            simpleList.push(el)
        })
    })

    var category = {};
//sort ingredient by category 
    simpleList.forEach(function (el) {
        if (!(el.aisle in category) && !('Others' in category)) {
            if (el.aisle !== null && el.aisle !== '?') {
                category[el.aisle] = [<Ingredient name={el.name} amount={el.amount} measure={el.measure} />];
            } else {
                category['Others'] = [<Ingredient name={el.name} amount={el.amount} measure={el.measure} />];
            }
        } else {
            if (el.aisle in category) {
                category[el.aisle].push(<Ingredient name={el.name} amount={el.amount} measure={el.measure} />)
            } else if (el.aisle === null || el.aisle === '?') {
                category['Others'].push(<Ingredient name={el.name} amount={el.amount} measure={el.measure} />)
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
    simpleList.forEach(function (el) {
        if (!(el.recipeName in recipeCat)) {
            recipeCat[el.recipeName] = [<Recette id={el.id} name={el.name} amount={el.amount} measure={el.measure} />];
        } else {
            recipeCat[el.recipeName].push(<Recette id={el.id} name={el.name} amount={el.amount} measure={el.measure} />);
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
        var trier = "recette"
    } else {
        var ingredient = <ScrollView style={{ height: 380 }}>
            {recipesMap}
        </ScrollView>
        var trier = "ingredient"

    }

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
                <Text style={{ fontFamily: 'Kohinoor Telugu' }}> Trier par {trier} </Text>
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
                        <Octicons name="checklist" size={30} color="black" onPress={() => clearIngredientList()} />
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
                </View>
                
                <Button
                    title="Confirm"
                    buttonStyle={{ backgroundColor: '#febf63', padding: 10, borderRadius: 30, marginHorizontal: 30 }}
                    titleStyle={{ color: 'white', fontFamily: 'Kohinoor Telugu' }}
                    onPress={() => { toggleOverlay() }}
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
        clearIngredientList: function () {
            dispatch({ type: 'clearingredientList' })
        }
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