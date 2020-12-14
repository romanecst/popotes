import React, {useState, useEffect} from 'react';
import { AsyncStorage, StyleSheet, Text, View, Picker, ScrollView, TouchableOpacity, Image} from 'react-native';
import {Button, Overlay, Card, SearchBar, Header} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import IconIonic from 'react-native-vector-icons/Ionicons';
import RecipeHome from './components/recipeHome';

import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


import { connect } from 'react-redux';

function homePage({navigation, loadList}) {
    const [selectedValueDish, setSelectedValueDish] = useState("");
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

    const ListInit = async() => {
        var rawResult = await fetch('http://172.17.1.197:3000/list');
        var result = await rawResult.json();
        loadList(result)
    }

    ListInit();  
        
  }, []);

  // Romane IP: http://172.17.1.197:3000/filters
// Leila IP: http://172.17.1.129:3000/filters ; 192.168.1.20 maison
// Nico IP: http://172.17.1.53:3000/filters
// Remi IP: http://172.17.1.71:3000

  var Filters = async() => {
    var rawResult = await fetch('http://172.17.1.197:3000/filters', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `time=${selectedValueTime}&cuisine=${selectedValueCuisine}&price=${selectedValuePrice}&healthy=${selectedValueHealthy}&gluten=${glutenFree}&vegetarian=${vegetarian}&lactose=${lactoseFree}&vegan=${vegan}&type=${selectedValueDish}`
    });
    var result = await rawResult.json();
    setListRecipe(result);
}

    function updateSearch(search){
        setSearchTxt(search)
    }
var Search = async() => {
    var rawResult = await fetch('http://172.17.1.53:3000/search', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `search=${searchTxt}`
    });
    var result = await rawResult.json();
    setListRecipe(result);
}

  useEffect(()=>{
    if(glutenFree === true || vegetarian === true || lactoseFree === true || vegan === true ){
        Filters();
    }  
  },[pref])

  useEffect(()=>{
    if(searchTxt === '' && pref){
        Filters();
    }  
  },[searchTxt])

  const toggleOverlay = () => {
    setVisible(!visible);
  };


    var gluten = {backgroundColor: '#FFFFFF',borderRadius: 400, width: 100, height: 100 };
    var vegeta = { backgroundColor: '#FFFFFF',borderRadius: 400, width: 100, height: 100  };
    var lactose = {backgroundColor: '#FFFFFF',borderRadius: 400, width: 100, height: 100  };
    var vega = { backgroundColor: '#FFFFFF',borderRadius: 400, width: 100, height: 100  };

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
            <Header
                containerStyle={{backgroundColor:'#ade498', height:90, paddingTop:50}}
                leftComponent= {<AntDesign name="leftcircleo" size={24} color="white" />}
                centerComponent={{ text: 'HOMEPAGE', style: { color: '#fff', fontFamily: 'Kohinoor Telugu'} }}
                rightComponent={<Fontisto name="shopping-basket" size={24} color="white" onPress={() => {navigation.navigate('List')}} />}
            />
            <View style={{flexDirection:'row', alignItems:'center'}}>          
            <SearchBar 
            containerStyle= {{width:"70%", backgroundColor: '#eefaea30', borderTopColor: '#eefaea', borderBottomColor: '#eefaea'}}
            inputContainerStyle= {styles.search}
            lightTheme={true}
            placeholder="Search"
            onChangeText= {(value) => setSearchTxt(value)} 
            value={searchTxt}/>
            <Button 
            title="Yumi!" 
            buttonStyle={styles.bouton}
            titleStyle={{color:'white',fontFamily: 'Kohinoor Telugu', paddingBottom:3, paddingTop:3}}
            onPress={()=>Search()}/>
            </View>

            <ScrollView contentContainerStyle={{alignItems: 'center', justifyContent: "center"}}>


            <Text style={{textAlign: 'center', fontSize:25, fontFamily: 'Kohinoor Telugu', color:'grey'}}>Today's pick</Text>

            <ScrollView style={{marginTop: 8, marginBottom:15}} horizontal={true}>
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
            <Button title="Filters" onPress={toggleOverlay} 
                    buttonStyle={styles.Filters}
                    titleStyle={{color:'white',fontFamily: 'Kohinoor Telugu', paddingBottom:3, paddingTop:3, paddingHorizontal:8}}
            />

           <View  style={{flexDirection:'row',flexWrap: 'wrap', justifyContent:'space-between', marginHorizontal:10}}>

               {newList} 
               
            </View>

            </ScrollView>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} fullScreen={true} overlayStyle={{borderRadius: 30, width:340, height:600, justifyContent:'center', alignItems:'center', backgroundColor:'#ecf0f1' }} >
            <View style={{flex:1, alignItems:'center', justifyContent:'center', marginTop: 50}}>
            <ScrollView>
            <View style={{justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize: 25, fontFamily: 'Kohinoor Telugu',}}>Type of Dish</Text>
            <Picker
                selectedValue={selectedValueDish}
                style={{ height: 200, width: 200, marginBottom: 0, borderColor:'black',backgroundColor:'#FFFFFF', borderWidth: 2, borderRadius:50 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValueDish(itemValue)}
            >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Appetizer" value="appetizer" />
                <Picker.Item label="Starter" value="starter" />
                <Picker.Item label="Main Course" value="main course" />
                <Picker.Item label="Side" value="side dish" />
                <Picker.Item label="Dessert" value="dessert" />
                <Picker.Item label="Snack" value="snack" />
                <Picker.Item label="Beverage" value="beverage" />
            </Picker>
            <Text style={{fontSize: 25, fontFamily: 'Kohinoor Telugu',}}>Time</Text>
            <Picker
                selectedValue={selectedValueTime}
                style={{ height: 200, width: 200, marginBottom: 0, borderColor:'black',backgroundColor:'#FFFFFF', borderWidth: 2, borderRadius:50 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValueTime(itemValue)}
            >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Quick Recipes" value="quick" />
                <Picker.Item label="Long Recipes" value="long" />
            </Picker>
            <Text style={styles.title}>Cuisine</Text>
            <Picker
                selectedValue={selectedValueCuisine}
                style={{ height: 200, width: 200, marginBottom: 0, borderColor:'black' ,backgroundColor:'#FFFFFF', borderWidth: 2, borderRadius:50 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValueCuisine(itemValue)}
            >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="African" value="African" />
                <Picker.Item label="American" value="American" />
                <Picker.Item label="Mexican" value="Mexican" />
                <Picker.Item label="Asian" value="Asian" />
                <Picker.Item label="Chinese" value="Chinese" />
                <Picker.Item label="Indian" value="Indian" />
                <Picker.Item label="Japanese" value="Japanese" />
                <Picker.Item label="European" value="European" />
                <Picker.Item label="French" value="French" />
                <Picker.Item label="Italian" value="Italian" />
                <Picker.Item label="Spanish" value="Spanish" />
                
                
            </Picker>
            <Text style={styles.title}>Price</Text>
            <Picker
                selectedValue={selectedValuePrice}
                style={{ height: 200, width: 200, marginBottom: 0, borderColor:'black',backgroundColor:'#FFFFFF', borderWidth: 2, borderRadius:50}}
                onValueChange={(itemValue, itemIndex) => setSelectedValuePrice(itemValue)}
            >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Cheap" value="true" />
            </Picker>
            <Text style={styles.title}>Healthiness</Text>
            <Picker
                selectedValue={selectedValueHealthy}
                style={{ height: 200, width: 200, marginBottom: 0, borderColor:'black',backgroundColor:'#FFFFFF', borderWidth: 2, borderRadius:50 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValueHealthy(itemValue)}
            >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Healthy" value="true" />
            </Picker>
            <Text style={styles.title}>Food Preferences</Text>
            </View>
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
            <Button 
            buttonStyle={{ backgroundColor:'#ade498', width:200, padding:10, borderRadius:30, marginTop:5 }}
            titleStyle={{color:'white',fontFamily: 'Kohinoor Telugu' }} 
            title="Apply Filters" 
            onPress={()=>{Filters(); toggleOverlay()}}/>
            </Overlay>
        </View>
    )
}
function mapDispatchToProps(dispatch) {
    return {
        loadList: function(info) { 
            dispatch( {type: 'loadList', list: info} ) 
        },
    }
}

export default connect(
    null,
    mapDispatchToProps
)(homePage);

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
        marginTop:20,
        fontSize: 25,
        fontFamily: 'Kohinoor Telugu',
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
    }, search: { 
        backgroundColor: 'white', 
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 0,
    }, bouton: {
        borderColor:'white', 
        backgroundColor:'#ade498', 
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 40,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 40,
    }, Filters: {
        borderColor:'white', 
        backgroundColor:'#ade498', 
        borderRadius:30,
        paddingHorizontal:15,
    }
  });
