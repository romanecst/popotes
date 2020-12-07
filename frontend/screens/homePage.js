import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import {Card, SearchBar, Image} from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';


export default function homePage({navigation}) {

   const [searchTxt, setSearchTxt] = useState('')

    function updateSearch(search){
        setSearchTxt(search)
    }
        console.log(searchTxt);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#ade498'}}>
            <SearchBar 
            // backgroundColor="white"
            containerStyle= {{width:"70%", borderRadius:20, backgroundColor: '#ade498', borderTopColor: '#ade498', borderBottomColor: '#ade498'}}
            inputContainerStyle= {{borderRadius: 50, backgroundColor:"white"}}
            lightTheme={true}
            placeholder="Search"
            onChangeText= {updateSearch}
            value={searchTxt}/>
            <Text h4 style={{textAlign: 'center'}}>Recette du jour</Text>
            <ScrollView style={{marginTop: 25}} horizontal={true}>
                <Card containerStyle={{width:300, borderRadius:20, height:180}}> 
                <Image source={require('../assets/noMilk.png')} style={styles.image}/>          
                </Card>
                <Card containerStyle={{width:300, borderRadius:20, height:180}}> 
                <Image source={require('../assets/tarte.jpg')} style={styles.image}/>          
                </Card>
                <Card containerStyle={{width:300, borderRadius:20, height:180}}> 
                <Image source={require('../assets/tarte.jpg')} style={styles.image}/>          
                </Card>
            </ScrollView>
            <ScrollView style={{marginTop: 25, flexDirection:"row"}}>
            <View >
                <Card containerStyle={{width:300, borderRadius:20, height:180}}> 
                <Image source={require('../assets/tarte.jpg')} style={styles.image}/>          
                </Card>
            </View>
            <View >
                <Card containerStyle={{width:300, borderRadius:20, height:180}}> 
                <Image source={require('../assets/tarte.jpg')} style={styles.image}/>          
                </Card>
            </View>
            </ScrollView>
      </View>
    );
  

}

const styles = StyleSheet.create({
    
    image: {
        width: 300,
        height: 150,
    }
    
  });