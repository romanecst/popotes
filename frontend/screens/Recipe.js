import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import { Header, SearchBar, Button, Overlay, Input, Avatar } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import Checking from './components/checkingOverlay';

import { AntDesign, FontAwesome, Fontisto, Entypo } from '@expo/vector-icons';

import { connect } from 'react-redux';

import { baseURL } from './components/adressIP'

//display recipe information
function Recipe(props) {

  const [servings, setServings] = useState(props.recipeInfo.servings);
  const [selectedList, setSelectedList] = useState();
  const [like, setLike] = useState(false);

  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  const [listErrorsSignin, setErrorsSignin] = useState([])

  const [visible, setVisible] = useState(false);
  const [visibleSignin, setVisibleSignin] = useState(false);
  const [visibleSignup, setVisibleSignup] = useState(false);

  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');


  const [listErrorSignUp, setListErrorSignUp] = useState([]);
  const [lists, setLists] = useState([])

  //sign in/up of the user on click on the add to list button
    //ingredient overlay 
  //checks if the user is connected 
  //if user connected token stored in redux store and request of the user shopping lists to backend to display their name and open ingredient overlay
  //else sign up overlay opens
  const toggleOverlay = () => {
    setVisible(!visible);
    if (!visible) {
      AsyncStorage.getItem("user token",
        async function (error, data) {
          console.log('DATAT', data)
          if (data) {
            props.addToken(data);
            const dataFetch = await fetch(`${baseURL}/getMyLists`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: `token=${data}`
            });
            const body = await dataFetch.json();
            setLists(body)

          } else {
            setVisibleSignup(true);
          }
        })
    }
  };

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
      console.log(body.token);
      props.addToken(body.token);
      //user token saved in async storage and overlay closes
      AsyncStorage.setItem("user token", body.token);
      toggleSignin();
      toggleOverlay();

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
      toggleOverlay();


    } else {
      setListErrorSignUp(body.error)
    }
  }
  //displays errors
  var tabErrorsSignup = listErrorSignUp.map((error, i) => {
    return (<Text>{error}</Text>)
  })

//remove html tags from instructions
  var instructions = props.recipeInfo.instructions.replace(/<li>|<ol>|<\/li>|<\/ol>/g, " ");

//create an array of object with the ingredients in the current recipe to be sent on the global list screen with changeable amount
  var newIngredients = props.recipeInfo.extendedIngredients.map(function (ingredient, i) {
    ingredient.amount = (servings * ingredient.amount) / props.recipeInfo.servings;
    if (!Number.isInteger(ingredient.amount)) {
      ingredient.amount = ((servings * ingredient.amount) / props.recipeInfo.servings).toFixed(1);
    }
    console.log('IDDDDD', ingredient._id)
    return { id: ingredient.id, name: ingredient.name, amount: ingredient.amount, measure: ingredient.measures.us.unitLong, aisle: ingredient.aisle, recipeName: props.recipeInfo.title }
  });

    //displays current recipes ingredients in the recipe information with changeable amount
  var ingredients = props.recipeInfo.extendedIngredients.map(function (ingredient, i) {
    var amount = (servings * ingredient.amount) / props.recipeInfo.servings;
    if (!Number.isInteger(amount)) {
      amount = ((servings * ingredient.amount) / props.recipeInfo.servings).toFixed(1);
    }
    return <Text key={i} style={{ fontSize: 18 }}>{ingredient.name}: {amount} {ingredient.measures.us.unitLong} {'\n'}</Text>
  });

  //displays current recipes ingredients in the overlay with changeable amount
  var overlayIngredients = props.recipeInfo.extendedIngredients.map(function (ingredient, j) {
    ingredient.amount = (servings * ingredient.amount) / props.recipeInfo.servings;
    if (!Number.isInteger(ingredient.amount)) {
      ingredient.amount = ((servings * ingredient.amount) / props.recipeInfo.servings).toFixed(1);
    }
    return <Checking key={j} name={ingredient.name} quantity={ingredient.amount} measure={ingredient.measures.us.unitLong} />
  })

  //display names of user's shopping lists
  var items = lists.map(function (el) {
    return { label: el.name, value: el._id }
  });

  
//if recipe is liked it is stored in the redux store if it isn't already in it
//if recipe in unliked it is deleted from the redux store
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

  //recipeInfo is the current recipe and recipeList is the array of recipe stored in favourite recipes 
//if they matched then the recipe is likes otherwise it isn't liked
  var likes = props.recipeList.find(element => element.title == props.recipeInfo.title);
  var colorHeart;

  const colorLike = () => {
    setLike(!like);
  }

  if (likes != undefined) {
    colorHeart = '#FF0000'
  } else {
    colorHeart = 'black'
  }

 //once the ingredient are validated by the user request to backend to store them in the selsected in list of the user in the database
  //the array created above is stored in redux 
  //user is then redirected to global list srcreen which is the shopping list
  async function toList() {
    props.currentList(selectedList);
    await fetch(`${baseURL}/addIngredients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `list=${selectedList._id}&ingredients=${JSON.stringify(newIngredients)}`
    });
    props.ingredientList(newIngredients);
    toggleOverlay();
    props.navigation.navigate('GlobalList')
  }

  return (


    <View style={{ flex: 1, backgroundColor: '#eefaea' }}>

      <Header
        containerStyle={{ backgroundColor: '#ade498', height: 90, paddingTop: 50 }}
        leftComponent={<AntDesign name="leftcircleo" size={24} color="white" onPress={() => { props.navigation.goBack(null) }} />}
        centerComponent={{ text: 'RECIPE', style: { color: '#fff', fontFamily: 'Kohinoor Telugu', fontSize: 22 } }}
        rightComponent={<Fontisto name="shopping-basket" size={24} color="white" onPress={() => { props.navigation.navigate('List') }} />}
      />

      <ScrollView style={{ flex: 1, marginTop: 10 }}>
        <View style={styles.container}>
          <Image style={styles.picture} source={{ uri: props.recipeInfo.image }} />
        </View>
        {/* ************* TITRE ********** */}
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={{ fontSize: 22 }}>{props.recipeInfo.title}</Text>
          </View>
          <View >
            <View style={styles.detail1}>
              {/* ************ DUREE RECETTE ************ */}
              <Text style={{ fontSize: 18 }}> Cooking time : {props.recipeInfo.readyInMinutes} </Text>
            </View>
            <View style={styles.detail1}>
              {/* ************ NOMBRE DE PERSONNE RECETTE ************ */}
              <Text style={{ fontSize: 18 }}> Servings : {servings}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.plus}>
                {/* ************BOUTON + //adds a person and increases ingredient amount ************ */}
                <Button
                  title="+"
                  onPress={() => setServings(servings + 1)}
                  type="clear"
                  buttonStyle={{ borderColor: 'white' }}
                  titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu' }}
                />
              </View>
              <View style={styles.moin}>
                {/* ************BOUTON -    //removes a person and decreases ingredient amount************ */}
                <Button
                  title="-"
                  onPress={() => { if (servings > 1) { setServings(servings - 1) } }}
                  type="clear"
                  buttonStyle={{ borderColor: 'white' }}
                  titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu' }}
                />
              </View>
            </View>
          </View>
          <View style={styles.title}>

            <Text style={{ fontSize: 22 }}>INGREDIENTS : {"\n"}</Text>
            {/* ************NOMBRE INGREDIENT *************/}
            {ingredients}
          </View>

          <View style={styles.title}>
            <Text style={{ fontSize: 22 }}>DESCRIPTION :{"\n"}</Text>
            {/* ************DESCRIPTION *************/}
            <Text style={{ fontSize: 18 }}>{instructions}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 100, marginBottom: 50 }}>
            <View style={{ backgroundColor: 'white', padding: 7, borderRadius: 30, marginRight: 100 }}>
              <Button
                buttonStyle={{ borderColor: 'white', backgroundColor: 'white' }}
                icon={<AntDesign
                  name="heart"
                  size={24}
                  color={colorHeart}
                  onPress={() => colorLike()} />} />
            </View>
            <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 30 }}>
              <FontAwesome name="list" size={24} color="black" onPress={() => toggleOverlay()} />
            </View>
          </View>
        </View>
      </ScrollView>


      <Overlay overlayStyle={{ backgroundColor: '#dfe6e9', borderRadius: 50, marginHorizontal: 10 }} isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={styles.containerOverlay}>
          <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 18, marginHorizontal: 15 }}>You will add the ingredients to your shopping list:{"\n"}{"\n"}</Text>
          <Text style={{ fontFamily: 'Kohinoor Telugu', color: '#636e72', marginHorizontal: 50, fontSize: 15 }}>check the ingredients you already have:</Text>
        </View>


        <View style={styles.ingredients}>

          <ScrollView>
            {/* code se trouve dans le composant "checkingOverlay" */}
            {overlayIngredients}
          </ScrollView>

        </View>
        {/* DROP DOWN -- LIST HERE !!  */}
        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
          <DropDownPicker
            items={items}
            defaultIndex={0}
            defaultNull placeholder="Select an list"
            containerStyle={{ width: 150, height: 70 }}
            style={{ marginBottom: 10 }}
            onChangeItem={item => setSelectedList({ _id: item.value, name: item.label })}
          />
          <Button
            iconRight={true}
            title="Next  "
            buttonStyle={{ borderColor: 'white', marginHorizontal: 100, borderRadius: 30, backgroundColor: 'white', justifyContent: 'center' }}
            titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu' }}
            onPress={() => toList()}
          />
        </View>
      </Overlay>


      {/* -------------------------OVERLAY ----- SIGN IN/UP ---------------------------------- */}


      <Overlay overlayStyle={{ backgroundColor: '#dfe6e9', borderRadius: 50, }} isVisible={visibleSignin} >

        <View style={styles.overlay}>
          <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 25, marginLeft: 100 }}>Sign-in{"\n"}{"\n"}</Text>
          <Avatar
            size="large"
            rounded
            title="LW"
            activeOpacity={1}
            containerStyle={{ backgroundColor: "red", marginBottom: 60, marginLeft: 100 }}
          />

          <Input
            containerStyle={styles.input}
            placeholder='Email'
            leftIcon={{ type: 'font-awesome', name: 'at' }}
            onChangeText={(val) => setSignInEmail(val)}
            val={signInEmail}
          />
          <Input
            containerStyle={styles.input}
            placeholder='Password'
            leftIcon={{ type: 'font-awesome', name: 'unlock' }}
            onChangeText={(val) => setSignInPassword(val)}
            val={signInPassword}
          />

          {tabErrorsSignin}

          <Button
            title="Sign-in"
            type="clear"
            buttonStyle={{ borderColor: 'white', justifyContent: 'center' }}
            titleStyle={{ color: 'red', fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingTop: 30 }}
            onPress={() => handleSubmitSignin()}
          />
          <TouchableOpacity onPress={() => { toggleSignup(); toggleSignin(); }}><Text>Not registered yet? Create an account</Text></TouchableOpacity>
        </View>
      </Overlay>


      <Overlay overlayStyle={{ backgroundColor: '#dfe6e9', borderRadius: 50, }} isVisible={visibleSignup} >

        <View style={styles.overlay}>
          <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 25, marginLeft: 100 }}>Sign-up{"\n"}{"\n"}</Text>
          <Avatar
            size="large"
            rounded
            title="LW"
            activeOpacity={1}
            containerStyle={{ backgroundColor: "red", marginBottom: 60, marginLeft: 100 }}
          />
          <Input
            containerStyle={styles.input}
            placeholder='Username'
            leftIcon={{ type: 'font-awesome', name: 'user' }}
            onChangeText={(val) => setSignUpUsername(val)}
            val={signUpUsername}
          />
          <Input
            containerStyle={styles.input}
            placeholder='Email'
            leftIcon={{ type: 'font-awesome', name: 'at' }}
            onChangeText={(val) => setSignUpEmail(val)}
            val={signUpEmail}
          />
          <Input
            containerStyle={styles.input}
            placeholder='Password'
            leftIcon={{ type: 'font-awesome', name: 'unlock' }}
            onChangeText={(val) => setSignUpPassword(val)}
            val={signUpPassword}
          />

          {tabErrorsSignup}

          <Button
            title="Sign-up"
            type="clear"
            buttonStyle={{ borderColor: 'white', justifyContent: 'center' }}
            titleStyle={{ color: 'red', fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingTop: 30 }}
            onPress={() => { handleSubmitSignUp() }}
          />
          <TouchableOpacity onPress={() => { toggleSignin(); toggleSignup(); }}><Text>Already have an account? Log in</Text></TouchableOpacity>
        </View>
      </Overlay>

    </View>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    ingredientList: function (info) {
      dispatch({ type: 'ingredientList', ingredient: info })
    },
    currentList: function (info) {
      dispatch({ type: 'listInfo', listInfo: info })
    },
    addToken: function (token) {
      dispatch({ type: 'addToken', token: token })

    },
    saveRecipe: function (info) {
      dispatch({ type: 'recipeList', recipeInfo: info })
    },
    deleteRecipe: function (info) {
      dispatch({ type: 'recipeListDel', title: info })
    },
  }
}

function mapStateToProps(state) {
  return { recipeInfo: state.recipe, list: state.list, recipeList: state.recipeList }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipe);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  }, picture: {
    borderRadius: 30,
    width: 320,
    height: 300,
  }, title: {
    alignItems: 'center',
    backgroundColor: 'white',
    fontFamily: 'Kohinoor Telugu',
    width: 320,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15
  }, detail1: {
    fontFamily: 'Kohinoor Telugu',
    backgroundColor: 'white',
    width: 320,
    borderRadius: 30,
    padding: 12,
    marginBottom: 3,
    alignItems: "center",
  }, plus: {
    fontFamily: 'Kohinoor Telugu',
    backgroundColor: 'white',
    width: 157,
    borderRadius: 30,
    marginBottom: 3,
    justifyContent: "flex-start",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 0,
    marginBottom: 50,
  }, moin: {
    fontFamily: 'Kohinoor Telugu',
    backgroundColor: 'white',
    marginLeft: 3,
    width: 157,
    borderRadius: 30,
    marginBottom: 3,
    justifyContent: "flex-start",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 40,
    marginBottom: 50,
  },
  containerOverlay: {
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15
  },
  ingredients: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 10,
    paddingBottom: 15,
    paddingTop: 15,
    borderRadius: 30,
    height: 300,
  }
});

