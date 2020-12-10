import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Header, SearchBar, Button } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';

import { AntDesign, FontAwesome, Fontisto, Entypo } from '@expo/vector-icons';

import { connect } from 'react-redux';

function Recipe({ navigation, recipeInfo }) {
    const [servings, setServings] = useState(recipeInfo.servings);

    var ingredients = recipeInfo.extendedIngredients.map(function (ingredient, i) {
        var amount = (servings * ingredient.amount) / recipeInfo.servings;
        return <Text key={i} style={{ fontSize: 12 }}>{ingredient.name}: {amount} {ingredient.measures.us.unitLongd}</Text>
    });

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
                        <Text style={{ fontSize: 12 }}>mettre la farine dans un bol ...etc</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 70, justifyContent: 'space-between', alignItems: 'center', marginBottom: 50 }}>
                    <AntDesign name="heart" size={24} color="black" />
                    <FontAwesome name="list" size={24} color="black"/>
                </View>
            </ScrollView>
        </View>
    );
}

function mapStateToProps(state) {
    return { recipeInfo: state.recipe }
}

export default connect(
    mapStateToProps,
    null
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
    }
});

