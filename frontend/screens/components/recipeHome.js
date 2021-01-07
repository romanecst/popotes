
import React, { useState, useEffect, useRef} from 'react';
import { AsyncStorage, StyleSheet, Text, View, Picker, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Button, Overlay, Card, SearchBar, Avatar, Input} from 'react-native-elements';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import DropDownPicker from 'react-native-dropdown-picker';
import Checking from './checkingOverlay';


import {baseURL} from './adressIP'

//home screen recipe componants with like button, add to list button and recipe image
function RecipeHome(props) {

    const [visible, setVisible] = useState(false);
    const [like, setLike] = useState(false);
    const [selectedList, setSelectedList] = useState();
    const [lists, setLists] = useState([]);

    const [signInEmail, setSignInEmail] = useState('')
    const [signInPassword, setSignInPassword] = useState('')
  
    const [listErrorsSignin, setErrorsSignin] = useState([])
  
    const [visibleSignin, setVisibleSignin] = useState(false);
    const [visibleSignup, setVisibleSignup] = useState(false);
  
    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
  
  
    const [listErrorSignUp, setListErrorSignUp] = useState([]);

//sign in/up of the user on click on the add to list button
    const toggleSignin = () => {
        setVisibleSignin(!visibleSignin);
      }
    
      const toggleSignup = () => {
        setVisibleSignup(!visibleSignup);
      }
    
      var handleSubmitSignin = async () => {
    //send to backend user info to be verified in database
        const data = await fetch(`${baseURL}/sign-in`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`
        })
    
        const body = await data.json()
    
        if (body.result == true) {
    //if user is successfully verified, storage of their token in redux store
 
          props.addToken(body.token);
//user token saved in async storage and overlay closes
          AsyncStorage.setItem("user token", body.token);
          toggleSignin();
    
        } else {
          setErrorsSignin(body.error)
        }
      }
    //displays errors
      var tabErrorsSignin = listErrorsSignin.map((error, i) => {
        return (<Text>{error}</Text>)
      })
    
      var handleSubmitSignUp = async () => {
       //send to backend user info to be stored in database
        const data = await fetch(`${baseURL}/sign-up`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`
        })
    
        const body = await data.json()
        if (body.result == true) {
           //if registration of the user is successful, storage of their token in redux store
          props.addToken(body.token);
          //user token saved in async storage and overlay closes
          AsyncStorage.setItem("user token", body.token);
          toggleSignup();
    
    
        } else {
          setListErrorSignUp(body.error)
        }
      }
      //displays errors
      var tabErrorsSignup = listErrorSignUp.map((error, i) => {
        return (<Text>{error}</Text>)
      })

//on click heart changes color and item is added/ deleted from favourites
    function colorLike() {
        setLike(!like);
    }

  //ingredient overlay 
  //checks if the user is connected 
  //if user connected token stored in redux store and request of the user shopping lists to backend to display their name and open ingredient overlay
  //else sign up overlay opens
    const toggleOverlay = () => {
      setVisible(!visible);
      if(!visible){
        AsyncStorage.getItem("user token", 
              async function(error, data){
                if(data){
                props.addToken(data);
                const dataFetch = await fetch(`${baseURL}/getMyLists`, {
                  method: 'POST',
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                  body: `token=${data}`
                });
                const body = await dataFetch.json();
                setLists(body)
  
                }else{
                  setVisibleSignup(true);
                }
              })
      }
  };

//if recipe is liked it is stored in the redux store if it isn't already in it
//if recipe in unliked it is deleted from the redx store
    useEffect(() => {
        if (like) {
            var found = props.recipeList.find(element => element.title === props.recipeInfo.title)
            if (!found) {
                props.saveRecipe(props.recipeInfo);
            }
        } else {
            props.deleteRecipe(props.recipeInfo.title);
        }
    }, [like])

    var colorHeart;
//recipeInfo is the current recipe and recipeList is the array of recipe stored in favourite recipes 
//if they matched then the recipe is likes otherwise it isn't liked
    var likes = props.recipeList.find(element => element.title == props.recipeInfo.title);

    if (likes != undefined) {
        colorHeart = { color: '#FF0000' }
    } else {
        colorHeart = { color: 'black' }
    }

//displays current recipes ingredients in the overlay
    var overlayIngredients = props.recipeInfo.extendedIngredients.map(function(ingredient, j){
        return <Checking key={j} name={ingredient.name} quantity= {ingredient.amount} measure={ingredient.measures.us.unitLong}/>
    });

//display names of user's shopping lists
    var items = lists.map(function(el){
        return { label: el.name, value: el._id }
    });

 //create an array of object with the ingredients in the current recipe to be sent on the global list screen
    var newIngredients = props.recipeInfo.extendedIngredients.map(function(ingredient, i){
  return {id:ingredient.id, name: ingredient.name, amount: ingredient.amount, measure: ingredient.measures.us.unitLong, aisle: ingredient.aisle, recipeName: props.recipeInfo.title}
  });

  //once the ingredient are validated by the user request to backend to store them in the selsected in list of the user in the database
  //the array created above is stored in redux 
  //user is then redirected to global list srcreen which is the shopping list
    async function toList(){
      props.currentList(selectedList); 
      await fetch(`${baseURL}/addIngredients`, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `list=${selectedList._id}&ingredients=${JSON.stringify(newIngredients)}`
      });
      props.ingredientList(newIngredients); 
      toggleOverlay(); 
      props.navigation.navigate('GlobalList') 
      }


    
    return (
        <View style={{ justifyContent: 'space-between' }}>
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => { props.goToRecipe(props.recipeInfo); props.navigation.navigate('Recipe') }}>
                        <Image source={{ uri: props.image }} style={styles.small} />
                        <Text style={{ textAlign: "center", fontFamily: 'Kohinoor Telugu', paddingHorizontal: 5 }}>{props.title}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bouton}>
                <View>
                    <Button
                        buttonStyle={styles.coeur}
                        icon={<IconFontAwesome
                            name="heart"
                            size={20}
                            style={colorHeart}
                            onPress={() => { colorLike() }} />} />
                </View>
                <View>
                <Button
                  buttonStyle={styles.list}
                  onPress={() => toggleOverlay()}
                  icon={<IconFontAwesome
                      name="list"
                      size={20}
                      color="#1e272e"
                  />} />
                </View>
            </View>
        

            {/* ------------------------------ OVERLAY ------------------------------ */}
            <Overlay overlayStyle={{ backgroundColor: '#dfe6e9', borderRadius: 50, marginHorizontal: 10 }} isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={styles.containerOverlay}>
          <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 18, marginHorizontal: 15 }}>You will add the ingredients to your shopping list:{"\n"}{"\n"}</Text>
          <Text style={{ fontFamily: 'Kohinoor Telugu', color: '#636e72', marginHorizontal: 50, fontSize:15 }}>check the ingredients you already have:</Text>
        </View>


        <View style={styles.ingredients}>

          <ScrollView>
            {/* code se trouve dans le composant "checkingOverlay" */}
            {overlayIngredients}
          </ScrollView>

        </View>
        {/* DROP DOWN -- LIST HERE !!  */}
        <View style={{justifyContent:'center', alignItems:'center', marginVertical:10}}>
        <DropDownPicker
          items={items}
          defaultIndex={0}
          defaultNull placeholder="Select a list"
          containerStyle={{width: 150, height: 70}} 
          style={{marginBottom:10}}
          onChangeItem={item => setSelectedList({_id: item.value, name: item.label})}
        />
        <Button
          iconRight={true}
          title="Next  "
          buttonStyle={{ borderColor: 'white', marginHorizontal: 100, borderRadius: 30, backgroundColor: 'white', justifyContent: 'center' }}
          titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu'}}
          onPress={() => toList()}
        />
        </View>
      </Overlay>

       {/* -------------------------OVERLAY ----- SIGN IN/UP ---------------------------------- */}


       <Overlay overlayStyle={{ backgroundColor: '#dfe6e9', borderRadius: 50, }} isVisible={visibleSignin} >

<View style={styles.overlay}>
  <Button
    title="Return"
    type="clear"
    onPress={() => { props.navigation.goBack(null); toggleSignup() }}
    buttonStyle={{ borderColor: "#dfe6e9", justifyContent: "flex-start" }}
    titleStyle={{
      color: "black",
      fontFamily: "Kohinoor Telugu",
      fontSize: 11,
      marginRight: 35,
    }}
  />
  <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 25, marginLeft: 100, marginBottom: 20 }}>Sign-in</Text>

  <Input
    containerStyle={styles.input}
    placeholder='Email'
    leftIcon={{ type: 'font-awesome', name: 'at' }}
    onChangeText={(val) => setSignInEmail(val)}
    val={signInEmail}
    inputContainerStyle={{ borderBottomWidth: 0 }}
  />
  <Input
    secureTextEntry={true}
    containerStyle={styles.input}
    placeholder='Password'
    leftIcon={{ type: 'font-awesome', name: 'unlock' }}
    onChangeText={(val) => setSignInPassword(val)}
    val={signInPassword}
    inputContainerStyle={{ borderBottomWidth: 0 }}
  />

  {tabErrorsSignin}


  <Button
    title="Sign-in"
    buttonStyle={{ backgroundColor: '#7FDBDA', borderRadius: 30, marginHorizontal: 80, marginBottom: 50 }}
    titleStyle={{ color: 'white', fontFamily: 'Kohinoor Telugu', marginHorizontal: 20 }}
    onPress={() => handleSubmitSignin()}
  />

  <TouchableOpacity onPress={() => { toggleSignup(); toggleSignin(); }}><Text style={{ marginTop: 10, fontStyle: 'italic' }}>Not registered yet ? <Text style={{ color: "#35abd5", textDecorationLine: 'underline' }}>Create an account</Text></Text>




  </TouchableOpacity>
</View>
</Overlay>


<Overlay overlayStyle={{ backgroundColor: '#dfe6e9', borderRadius: 50, }} isVisible={visibleSignup} >

<View style={styles.overlay}>
  <Button
    title="Return"
    type="clear"
    onPress={() => { props.navigation.goBack(null); toggleSignup() }}
    buttonStyle={{ borderColor: "#dfe6e9", justifyContent: "flex-start" }}
    titleStyle={{
      color: "black",
      fontFamily: "Kohinoor Telugu",
      fontSize: 11,
      marginRight: 35,
    }}
  />
  <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 25, marginLeft: 100, marginBottom: 40 }}>Sign-up</Text>

  <Input
    containerStyle={styles.input}
    placeholder='Username'
    leftIcon={{ type: 'font-awesome', name: 'user' }}
    onChangeText={(val) => setSignUpUsername(val)}
    val={signUpUsername}
    inputContainerStyle={{ borderBottomWidth: 0 }}
  />
  <Input
    containerStyle={styles.input}
    placeholder='Email'
    leftIcon={{ type: 'font-awesome', name: 'at' }}
    onChangeText={(val) => setSignUpEmail(val)}
    val={signUpEmail}
    inputContainerStyle={{ borderBottomWidth: 0 }}
  />
  <Input
    secureTextEntry={true}
    containerStyle={styles.input}
    placeholder='Password'
    leftIcon={{ type: 'font-awesome', name: 'unlock' }}
    onChangeText={(val) => setSignUpPassword(val)}
    val={signUpPassword}
    inputContainerStyle={{ borderBottomWidth: 0 }}
  />

  {tabErrorsSignup}

  <Button
    title="Sign-Up"
    buttonStyle={{ backgroundColor: '#7FDBDA', borderRadius: 30, marginHorizontal: 70 }}
    titleStyle={{ color: 'white', fontFamily: 'Kohinoor Telugu', marginHorizontal: 20 }}
    onPress={() => { handleSubmitSignUp() }}
  />
  <TouchableOpacity onPress={() => { toggleSignin(); toggleSignup(); }}><Text style={{ marginTop: 50, fontStyle: 'italic' }}>Already have an account ? <Text style={{ color: "#35abd5", textDecorationLine: 'underline' }}>Log in</Text></Text></TouchableOpacity>
</View>
</Overlay>

        </View>
    )
}


function mapDispatchToProps(dispatch) {
    return {
        goToRecipe: function (info) {
            dispatch({ type: 'recipeInfo', recipeInfo: info })
        },
        saveRecipe: function (info) {
            dispatch({ type: 'recipeList', recipeInfo: info })
        },
        deleteRecipe: function (info) {
            dispatch({ type: 'recipeListDel', title: info })
        },
        ingredientList: function(info) { 
            dispatch( {type: 'ingredientList', ingredient: info} ) 
        },
        currentList: function(info) { 
            dispatch( {type: 'listInfo', listInfo: info} ) 
        },
        saveList: function(info) { 
            dispatch( {type: 'addList', list: info} ) 
        },
        addToken: function(token){
            dispatch({type: 'addToken', token: token})
          }
    }
}


function mapStateToProps(state) {
    return { recipeList: state.recipeList,  list: state.list}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withNavigation(RecipeHome));

const styles = StyleSheet.create({
    container: {
        width: 172,
        height: 237,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#f3eef0',
        marginTop: 15,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    }, small: {
        width: 168,
        height: 150,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        marginBottom: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderWidth: 2,
        borderColor: '#f3eef0',
    }, bouton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2

    }, coeur: {
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderWidth: 2,
        borderColor: '#f3eef0',
        paddingHorizontal: 31
    }, list: {
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 30,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderWidth: 2,
        borderColor: '#f3eef0',
        paddingHorizontal: 30
    }, containerOverlay: {
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15
    }, ingredients: {
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 10,
        paddingBottom: 15,
        paddingTop: 15,
        borderRadius: 30,
        height: 300,

    },
    overlay: {
        width: 290,
        margin:18,
        justifyContent: 'center',
      },
    input:{
        borderWidth:1,
        borderRadius:20,
        height:60,
        marginBottom:20
      }, 
})