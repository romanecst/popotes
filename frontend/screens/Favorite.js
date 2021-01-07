import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, AsyncStorage, TouchableOpacity} from 'react-native';
import { Header, SearchBar } from 'react-native-elements';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { connect } from 'react-redux';

import { withNavigationFocus } from 'react-navigation';

//screen for favourite recipes
function Favorite(props) {

    const [searchTxt, setSearchTxt] = useState('');
//gets favourites from local storage and add them to redux
    useEffect(()=>{
        async function loadData(){
            await AsyncStorage.getItem("favorites", 
            function(error, data){
                if(data !== null && data !==undefined){
                    var recetteLocal = JSON.parse(data);
                    if(recetteLocal.length !== 0){
                        recetteLocal.forEach(element => {
                            props.addRecipe(element);
                        });  
                    }
                }})
        }
        loadData();
    }, [])




    function updateSearch(search) {
        setSearchTxt(search)
    }

    //displays favourite recipes if no recipe displays no favorite
    if (props.recipeList.length == 0) {
        var favourites =
        <>
         <Text style={{fontFamily: 'Kohinoor Telugu', fontSize:20, marginTop:150, color:'grey'}}>No favorite</Text>
         <Image
        style={{width:150, height:150}}
        source={require('../assets/idea.png')}/>
        </>
    } else {
        var favourites = props.recipeList.map(function (recipe, i) {
            return <TouchableOpacity onPress={()=>{props.goToRecipe(recipe); props.navigation.navigate('Recipe')}}>
                <View key={i} style={styles.container}>
                <Image style={styles.picture} source={{ uri: recipe.image }} />
                <Text style={styles.text} >{recipe.title}</Text>
                <View style={{ backgroundColor: '#fbfafa', paddingBottom: 63, paddingTop: 63, paddingRight: 5 }}>
                    <Entypo name="cross" size={24} color="black" onPress={() => props.deleteRecipe(recipe.title)} />
                </View>  
                 </View>
                 </TouchableOpacity>

        })
    }
//at component destruction store favourite recipes in local storage
    useEffect(() => {
        return async () => {
            await AsyncStorage.setItem("favorites", JSON.stringify(props.recipeList));
        }
    }, []);


    return (


        <View style={{ flex: 1, backgroundColor: '#fff2df' }}>

            <Header
                containerStyle={{backgroundColor:'#febf63', height:90, paddingTop:50}}
                centerComponent={{ text: 'FAVORITE', style: { color: '#fff', fontFamily: 'Kohinoor Telugu', fontSize:22} }}
                rightComponent={<Fontisto name="shopping-basket" size={24} color="white" onPress={() => {props.navigation.navigate('List')}} />}
            />

            <SearchBar
                // backgroundColor="white"
                containerStyle={{ width: "70%", borderRadius: 20, backgroundColor: '#fff2df', borderTopColor: '#fff2df', borderBottomColor: '#fff2df', marginLeft: 59, marginTop: 10 }}
                inputContainerStyle={{ borderRadius: 50, backgroundColor: "white" }}
                lightTheme={true}
                placeholder="Search"
                onChangeText={updateSearch}
                value={searchTxt} />

            <ScrollView style={{ flex: 1, marginTop: 10 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    
                    {favourites}
                  
                </View>
            </ScrollView>
        </View>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        addRecipe: function (info) {
            dispatch({ type: 'recipeList', recipeInfo: info })
        },
        deleteRecipe: function(info) { 
            dispatch( {type: 'recipeListDel', title: info} ) 
        }, 
        goToRecipe: function (info) {
            dispatch({ type: 'recipeInfo', recipeInfo: info })
        },
    }
}

function mapStateToProps(state) {
    return { recipeList: state.recipeList, recipeInfo: state.recipe }
  }
    

var favScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(Favorite);

export default withNavigationFocus(favScreen);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    }, picture: {
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 0,
        width: 150,
        height: 150,
    }, text: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fbfafa',
        fontFamily: 'Kohinoor Telugu',
        width: 180,
        height: 150,
        fontSize: 15,
        paddingTop: 66,
        paddingLeft: 15
    }
});
