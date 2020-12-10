import React, {useState, useEffect} from 'react';
import { AsyncStorage, StyleSheet, Text, View, Picker, ScrollView, TouchableOpacity, Image} from 'react-native';
import {Button, Overlay, Card, SearchBar, Header} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import IconIonic from 'react-native-vector-icons/Ionicons';
import RecipeHome from './recipeHome';

import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

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

    const [pref, setPref] = useState(false);

   const [searchTxt, setSearchTxt] = useState('')
  
   const [listRecipe, setListRecipe] = useState([])

useEffect(() => {

    const Preferences = async()=>{
        var preferences = ['gluten free','vegetarian','lactose free','vegan'];
        var ifTrue = false;
        for (let i = 0; i<preferences.length; i++){
            await AsyncStorage.getItem(preferences[i], 
            function(error, data){
            if(data === 'true'){
                ifTrue = true;
                if(preferences[i]==='gluten free'){
                    setGlutenFree(true);
                }else if(preferences[i]==='vegetarian'){
                    setVegetarian(true);
                }else if(preferences[i]==='lactose free'){
                    setLactoseFree(true);
                }else{
                    setVegan(true);
                }
            }
            })
        };
        if(ifTrue){
            setPref(true);
        }else{
            var rawReponse = await fetch('http://172.17.1.197:3000/find');
            var response= await rawReponse.json();
            setListRecipe(response);
        }
    };

    Preferences();
    
        
  }, []);

  // Romane IP: http://172.17.1.197:3000/filters
// Leila IP: http://172.17.1.129:3000/filters

  var Filters = async() => {
    var rawResult = await fetch('http://172.17.1.197:3000/filters', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `time=${selectedValueTime}&cuisine=${selectedValueCuisine}&price=${selectedValuePrice}&healthy=${selectedValueHealthy}&gluten=${glutenFree}&vegetarian=${vegetarian}&lactose=${lactoseFree}&vegan=${vegan}`
    });
    var result = await rawResult.json();
    setListRecipe(result);
}

var Search = async() => {
    var rawResult = await fetch('http://172.17.1.197:3000/search', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `search=${searchTxt}`
    });
    var result = await rawResult.json();
    setListRecipe(result);
}

  useEffect(()=>{
    console.log('PREFERENCE ALIMENTAIRE',glutenFree,vegetarian,lactoseFree,vegan);
    if(glutenFree === true || vegetarian === true || lactoseFree === true || vegan === true ){
        Filters();
    }  
  },[pref])


  const toggleOverlay = () => {
    setVisible(!visible);
  };


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

    var newList = listRecipe.map(function(recipe, i){
        return <RecipeHome key={i} image={recipe.image} title={recipe.title} recipeInfo={recipe}/>
    })

    

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#eefaea'}}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center'}}>
            <Header
                containerStyle={{backgroundColor:'#ade498', height:90, paddingTop:50}}
                leftComponent= {<AntDesign name="leftcircleo" size={24} color="white" />}
                centerComponent={{ text: 'HOMEPAGE', style: { color: '#fff', fontFamily: 'Kohinoor Telugu'} }}
                rightComponent={<Fontisto name="shopping-basket" size={24} color="white" onPress={() => {navigation.navigate('List')}} />}
            />

            <SearchBar 
            containerStyle= {{width:"70%", borderRadius:20, backgroundColor: '#eefaea', borderTopColor: '#eefaea', borderBottomColor: '#eefaea'}}
            inputContainerStyle= {{borderRadius: 50, backgroundColor:"white"}}
            lightTheme={true}
            placeholder="Search"
            onChangeText= {(value) => setSearchTxt(value)} 
            value={searchTxt}/>
            <Button title="Search" onPress={()=>Search()}/>

            <Text style={{textAlign: 'center', fontSize:25}}>Recette du jour</Text>

            <ScrollView style={{marginTop: 25}} horizontal={true}>
            <TouchableOpacity onPress={() => {navigation.navigate('Recipe')}}>
                <Image source={require('../assets/tarte.jpg')} style={styles.image} />   
            </TouchableOpacity>
                <View>
                <Image source={require('../assets/tarte.jpg')} style={styles.image}/>   
                </View>
                <View>
                <Image source={require('../assets/tarte.jpg')} style={styles.image}/>   
                </View>    
            </ScrollView>
            <Button title="Filters" onPress={toggleOverlay}/>
            
               {newList} 
                
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
