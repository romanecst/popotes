
import React, { useState, useEffect } from 'react';
import { AsyncStorage, StyleSheet, Text, View, Picker, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Button, Overlay, Card, SearchBar } from 'react-native-elements';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import DropDownPicker from 'react-native-dropdown-picker';
import Checking from './checkingOverlay';





function RecipeHome(props) {
    const [like, setLike] = useState(false);
    const [selectedList, setSelectedList] = useState();

    function colorLike() {
        setLike(!like);
    }


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

    var colorHeart;

    var likes = props.recipeList.find(element => element.title == props.recipeInfo.title);

    if (likes != undefined) {
        colorHeart = { color: '#FF0000' }
    } else {
        colorHeart = { color: 'black' }
    }

    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    var overlayIngredients = props.recipeInfo.extendedIngredients.map(function(ingredient, j){
        return <Checking key={j} name={ingredient.name} quantity= {ingredient.amount} measure={ingredient.measures.us.unitLong}/>
    });

    var newIngredients = props.recipeInfo.extendedIngredients.map(function(ingredient, i){
    return {name: ingredient.name, amount: ingredient.amount, measure: ingredient.measures.us.unitLong, aisle: ingredient.aisle, recipeName: props.recipeInfo.title}
    });


    if(props.list.length !== 0){
    var items = props.list.map(function(el){
        return { label: el.name, value: el._id }
    });
    items.unshift({ label: 'New List', value: 'new list' })
    }else{
    var items = { label: 'New List', value: 'new list' }
    }

    return (
        <View style={{ justifyContent: 'space-between' }}>
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => { props.goToRecipe(props.recipeInfo); props.navigation.navigate('Recipe') }}>
                        <Image source={{ uri: props.image }} style={styles.small} />
                        <Text style={{ textAlign: "center", fontFamily: 'Kohinoor Telugu', paddingHorizontal: 5 }}>{props.title}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bouton}>
                <View>
                    <Button
                        buttonStyle={styles.coeur}
                        icon={<IconFontAwesome
                            name="heart"
                            size={20}
                            style={colorHeart}
                            onPress={() => { colorLike() }} />} />
                </View>
                <View>
                    <Button
                        buttonStyle={styles.list}
                        onPress={() => toggleOverlay()}
                        icon={<IconFontAwesome
                            name="list"
                            size={20}
                            color="#1e272e"
                        />} />
                </View>
            </View>



            {/* ------------------------------ OVERLAY ------------------------------ */}
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
          items={items}
          defaultIndex={0}
          defaultNull placeholder="Select a list"
          containerStyle={{width: 150, height: 70}} 
          style={{marginBottom:10}}
          onChangeItem={item => setSelectedList({_id: item.value, name: item.label})}
        />
        <Button
          iconRight={true}
          title="Next  "
          buttonStyle={{ borderColor: 'white', marginHorizontal: 100, borderRadius: 30, backgroundColor: 'white', justifyContent: 'center' }}
          titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu'}}
          onPress={() => { props.currentList(selectedList); props.ingredientList(newIngredients); toggleOverlay(); props.navigation.navigate('GlobalList') }}
        />
        </View>
      </Overlay>
        </View>
    )
}


function mapDispatchToProps(dispatch) {
    return {
        goToRecipe: function (info) {
            dispatch({ type: 'recipeInfo', recipeInfo: info })
        },
        saveRecipe: function (info) {
            dispatch({ type: 'recipeList', recipeInfo: info })
        },
        deleteRecipe: function (info) {
            dispatch({ type: 'recipeListDel', title: info })
        },
        ingredientList: function(info) { 
            dispatch( {type: 'ingredientList', ingredient: info} ) 
        },
        currentList: function(info) { 
            dispatch( {type: 'listInfo', listInfo: info} ) 
        },
        saveList: function(info) { 
            dispatch( {type: 'addList', list: info} ) 
        },
    }
}


function mapStateToProps(state) {
    return { recipeList: state.recipeList,  list: state.list}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withNavigation(RecipeHome));

const styles = StyleSheet.create({
    container: {
        width: 172,
        height: 237,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#f3eef0',
        marginTop: 15,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    }, small: {
        width: 168,
        height: 150,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        marginBottom: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderWidth: 2,
        borderColor: '#f3eef0',
    }, bouton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2

    }, coeur: {
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderWidth: 2,
        borderColor: '#f3eef0',
        paddingHorizontal: 31
    }, list: {
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 30,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderWidth: 2,
        borderColor: '#f3eef0',
        paddingHorizontal: 30
    }, containerOverlay: {
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15
    }, ingredients: {
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 10,
        paddingBottom: 15,
        paddingTop: 15,
        borderRadius: 30,
        height: 300,

    }
})