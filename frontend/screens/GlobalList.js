import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Switch } from 'react-native';
import { ListItem, Header } from "react-native-elements";

import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


import { Ionicons } from '@expo/vector-icons';


export default function Map({ navigation }) {


    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


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
                <Text style={{fontFamily: 'Kohinoor Telugu'}}> Trier par recette </Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#febf63" }}
                    thumbColor={isEnabled ? "#FFF2DF" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
       {/* ------------------------- PARGE 2 TRIER PAR RECETTES ------------------------- */}



        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems:'center',
        flexDirection: "row",
        marginTop:15
    //------------------------- STYLE 1 INGREDIENT ------------------------- 
    },
});