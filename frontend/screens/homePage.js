import React, {useState, useEffect} from 'react';
import { AsyncStorage, StyleSheet, Text, View, Picker, ScrollView, TouchableOpacity, Image } from 'react-native';
import {Button, Overlay, Card, SearchBar} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonic from 'react-native-vector-icons/Ionicons';


export default function homePage({navigation}) {
    const [selectedValueTime, setSelectedValueTime] = useState("");
    const [selectedValueCuisine, setSelectedValueCuisine] = useState("");
    const [selectedValuePrice, setSelectedValuePrice] = useState("");
    const [selectedValueHealthy, setSelectedValueHealthy] = useState("");
    const [visible, setVisible] = useState(false);
    const [glutenFree, setGlutenFree] = useState(false);
    const [vegetarian, setVegetarian] = useState(false);
    const [lactoseFree, setLactoseFree] = useState(false);
    const [vegan, setVegan] = useState(false);

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


  const toggleOverlay = () => {
    setVisible(!visible);
  };
// Romane IP: http://172.17.1.197:3000/filters


    var Filters = async() => {
        var rawResult = await fetch('http://172.17.1.197:3000/filters', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `time=${selectedValueTime}&cuisine=${selectedValueCuisine}&price=${selectedValuePrice}&healthy=${selectedValueHealthy}&gluten=${glutenFree}&vegetarian=${vegetarian}&lactose=${lactoseFree}&vegan=${vegan}`
        });
        var result = await rawResult.json();
        console.log(result);
    }

    var gluten = { width: 100, height: 100 };
    var vegeta = { width: 100, height: 100 };
    var lactose = { width: 100, height: 100 };
    var vega = { width: 100, height: 100 };

    if (glutenFree) {
        gluten = { backgroundColor: '#ADE498', width: 100, height: 100, borderRadius: 400, borderColor: 'black' }
    };
    if (vegetarian) {
        vegeta = { backgroundColor: '#ADE498', width: 100, height: 100, borderRadius: 400, borderColor: 'black' }
    };
    if (lactoseFree) {
        lactose = { backgroundColor: '#ADE498', width: 100, height: 100, borderRadius: 400, borderColor: 'black' }
    };
    if (vegan) {
        vega = { backgroundColor: '#ADE498', width: 100, height: 100, borderRadius: 400, borderColor: 'black' }
    };

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
            <Button title="Filters" onPress={toggleOverlay}/>
            <ScrollView contentContainerStyle={{ maxHeight:100 }} horizontal={true}>
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
      
                
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} fullScreen={true} >
            <View style={{flex:1, alignItems:'center', justifyContent:'center', marginTop: 50}}>
            <ScrollView>
            <Text style={styles.title}>Time</Text>
            <Picker
                selectedValue={selectedValueTime}
                style={{ height: 200, width: 300, marginBottom: 30 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValueTime(itemValue)}
            >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Quick Recipes" value="quick" />
                <Picker.Item label="Long Recipes" value="long" />
            </Picker>
            <Text style={styles.title}>Cuisine</Text>
            <Picker
                selectedValue={selectedValueCuisine}
                style={{ height: 200, width: 300 , marginBottom: 30 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValueCuisine(itemValue)}
            >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="American" value="American" />
                <Picker.Item label="French" value="French" />
                <Picker.Item label="Italian" value="Italian" />
            </Picker>
            <Text style={styles.title}>Price</Text>
            <Picker
                selectedValue={selectedValuePrice}
                style={{ height: 200, width: 300, marginBottom: 30 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValuePrice(itemValue)}
            >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Cheap" value="true" />
            </Picker>
            <Text style={styles.title}>Healthiness</Text>
            <Picker
                selectedValue={selectedValueHealthy}
                style={{ height: 200, width: 300, marginBottom: 30 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValueHealthy(itemValue)}
            >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Healthy" value="true" />
            </Picker>
            <Text style={styles.title}>Food Preferences</Text>
            <View style={styles.prefalim}>
                <TouchableOpacity style={styles.picto} activeOpacity={0.3} onPress={() => { setGlutenFree(!glutenFree) }}>
                    <Image
                        style={gluten}
                        source={require('../assets/noGluten.png')}
                    />
                    <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 11 }}>Gluten free</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.picto} activeOpacity={0.3} onPress={() =>{ setVegetarian(!vegetarian)}}>
                    <Image style={vegeta}
                        source={require('../assets/noMeat.png')}
                    />
                    <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 11 }}>Vegetarian</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.prefalim}>
                <TouchableOpacity style={styles.picto} activeOpacity={0.3} onPress={() => { setLactoseFree(!lactoseFree)}}>
                    <Image style={lactose}
                        source={require('../assets/noMilk.png')}
                    />
                    <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 11 }}>Lactiose free</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.picto} activeOpacity={0.3} onPress={() =>{ setVegan(!vegan)}}>
                    <Image style={vega}
                        source={require('../assets/vegetalien.png')}
                    />
                    <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 11 }}>Vegan</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
            </View>
            <Button title="Apply Filters" onPress={()=>{Filters(); toggleOverlay()}}/>
            </Overlay>
            
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    }, overlay: {
        width: 290,
        margin: 18,
        justifyContent: 'center',
    }, prefalim: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    }, picto: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
    }, title:{
        fontSize: 25,
        fontWeight: 'bold'
    },image: {
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
