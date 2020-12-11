
import React, { useState, useEffect } from 'react';
import { AsyncStorage, StyleSheet, Text, View, Picker, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Button, Overlay, Card, SearchBar } from 'react-native-elements';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import DropDownPicker from 'react-native-dropdown-picker';
import Checking from './checkingOverlay';


import OverlayCheck from './overlayCheckIngredient'





function RecipeHome(props) {
    const [like, setLike] = useState(false)


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
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Overlay overlayStyle={{ backgroundColor: '#dfe6e9', borderRadius: 50, marginHorizontal: 10 }} isVisible={visible} onBackdropPress={toggleOverlay}>
                    <View style={styles.overlay}>
                        <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 18, marginHorizontal: 15 }}>You will add the ingredients to your shopping list:{"\n"}{"\n"}</Text>
                        <Text style={{ fontFamily: 'Kohinoor Telugu', color: '#636e72', marginHorizontal: 50, fontSize: 15 }}>check the ingredients you already have:</Text>
                    </View>


                    <View style={styles.ingredients}>

                        <ScrollView>
                            {/* code se trouve dans le composant "checkingOverlay" */}
                            <Checking />
                            <Checking />
                        </ScrollView>

                    </View>
                    {/* DROP DOWN -- LIST HERE !!  */}
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                        <DropDownPicker
                            items={[
                                { label: 'Noel', value: 'item1' },
                                { label: 'Weekend normandie', value: 'item2' },
                            ]}
                            defaultIndex={0}
                            defaultNull placeholder="Select an list"
                            containerStyle={{ width: 150, height: 70 }}
                            style={{ marginBottom: 10 }}
                            onChangeItem={item => console.log(item.label, item.value)}
                        />
                        <Button
                            iconRight={true}
                            title="Next  "
                            buttonStyle={{ borderColor: 'white', marginHorizontal: 100, borderRadius: 30, backgroundColor: 'white', justifyContent: 'center' }}
                            titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu' }}
                            onPress={() => { props.navigation.navigate('List') }}
                        />
                    </View>
                </Overlay>
            </View>
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
    }, overlay: {
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