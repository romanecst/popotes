
import React, { useState, useEffect } from 'react';
import { AsyncStorage, StyleSheet, Text, View, Picker, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Button, Overlay, Card, SearchBar, Avatar, Input } from 'react-native-elements';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import DropDownPicker from 'react-native-dropdown-picker';
import Checking from './checkingOverlay';

import {baseURL} from './adressIP'





function RecipeHome(props) {
    const [like, setLike] = useState(false);
    const [selectedList, setSelectedList] = useState();

    const [signInEmail, setSignInEmail] = useState('')
    const [signInPassword, setSignInPassword] = useState('')
  
    const [listErrorsSignin, setErrorsSignin] = useState([])
  
    const [visibleSignin, setVisibleSignin] = useState(false);
    const [visibleSignup, setVisibleSignup] = useState(false);
  
    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
  
  
    const [listErrorSignUp, setListErrorSignUp] = useState([]);
  
    const toggleSignin = () => {
      setVisibleSignin(!visibleSignin);
    }
  
    const toggleSignup = () => {
      setVisibleSignup(!visibleSignup);
    }

  
    var handleSubmitSignin = async () => {
   
      const data = await fetch(`${baseURL}/sign-in`, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`
      })
  
      const body = await data.json()
  
      if(body.result == true){
        
        console.log(body.token);
        props.addToken(body.token);
        AsyncStorage.setItem("user token", body.token);
        toggleSignin();
        toggleOverlay();
        
      }  else {
        setErrorsSignin(body.error)
      }
    }
  
    var tabErrorsSignin = listErrorsSignin.map((error,i) => {
      return(<Text>{error}</Text>)
    })
  
    var handleSubmitSignUp = async () => {
  
      const data = await fetch(`${baseURL}/sign-up`, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`
      })
  
      const body = await data.json()
      if(body.result == true){
        props.addToken(body.token);
        AsyncStorage.setItem("user token", body.token);
        toggleSignup();
        toggleOverlay();
  
  
      } else {
        setListErrorSignUp(body.error)
      }
    }
  
    var tabErrorsSignup = listErrorSignUp.map((error,i) => {
      return(<Text>{error}</Text>)
    })
  


    function colorLike() {
        setLike(!like);
    }


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

    var likes = props.recipeList.find(element => element.title == props.recipeInfo.title);

    if (likes != undefined) {
        colorHeart = { color: '#FF0000' }
    } else {
        colorHeart = { color: 'black' }
    }

    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    var overlayIngredients = props.recipeInfo.extendedIngredients.map(function(ingredient, j){
        return <Checking key={j} name={ingredient.name} quantity= {ingredient.amount} measure={ingredient.measures.us.unitLong}/>
    });

    var newIngredients = props.recipeInfo.extendedIngredients.map(function(ingredient, i){
    return {name: ingredient.name, amount: ingredient.amount, measure: ingredient.measures.us.unitLong, aisle: ingredient.aisle, recipeName: props.recipeInfo.title}
    });


    if(props.list.length !== 0){
    var items = props.list.map(function(el){
        return { label: el.name, value: el._id }
    });
    items.unshift({ label: 'New List', value: 'new list' })
    }else{
    var items = { label: 'New List', value: 'new list' }
    }

    const loggedIn = ()=> {
    AsyncStorage.getItem("user token", 
            async function(error, data){
                if(data){
                props.addToken(data);
                toggleOverlay();
                }else{
                setVisibleSignup(true);
                }
            })
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
                        onPress={() => loggedIn()}
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
          onPress={() => { props.currentList(selectedList); props.ingredientList(newIngredients); toggleOverlay(); props.navigation.navigate('GlobalList') }}
        />
        </View>
      </Overlay>

      {/* -------------------------OVERLAY ----- SIGN IN/UP ---------------------------------- */}


      <Overlay overlayStyle={{backgroundColor:'#dfe6e9', borderRadius: 50,}} isVisible={visibleSignin} >
        
        <View style={styles.overlay}>
          <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 25, marginLeft:100 }}>Sign-in{"\n"}{"\n"}</Text>
            <Avatar
                size="large"
                rounded
                title="LW"
                activeOpacity={1}
                containerStyle={{backgroundColor:"red",marginBottom:60,marginLeft:100}}
            />
             
            <Input
                containerStyle={styles.input}
                placeholder='Email'
                leftIcon={{ type: 'font-awesome', name: 'at' }}
                onChangeText={(val) => setSignInEmail(val)}
                val = {signInEmail}
            />
            <Input
                containerStyle={styles.input}
                placeholder='Password'
                leftIcon={{ type: 'font-awesome', name: 'unlock' }}
                onChangeText={(val) => setSignInPassword(val)}
                val = {signInPassword}
            />

              {tabErrorsSignin}

        <Button
          title="Sign-in"
          type="clear"
          buttonStyle={{ borderColor: 'white', justifyContent: 'center' }}
          titleStyle={{ color: 'red', fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingTop: 30 }}
          onPress={() => handleSubmitSignin()}
        />
        <TouchableOpacity onPress={()=>{toggleSignup(); toggleSignin();}}><Text>Not registered yet? Create an account</Text></TouchableOpacity>
        </View>
      </Overlay>


      <Overlay overlayStyle={{backgroundColor:'#dfe6e9', borderRadius: 50,}} isVisible={visibleSignup} >
        
        <View style={styles.overlay}>
          <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 25, marginLeft:100 }}>Sign-up{"\n"}{"\n"}</Text>
            <Avatar
                size="large"
                rounded
                title="LW"
                activeOpacity={1}
                containerStyle={{backgroundColor:"red",marginBottom:60,marginLeft:100}}
            />
             <Input
                containerStyle={styles.input}
                placeholder='Username'
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                onChangeText={(val) => setSignUpUsername(val)}
                val = {signUpUsername}
            />
            <Input
                containerStyle={styles.input}
                placeholder='Email'
                leftIcon={{ type: 'font-awesome', name: 'at' }}
                onChangeText={(val) => setSignUpEmail(val)}
                val = {signUpEmail}
            />
            <Input
                containerStyle={styles.input}
                placeholder='Password'
                leftIcon={{ type: 'font-awesome', name: 'unlock' }}
                onChangeText={(val) => setSignUpPassword(val)}
                val = {signUpPassword}
            />

            {tabErrorsSignup}

        <Button
          title="Sign-up"
          type="clear"
          buttonStyle={{ borderColor: 'white', justifyContent: 'center' }}
          titleStyle={{ color: 'red', fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingTop: 30 }}
          onPress={() => {handleSubmitSignUp()}}
        />
        <TouchableOpacity onPress={()=>{toggleSignin(); toggleSignup();}}><Text>Already have an account? Log in</Text></TouchableOpacity> 
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