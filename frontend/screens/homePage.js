import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image } from 'react-native';
import {Card, SearchBar} from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonic from 'react-native-vector-icons/Ionicons';

export default function homePage({navigation}) {

   const [searchTxt, setSearchTxt] = useState('')

    function updateSearch(search){
        setSearchTxt(search)
    }
        console.log(searchTxt);




    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#ade498'}}>
            <SearchBar 
            containerStyle= {{width:"70%", borderRadius:20, backgroundColor: '#ade498', borderTopColor: '#ade498', borderBottomColor: '#ade498'}}
            inputContainerStyle= {{borderRadius: 50, backgroundColor:"white"}}
            lightTheme={true}
            placeholder="Search"
            onChangeText= {updateSearch}
            value={searchTxt}/>

            <Text h4 style={{textAlign: 'center'}}>Recette du jour</Text>

            <ScrollView style={{marginTop: 25}} horizontal={true}>
                <View>
                <Image source={require('../assets/tarte.jpg')} style={styles.image}/>   
                </View>
                <View>
                <Image source={require('../assets/tarte.jpg')} style={styles.image}/>   
                </View>
                <View>
                <Image source={require('../assets/tarte.jpg')} style={styles.image}/>   
                </View>    
            </ScrollView>
                <Button
                    title="Filters"
                    type="outline"
                />
            <ScrollView contentContainerStyle={{ maxHeight:100 }} horizontal={true}>
                <View>
                    <Card containerStyle= {{width:200, height:170, borderRadius:20}}>
                    <Image source={require('../assets/tarte.jpg')} style={styles.small}/> 
                    <View style={styles.View}>
                    <IconFontAwesome
                        name="heart"
                        size={20}
                        color="#1e272e"/>
                    <IconFontAwesome
                        name="list"
                        size={20}
                        color="#1e272e"/>
                        </View>
                    </Card>
                </View>
                <View>
                    <Card containerStyle= {{width:200, height:170, borderRadius:20}}>
                    <Image source={require('../assets/tarte.jpg')} style={styles.small}/> 
                    <View style={styles.View}>
                    <IconFontAwesome
                        name="heart"
                        size={20}
                        color="#1e272e"/>
                    <IconFontAwesome
                        name="list"
                        size={20}
                        color="#1e272e"/>
                        </View>
                    </Card>
                </View>
                <View>
                    <Card containerStyle= {{width:200, height:170, borderRadius:20}}>
                    <Image source={require('../assets/tarte.jpg')} style={styles.small}/> 
                    <View style={styles.View}>
                    <IconFontAwesome
                        name="heart"
                        size={20}
                        color="#1e272e"/>
                    <IconFontAwesome
                        name="list"
                        size={20}
                        color="#1e272e"/>
                        </View>
                    </Card>
                </View>
                <View>
                    <Card containerStyle= {{width:200, height:170, borderRadius:20}}>
                    <Image source={require('../assets/tarte.jpg')} style={styles.small}/> 
                    <View style={styles.View}>
                    <IconFontAwesome
                        name="heart"
                        size={20}
                        color="#1e272e"/>
                    <IconFontAwesome
                        name="list"
                        size={20}
                        color="#1e272e"/>
                        </View>
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
        borderRadius: 20,
        flex:0.7,
        justifyContent:"space-between",
        margin: 5,
    },
   small: {
       width: 170,
       height: 100,
       borderRadius:20,
    
    },
    View:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop: 20 
    }
  });