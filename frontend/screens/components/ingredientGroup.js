import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Switch } from 'react-native';
import { CheckBox } from 'react-native-elements';
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox';

import { Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { baseURL } from './adressIP'

function IngredientGroup (props){

  const [checked, setChecked] = useState(false);

  useEffect(()=>{
    if(props.ingredient.buyer){
        setChecked(true)}
  },[])

  if(props.ingredient.buyer){
    var color = props.ingredient.buyer;
  }else{
    var color = props.user.salt;
  }  
  
  async function sendIngredient(){
    setChecked(!checked);
    props.ingredient.buyer = props.user.salt;

    const rawReponse = await fetch(`${baseURL}/sendIngredient`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `ingredient=${JSON.stringify(props.ingredient)}&list=${props.listInfo.id}`
    })
    const response = await rawReponse.json();
  }

return(
<View style={{ alignItems: 'center', marginTop: 20, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={{marginRight:40}}> {props.ingredient.name} : {props.ingredient.amount} {props.ingredient.measure}</Text>
                <CircleCheckBox
                  checked={checked}
                  onToggle={() => sendIngredient()}
                  labelPosition={LABEL_POSITION.LEFT}
                  outerColor='black'
                  innerColor={color}
                  innerSize='20'
                  outerSize='26'
                />
                <Button title='' icon={<Entypo name="cross" size={24} color="black" />} buttonStyle={{ backgroundColor: '#FFFFFF', padding: 18, borderRadius: 50 }}></Button>
              </View>

)}

// function mapDispatchToProps(dispatch) {
//     return {
//       deleteingredientList: function(info) { 
//         dispatch( {type: 'delingredientList', name: info} ) 
//       }
//     }
//   }

function mapStateToProps(state) {
  return { tokenGroup: state.tokenGroup, token: state.token, listInfo: state.listInfo };
}


export default connect(
    mapStateToProps, 
    null
    )(IngredientGroup);