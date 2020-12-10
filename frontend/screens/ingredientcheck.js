import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Switch } from 'react-native';
import { CheckBox } from 'react-native-elements';

import { Entypo } from '@expo/vector-icons';

export default function Ingredients (){

    const [checked, setChecked] = useState();

return(
<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 12, marginLeft: 20 }}> ingredients : </Text>
    <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 12 }}>  100g </Text>
    <CheckBox checked={checked} checkedColor='#ADE498' onPress={() => { setChecked(!checked) }} />
    <Entypo name="cross" size={24} color="black" />
</View>

)}