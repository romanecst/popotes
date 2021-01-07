import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Switch } from 'react-native';
import { CheckBox } from 'react-native-elements';

import { Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';

//display ingredient list by recipe in shopping list 
function Recette (props){

    const [checked, setChecked] = useState();

return(
<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 200 }}>
    <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 12, marginLeft: 20 }}> {props.name} </Text>
    <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 12 }}> {props.amount} {props.measure}</Text>
    </View>
    <CheckBox checked={checked} checkedColor='#ADE498' onPress={() => { setChecked(!checked) }} />
     {/*delete ingredient in redux store */}
    <Entypo name="cross" size={24} color="black" onPress={()=>{props.deleteingredientList(props.name)}}/>
</View>

)}

function mapDispatchToProps(dispatch) {
    return {
      deleteingredientList: function(info) { 
        dispatch( {type: 'delingredientList', name: info} ) 
      }
    }
  }
  
export default connect(
    null, 
    mapDispatchToProps
    )(Recette);