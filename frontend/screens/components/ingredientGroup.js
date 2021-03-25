import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Switch } from 'react-native';
import { Button } from 'react-native-elements';
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox';

import { Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { baseURL } from './adressIP'

//display ingredient list in the group shopping list
function IngredientGroup (props){

  const [checked, setChecked] = useState(false);
//if igredient has a buyer display buyer's colour
  useEffect(()=>{
    if(props.ingredient.buyer){
        setChecked(true)}
  },[])

  if(props.ingredient.buyer){
    var color = props.ingredient.buyer;
  }else{
    var color = props.user.salt;
  }  
  //if user select ingredient add user as buyer for this ingredient
  async function sendIngredient(){
    setChecked(!checked);
    props.ingredient.buyer = props.user.salt;

    const rawReponse = await fetch(`${baseURL}/sendIngredient`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `ingredient=${JSON.stringify(props.ingredient)}&list=${props.list}`
    })
    
  }

return(
<View style={{ alignItems: 'center', marginTop: 20, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={{marginRight:30}}> {props.ingredient.name} : {props.ingredient.amount} {props.ingredient.measure}</Text>
                <CircleCheckBox
                  checked={checked}
                  onToggle={() => sendIngredient()}
                  labelPosition={LABEL_POSITION.LEFT}
                  outerColor='black'
                  innerColor={color}
                  innerSize={16}
                  outerSize={24}
                />
                <Button title='' icon={<Entypo name="cross" size={24} color="black" />} buttonStyle={{ backgroundColor: '#FFFFFF', paddingLeft: 15 }} onPress={()=>props.deletefromparent(props.ingredient.name)}></Button>
              </View>

)}

function mapStateToProps(state) {
  return { tokenGroup: state.tokenGroup, token: state.token, listInfo: state.listInfo };
}


export default connect(
    mapStateToProps, 
    null
    )(IngredientGroup);