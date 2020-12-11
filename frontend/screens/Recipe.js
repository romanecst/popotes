import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Header, SearchBar, Button, Overlay } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import Checking from './components/checkingOverlay';

import { AntDesign, FontAwesome, Fontisto, Entypo } from '@expo/vector-icons';


import { connect } from 'react-redux';

function Recipe({ navigation, recipeInfo, ingredientList }) {
    const [visible, setVisible] = useState(false);
    const [servings, setServings] = useState(recipeInfo.servings);

    var instructions = recipeInfo.instructions.replace(/<li>|<ol>|<\/li>|<\/ol>/g, " ");

    var newIngredients = recipeInfo.extendedIngredients.map(function(ingredient, i){
        ingredient.amount = (servings*ingredient.amount)/recipeInfo.servings;
        if(!Number.isInteger(ingredient.amount)){
            ingredient.amount = ((servings*ingredient.amount)/recipeInfo.servings).toFixed(1);
        }
    return {name: ingredient.name, amount: ingredient.amount, measure: ingredient.measures.us.unitLong, aisle: ingredient.aisle, recipeName: recipeInfo.title}
    });

    var ingredients = recipeInfo.extendedIngredients.map(function(ingredient, i){
        var amount = (servings*ingredient.amount)/recipeInfo.servings;
        if(!Number.isInteger(amount)){
            amount = ((servings*ingredient.amount)/recipeInfo.servings).toFixed(1);
        }
    return <Text key={i} style={{ fontSize: 12 }}>{ingredient.name}: {amount} {ingredient.measures.us.unitLong} {'\n'}</Text>
    });

    var overlayIngredients = recipeInfo.extendedIngredients.map(function(ingredient, j){
        ingredient.amount = (servings*ingredient.amount)/recipeInfo.servings;
        if(!Number.isInteger(ingredient.amount)){
            ingredient.amount = ((servings*ingredient.amount)/recipeInfo.servings).toFixed(1);
        }
        return <Checking key={j} name={ingredient.name} quantity= {ingredient.amount} measure={ingredient.measures.us.unitLong}/>
    })

    const toggleOverlay = () => {
        setVisible(!visible);
    };


    return (


        <View style={{ flex: 1, backgroundColor: '#eefaea' }}>

            <Header
                containerStyle={{ backgroundColor: '#ade498', height: 90, paddingTop: 50 }}
                leftComponent={<AntDesign name="leftcircleo" size={24} color="white" />}
                centerComponent={{ text: 'RECETTE', style: { color: '#fff', fontFamily: 'Kohinoor Telugu' } }}
                rightComponent={<Fontisto name="shopping-basket" size={24} color="white" onPress={() => { navigation.navigate('List') }} />}
            />

            <ScrollView style={{ flex: 1, marginTop: 10 }}>
                <View style={styles.container}>
                    <Image style={styles.picture} source={{ uri: recipeInfo.image }} />
                </View>
                {/* ************* TITRE ********** */}
                <View style={styles.container}>
                    <View style={styles.title}>
                        <Text style={{ fontSize: 20 }}>{recipeInfo.title}</Text>
                    </View>
                    <View >
                        <View style={styles.detail1}>
                            {/* ************ DUREE RECETTE ************ */}
                            <Text> Préparation : {recipeInfo.readyInMinutes} </Text>
                        </View>
                        <View style={styles.detail1}>
                            {/* ************ NOMBRE DE PERSONNE RECETTE ************ */}
                            <Text> Nombre de personne : {servings}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.plus}>
                                {/* ************BOUTON + ************ */}
                                <Button
                                    title="+"
                                    onPress={() => setServings(servings + 1)}
                                    type="clear"
                                    buttonStyle={{ borderColor: 'white' }}
                                    titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu' }}
                                />
                            </View>
                            <View style={styles.moin}>
                                {/* ************BOUTON - ************ */}
                                <Button
                                    title="-"
                                    onPress={() => setServings(servings - 1)}
                                    type="clear"
                                    buttonStyle={{ borderColor: 'white' }}
                                    titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu' }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.title}>

                        <Text style={{ fontSize: 20 }}>**INGREDIENTS : **{"\n"}{"\n"}</Text>
                        {/* ************NOMBRE INGREDIENT *************/}
                        {ingredients}
                    </View>
                    <View style={styles.title}>
                        <Text style={{ fontSize: 20 }}>**DESCRIPTION : **{"\n"}{"\n"}</Text>
                        {/* ************DESCRIPTION *************/}
                        <Text style={{ fontSize: 12 }}>{instructions}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 70, justifyContent: 'space-between', alignItems: 'center', marginBottom: 50 }}>
                    <AntDesign name="heart" size={24} color="black" />
                    <FontAwesome name="list" size={24} color="black" onPress={()=>toggleOverlay()} />
                </View>
            </ScrollView>

            
            <Overlay overlayStyle={{ backgroundColor: '#dfe6e9', borderRadius: 50, marginHorizontal: 10 }} isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={styles.containerOverlay}>
          <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 18, marginHorizontal: 15 }}>You will add the ingredients to your shopping list:{"\n"}{"\n"}</Text>
          <Text style={{ fontFamily: 'Kohinoor Telugu', color: '#636e72', marginHorizontal: 50, fontSize:15 }}>check the ingredients you already have:</Text>
        </View>


        <View style={styles.ingredients}>

          <ScrollView>
            {/* code se trouve dans le composant "checkingOverlay" */}
            {overlayIngredients}
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
          onPress={() => { ingredientList(newIngredients); toggleOverlay(); navigation.navigate('GlobalList') }}
        />
        </View>
      </Overlay>

        </View>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        ingredientList: function(info) { 
            dispatch( {type: 'ingredientList', ingredient: info} ) 
        }
    }
}

function mapStateToProps(state) {
    return { recipeInfo: state.recipe }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Recipe);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    }, picture: {
        borderRadius: 30,
        width: 320,
        height: 300,
    }, title: {
        alignItems: 'center',
        backgroundColor: 'white',
        fontFamily: 'Kohinoor Telugu',
        width: 320,
        borderRadius: 30,
        padding: 12,
        marginBottom: 3
    }, detail1: {
        fontFamily: 'Kohinoor Telugu',
        backgroundColor: 'white',
        width: 320,
        borderRadius: 30,
        padding: 12,
        marginBottom: 3,
        alignItems: "center",
    }, plus: {
        fontFamily: 'Kohinoor Telugu',
        backgroundColor: 'white',
        width: 157,
        borderRadius: 30,
        marginBottom: 3,
        justifyContent: "flex-start",
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 0,
        marginBottom: 50,
    }, moin: {
        fontFamily: 'Kohinoor Telugu',
        backgroundColor: 'white',
        marginLeft: 3,
        width: 157,
        borderRadius: 30,
        marginBottom: 3,
        justifyContent: "flex-start",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 40,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 40,
        marginBottom: 50,
    },
    containerOverlay: {
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15
      }, 
      ingredients: {
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 10,
        paddingBottom: 15,
        paddingTop: 15,
        borderRadius: 30,
        height: 300,
      }
});

