import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Header, SearchBar, Button } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';

import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default function Recipe({ navigation }) {

    const [searchTxt, setSearchTxt] = useState('')

    function updateSearch(search) {
        setSearchTxt(search)
    }


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
                    <Image style={styles.picture} source={require('../assets/bouf.jpg')} />
                </View>
                {/* ************* TITRE ********** */}
                <View style={styles.title}>
                    <Text style={{ fontSize: 20 }}>**TITLE RECIPE**</Text>
                </View>
                <View >
                    <View style={styles.detail1}>
                        {/* ************ DUREE RECETTE ************ */}
                        <Text> Préparation : 10 min </Text>
                    </View>
                    <View style={styles.detail1}>
                        {/* ************ NOMBRE DE PERSONNE RECETTE ************ */}
                        <Text> Nombre de personne : 6 </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.plus}>
                      {/* ************BOUTON + ************ */}
                            <Button
                                title="+"
                                type="clear"
                                buttonStyle={{ borderColor: 'white' }}
                                titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu' }}
                            />
                        </View>
                        <View style={styles.moin}>
                     {/* ************BOUTON - ************ */}
                            <Button
                                title="-"
                                type="clear"
                                buttonStyle={{ borderColor: 'white' }}
                                titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu' }}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.title}>
             {/* ************TITRE INGREDIENT *************/}
                    <Text style={{ fontSize: 20 }}>**INGREDIENT : **{"\n"}{"\n"}</Text>
             {/* ************NOMBRE INGREDIENT *************/}
                    <Text style={{ fontSize: 12 }}>oeuf : 2</Text>
                    <Text style={{ fontSize: 12 }}>ciboulette : 20 g</Text>
                </View>
                
            </ScrollView>
        </View>
    );
}

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
        marginLeft: 25,
        width: 320,
        borderRadius: 30,
        padding: 12,
        marginBottom: 3
    }, detail1: {
        fontFamily: 'Kohinoor Telugu',
        backgroundColor: 'white',
        marginLeft: 25,
        width: 320,
        borderRadius: 30,
        padding: 12,
        marginBottom: 3,
        alignItems: "center",
    }, plus: {
        fontFamily: 'Kohinoor Telugu',
        backgroundColor: 'white',
        marginLeft: 25,
        width: 155,
        borderRadius: 30,
        marginBottom: 3,
        justifyContent: "flex-start",
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 0,
        marginBottom:50,
    }, moin: {
        fontFamily: 'Kohinoor Telugu',
        backgroundColor: 'white',
        marginLeft: 5,
        width: 155,
        borderRadius: 30,
        marginBottom: 3,
        justifyContent: "flex-start",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 40,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 40,
        marginBottom:50,
    }
});

