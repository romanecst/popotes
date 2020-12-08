import React, {useState, useEffect} from 'react';
import { AsyncStorage, StyleSheet, Text, View,  ScrollView, Image } from 'react-native';
import {Card, SearchBar, Button} from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonic from 'react-native-vector-icons/Ionicons';

export default function homePage({navigation}) {

   const [searchTxt, setSearchTxt] = useState('')
   const [like, setLike] = useState(false)
   const [listRecipe, setListRecipe] = useState([])

useEffect(() => {
    // AsyncStorage.getItem("listStorage", 
            // function(error, data){
            //   var userData = JSON.parse(data);
            //   setlistRecipe(userData)
            //   setPseudoOk(true)
            //   console.log("test userData",userData, "test pseudo", pseudo);
            async function loadData(){
                var rawReponse = await fetch('/find');
                var response= await rawReponse.json();
            }
              loadData();
    
  }, []);



   var colorHeart;
   var colorLike = () => {
    setLike(!like);
    // AsyncStorage.setItem("firstName", "John")

  }

  var 

  if(like===true){
    colorHeart = {color:'#FF0000'}
} else {
   colorHeart = {color:'black'}
}
console.log(like)



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

            <ScrollView style={{marginTop: 25, height:150}} horizontal={true}>
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
            <ScrollView contentContainerStyle={{ height:230 }} horizontal={true}>
                <View>
                    <Card containerStyle= {{width:200, height:170, borderRadius:20}}>
                    <Image source={require('../assets/tarte.jpg')} style={styles.small}/> 
                    <View style={styles.View}>
                         <IconFontAwesome
                        name="heart"
                        size={20}
                        style= {colorHeart}
                        onPress={() => {colorLike()}}/>
                        
                    
                       
                        <IconFontAwesome
                        name="list"
                        size={20}
                        color="#1e272e"
                        onPress={() => {colorLike()}}/>
                        
                        
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