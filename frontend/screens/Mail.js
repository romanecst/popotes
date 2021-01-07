import React from 'react';
import { View, Button, Linking } from 'react-native';


//send email to friends with token so they can join the group
export default function Map() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#e67e22'}}>
           <Button title="Press me" onPress={() => Linking.openURL('mailto:?subject=Soirée&body=popotes')}>
                      
    </Button>
            
      </View>
    );
  

}