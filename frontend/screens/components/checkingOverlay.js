import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Switch } from 'react-native';
import { CheckBox } from 'react-native-elements';

import { Entypo } from '@expo/vector-icons';
import {connect} from 'react-redux';

function Ingredients (props){

    const [checked, setChecked] = useState();

    useEffect(()=>{
        if(checked){
            var found = props.checkList.find(element => element.title === props.name)
            if(!found){
                props.addIngredient(props.name);
            }
        }else{
            props.deleteIngredient(props.name);
        }
    },[checked])

return(
<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 15, marginLeft: 20 }}>{props.name}: </Text>
    <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 15 }}>{props.quantity} {props.measure}</Text>
    </View>
    <CheckBox checked={checked} checkedColor='#ADE498' onPress={() => { setChecked(!checked) }} />
</View>
)}

function mapDispatchToProps(dispatch) {
    return {
        addIngredient: function(info) { 
            dispatch( {type: 'checkList', ingredient: info} ) 
        },
        deleteIngredient: function(info) { 
            dispatch( {type: 'delCheckList', ingredient: info} ) 
        }
    }
    }
    
function mapStateToProps(state) {
return { checkList: state.checkList }
}


export default connect(
mapStateToProps, 
mapDispatchToProps
)(Ingredients);