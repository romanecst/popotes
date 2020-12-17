import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Switch } from 'react-native';
import { CheckBox } from 'react-native-elements';
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox';

import { Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';

export default function IngredientGroup (props){

    const [checked, setChecked] = useState();


return(
<View style={{ alignItems: 'center', marginTop: 20, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={{marginRight:40}}> {props.name} : {props.amount}</Text>
                <CircleCheckBox
                  checked={checked}
                  onToggle={() => {setChecked(!checked)}}
                  labelPosition={LABEL_POSITION.LEFT}
                  outerColor='black'
                  innerColor={props.user.salt}
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
  
// export default connect(
//     null, 
//     mapDispatchToProps
//     )(Ingredients);