import React, { useState } from 'react';
import { Button, Overlay } from 'react-native-elements';
import { StyleSheet, Text, View , Image} from 'react-native';
import { TouchableOpacity } from 'react-native'

export default function OverlayChek() {


  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <Button title="Open Overlay" onPress={toggleOverlay} />

      <Overlay overlayStyle={{backgroundColor:'#dfe6e9', borderRadius: 50,}} isVisible={visible} onBackdropPress={toggleOverlay} >
      </Overlay>
    </View>
  );
}