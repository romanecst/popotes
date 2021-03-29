import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import DoubleClick from 'react-native-double-tap';
import { Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';

//display ingredient list by category in shopping list 
function Ingredients (props){

    const [checked, setChecked] = useState();
    let colour = 'white';
    let del = <Entypo name="cross" size={24} color="black" onPress={()=>{props.deleteingredientList(props.name)}}/>;

    
    if(props.isFav){
      colour = 'rgba(254,191,99,0.3)';
      del = <Entypo name="cross" size={24} color="grey" />
    }
return(
<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colour, borderRadius:25, paddingRight:10 }}>
    <DoubleClick
      doubleTap={() => {
        props.IngredientsSelected(props.ingr)
      }}
      delay={200}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 200}}>
      <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 12, marginLeft: 20 }}>{props.name}</Text>
      <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 12 }}> {props.amount} {props.measure}</Text>
      </View>
    </DoubleClick>
    <CheckBox checked={checked} checkedColor='#ADE498' onPress={() => { setChecked(!checked) }} />
    {/*delete ingredient in redux store */}
    {del}
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
    )(Ingredients);