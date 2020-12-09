import React, { useState } from "react";
import { StyleSheet, Text, View, Switch, ScrollView } from 'react-native';
import { ListItem, Header, Button } from "react-native-elements";
import { CheckBox } from 'react-native-elements';


import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import { Ionicons } from '@expo/vector-icons';

import Ingredient from './ingredientcheck';

export default function Map({ navigation }) {

    // bouton toggle // 
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    //  bouton radio // 





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
                <Text style={{ fontFamily: 'Kohinoor Telugu' }}> Trier par recette </Text>
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
                    <ScrollView style={{ height: 300 }}>
                        <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 15, marginBottom: 10 }}> **CATEGORIE** : </Text>
                        <Ingredient />
                    </ScrollView>
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
                    title="Store close to you"
                    buttonStyle={{ borderColor: 'white', marginHorizontal: 70, borderRadius:30, backgroundColor:'#febf63', justifyContent:'space-between', paddingLeft:20, paddingRight:20, marginBottom:10 }}
                    titleStyle={{ color: 'white', fontFamily: 'Kohinoor Telugu' }}
                    icon={<Fontisto name="shopping-store" size={20} color="white" />}
                />
                <Button
                    title="Share with the group"
                    buttonStyle={{ borderColor: 'white', marginHorizontal: 30, borderRadius:30, backgroundColor:'white', justifyContent:'space-between', padding:25, paddingHorizontal:45 }}
                    titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu' }}
                    icon={<MaterialCommunityIcons name="account-group" size={36} color="black" />}
                />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: "row",
        marginTop: 15,
        marginBottom: 15
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
        marginBottom:15

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
        marginBottom:15,
        marginLeft:3

    }
});