import React from 'react';
import { View, Button, Linking } from 'react-native';

import { Ionicons } from '@expo/vector-icons';



// export default function Map({navigation}) {
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#e67e22'}}>
//             <Text>Je suis sur la page Map</Text>
            
//       </View>
//     );
  

// }



export default function Map() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#e67e22'}}>
           <Button title="Press me" onPress={() => Linking.openURL('mailto:?subject=Soirée&body=popotes')}>
                      
    </Button>
            
      </View>
    );
  

}










