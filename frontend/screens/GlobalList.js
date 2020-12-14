import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Switch, ScrollView } from 'react-native';
import { ListItem, Header, Button, Overlay, Input } from "react-native-elements";
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


function GlobalList({ navigation, ingredientList, checkList, recipeInfo, listInfo }) {

    const [isEnabled, setIsEnabled] = useState(false);
    const [visible, setVisible] = useState(false);
    const [text, setText] = useState('');

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    // useEffect(()=>{
    //     async function load(){

    //     };
    //     load();
    // },[])

    var filteredIngredients = [];
    for (var s = 0; s < ingredientList.length; s++) {
        var list = ingredientList[s].filter(function (el) {
            return !checkList.includes(el.name);
        });
        filteredIngredients.push(list);
    }

    var category = {};

    var simpleList = [];
    filteredIngredients.forEach((elem) => {
        elem.forEach(function (el) {
            simpleList.push(el)
        })
    })


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

    for (const key in category) {
        displayByCategory.push(<View><Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 15, marginBottom: 5 }}>{key}</Text>{category[key]}</View>);
    }

    var recipesMap = filteredIngredients.map((array) => {
        var recipeName = '';
        var recipes = array.map(function (el, j) {
            recipeName = el.recipeName;
            return <Recette key={j} name={el.name} amount={el.amount} measure={el.measure} />
        })
        return <View><Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 15, marginBottom: 5 }}> {recipeName} </Text>{recipes}</View>
    })


    if (isEnabled) {
        var ingredient = <ScrollView style={{ height: 380 }}>{displayByCategory}</ScrollView>
        var trier = "recette"
    } else {
        var ingredient = <ScrollView style={{ height: 380 }}>
            {recipesMap}
        </ScrollView>
        var trier = "ingredient"

    }


    useEffect(() => {
        return async () => {
            await fetch('http://192.168.1.87:3000/addIngredients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `list=${JSON.stringify(simpleList)}&listID=${listInfo._id}`
            });
        }
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF2DF' }}>

            {/* ------------------------- PARGE 1 TRIER PAR INGREDIENT ------------------------- */}
            <Header
                containerStyle={{ backgroundColor: '#febf63', height: 90, paddingTop: 50 }}
                leftComponent={<AntDesign name="leftcircleo" size={24} color="white" />}
                centerComponent={{ text: listInfo.name, style: { color: '#fff', fontFamily: 'Kohinoor Telugu' } }}
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

            {/* ------------------------------ OVERLAY -----------------------------------------------*/}
            <Overlay overlayStyle={{ backgroundColor: '#dfe6e9', borderRadius: 50, }} isVisible={visible} onBackdropPress={toggleOverlay} >
                <View style={styles.overlay}>
                    <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingBottom: 30 }}>Add a product to your list : </Text>
                    <Input placeholder='Product name'
                        onChangeText={(value) => setText(value)}
                        value={text} />
                </View>
                <Button
                    title="Confirm"
                    onPress={() => { toggleOverlay() }}
                    type="clear"
                    buttonStyle={{ borderColor: 'white', justifyContent: 'center' }}
                    titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingTop: 30 }}

                />
            </Overlay>
        </View>
    );
}

function mapStateToProps(state) {
    return { ingredientList: state.ingredientList, checkList: state.checkList, recipeInfo: state.recipe, listInfo: state.listInfo }
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