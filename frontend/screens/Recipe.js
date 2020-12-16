import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Header, SearchBar, Button, Overlay } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import Checking from './components/checkingOverlay';

import { AntDesign, FontAwesome, Fontisto, Entypo } from '@expo/vector-icons';

import { connect } from 'react-redux';


function Recipe(props) {
    const [visible, setVisible] = useState(false);
    const [servings, setServings] = useState(props.recipeInfo.servings);
    const [selectedList, setSelectedList] = useState();
    const [like, setLike] = useState(false);


    var instructions = props.recipeInfo.instructions.replace(/<li>|<ol>|<\/li>|<\/ol>/g, " ");

    var newIngredients = props.recipeInfo.extendedIngredients.map(function(ingredient, i){
        ingredient.amount = (servings*ingredient.amount)/props.recipeInfo.servings;
        if(!Number.isInteger(ingredient.amount)){
            ingredient.amount = ((servings*ingredient.amount)/props.recipeInfo.servings).toFixed(1);
        }
        console.log('IDDDDD',ingredient._id)
    return {id:ingredient.id, name: ingredient.name, amount: ingredient.amount, measure: ingredient.measures.us.unitLong, aisle: ingredient.aisle, recipeName: props.recipeInfo.title}
    });

    var ingredients = props.recipeInfo.extendedIngredients.map(function(ingredient, i){
        var amount = (servings*ingredient.amount)/props.recipeInfo.servings;
        if(!Number.isInteger(amount)){
            amount = ((servings*ingredient.amount)/props.recipeInfo.servings).toFixed(1);
        }
    return <Text key={i} style={{ fontSize: 18 }}>{ingredient.name}: {amount} {ingredient.measures.us.unitLong} {'\n'}</Text>
    });

    var overlayIngredients = props.recipeInfo.extendedIngredients.map(function(ingredient, j){
        ingredient.amount = (servings*ingredient.amount)/props.recipeInfo.servings;
        if(!Number.isInteger(ingredient.amount)){
            ingredient.amount = ((servings*ingredient.amount)/props.recipeInfo.servings).toFixed(1);
        }
        return <Checking key={j} name={ingredient.name} quantity= {ingredient.amount} measure={ingredient.measures.us.unitLong}/>
    })

    const toggleOverlay = () => {
        setVisible(!visible);
    };
// ------------------------------------------------GESTION DU LIKE DANS LE DETAIL RECETTE -------------------------------
   
useEffect(() => {
        if (like) {
            var found = props.recipeList.find(element => element.title === props.recipeInfo.title)
            if (!found) {
                props.saveRecipe(props.recipeInfo);
            }
        } else {
            props.deleteRecipe(props.recipeInfo.title);
        }
    }, [like])

    var likes = props.recipeList.find(element => element.title == props.recipeInfo.title);
    var colorHeart;

    const colorLike = () =>{
        setLike(!like);
    }

    if (likes != undefined) {
        colorHeart ='#FF0000'
    } else {
        colorHeart ='black'
    }
    


    return (


        <View style={{ flex: 1, backgroundColor: '#eefaea' }}>

            <Header
                containerStyle={{ backgroundColor: '#ade498', height: 90, paddingTop: 50 }}
                leftComponent={<AntDesign name="leftcircleo" size={24} color="white" onPress={() => {props.navigation.goBack(null) }}  />}
                centerComponent={{ text: 'RECETTE', style: { color: '#fff', fontFamily: 'Kohinoor Telugu' } }}
                rightComponent={<Fontisto name="shopping-basket" size={24} color="white" onPress={() => { props.navigation.navigate('List') }} />}
            />

            <ScrollView style={{ flex: 1, marginTop: 10 }}>
                <View style={styles.container}>
                    <Image style={styles.picture} source={{ uri: props.recipeInfo.image }} />
                </View>
                {/* ************* TITRE ********** */}
                <View style={styles.container}>
                    <View style={styles.title}>
                        <Text style={{ fontSize: 22 }}>{props.recipeInfo.title}</Text>
                    </View>
                    <View >
                        <View style={styles.detail1}>
                            {/* ************ DUREE RECETTE ************ */}
                            <Text style={{fontSize:18}}> Préparation : {props.recipeInfo.readyInMinutes} </Text>
                        </View>
                        <View style={styles.detail1}>
                            {/* ************ NOMBRE DE PERSONNE RECETTE ************ */}
                            <Text style={{fontSize:18}}> Nombre de personne : {servings}</Text>
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
                                    onPress={() => { if(servings >0){setServings(servings - 1)}}}
                                    type="clear"
                                    buttonStyle={{ borderColor: 'white' }}
                                    titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu' }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.title}>

                        <Text style={{ fontSize: 22 }}>INGREDIENTS : {"\n"}</Text>
                        {/* ************NOMBRE INGREDIENT *************/}
                        {ingredients}
                    </View>
                    <View style={styles.title}>
                        <Text style={{ fontSize: 22 }}>DESCRIPTION :{"\n"}</Text>
                        {/* ************DESCRIPTION *************/}
                        <Text style={{ fontSize: 18 }}>{instructions}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginHorizontal:100, marginBottom:50}}>
                <View style={{backgroundColor:'white', padding:15, borderRadius:30}}>
                   <Button 
                   buttonStyle={{ borderColor: 'white', backgroundColor: 'white' }}
                   icon={<AntDesign 
                    name="heart" 
                    size={24} 
                    color={colorHeart} 
                    onPress={()=>colorLike()} /> } /> 
                </View>
                <View style={{backgroundColor:'white', padding:15, borderRadius:30}}>
                <FontAwesome name="list" size={24} color="black" onPress={()=>toggleOverlay()} />
                </View>
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
          items={props.list.map(function(el){
            return { label: el.name, value: el._id }
        })}
          defaultIndex={0}
          defaultNull placeholder="Select an list"
          containerStyle={{width: 150, height: 70}} 
          style={{marginBottom:10}}
          onChangeItem={item => setSelectedList({_id: item.value, name: item.label})}
        />
        <Button
          iconRight={true}
          title="Next  "
          buttonStyle={{ borderColor: 'white', marginHorizontal: 100, borderRadius: 30, backgroundColor: 'white', justifyContent: 'center' }}
          titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu'}}
          onPress={() => {  props.currentList(selectedList); props.ingredientList(newIngredients); toggleOverlay(); props.navigation.navigate('GlobalList') }}
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
        },
        currentList: function(info) { 
            dispatch( {type: 'listInfo', listInfo: info} ) 
        }, 
        saveRecipe: function (info) {
            dispatch({ type: 'recipeList', recipeInfo: info })
        },
        deleteRecipe: function (info) {
            dispatch({ type: 'recipeListDel', title: info })
        },
    }
}

function mapStateToProps(state) {
    return { recipeInfo: state.recipe,  list: state.list, recipeList: state.recipeList }
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
        borderRadius: 10,
        padding: 12,
        marginBottom:15
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

