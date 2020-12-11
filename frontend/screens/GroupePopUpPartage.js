import React, { useState } from "react";
import {
  visible,
  ScrollView,
  TouchableOpacity,
  StyleSheet, Alert,
  Modal,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { Input, Button, Avatar, Overlay} from "react-native-elements";
import { TextInput } from "react-native";
import { Icon } from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";

export default function GroupPopUpPartage() {

  const [modalVisible, setModalVisible] = useState(false);

  return (
   <View style={styles.centeredView}>
   
      <Modal
      
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}
        style={{  alignItems:"stretch"}}>
          <View style={styles.modalView} >
            <Text style={styles.modalText} >Coucou mon amis je fais ma liste de course pour la soirée de samedi, dis moi ce que tu veux !!!!!! clic sur le liens de parrainage , bisous 
            
            </Text>
            <Text style={{ marginBottom:66}}>
            Integrer le LIEN DE TELECHARGEMENT  
            </Text>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "green" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Envoyer à mes amis</Text>


              
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
   
      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Partager ma liste avec mes amis</Text>
      </TouchableHighlight>
    </View>
  
  );
}

const styles = StyleSheet.create({
  centeredView: {
    
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 520
  },
  modalView: {
    
   
   
    backgroundColor: "red",
    borderRadius: 60,
    padding: 95,
    paddingTop:5,
    alignItems:"center",
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 30
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "black",
    borderRadius: 50,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    textAlign:"center",
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    
     alignItems:"center",
    marginBottom: 150,
    textAlign: "center"
  }
});