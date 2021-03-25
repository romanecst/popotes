import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import { Header, SearchBar, Button, Overlay, Input, Avatar } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import Checking from './components/checkingOverlay';

import { AntDesign, FontAwesome, Fontisto, Entypo } from '@expo/vector-icons';

import { connect } from 'react-redux';
import Sign from './Sign';
import { baseURL } from './components/adressIP'

//display recipe information
function Recipe(props) {

  const [servings, setServings] = useState(props.recipeInfo.servings);
  const [selectedList, setSelectedList] = useState();
  const [like, setLike] = useState(false);

  const [visible, setVisible] = useState(false);
  const [sign, setSign] = useState(false);

  const [lists, setLists] = useState([])

  function back(){
    setVisible(false)
  }

  //sign in/up of the user on click on the add to list button
    //ingredient overlay 
  //checks if the user is connected 
  //if user connected token stored in redux store and request of the user shopping lists to backend to display their name and open ingredient overlay
  //else sign up overlay opens
  const homeInit = async()=>{
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
      setLists(body);
      setVisible(true);
      }else{
        setSign(true);
      }
    })
  }

  const toggleOverlay = () => {
    if(!visible){
      homeInit();
    }
  };
 

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
  if(lists.length == 0){
    var items = [{label: 'Create a New List'}]
  }else{
    var items = lists.map(function(el){
        return { label: el.name, value: el._id }
    });
}

  
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
  async function toList(){
    props.currentList(selectedList); 
    props.ingredientList(newIngredients); 
    setVisible(false);
    const dataFetch = await fetch(`${baseURL}/findGroupList`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `token=${props.token}&list=${selectedList._id}`
    });
    const body = await dataFetch.json();
    if(body){
      props.AddTokenGroup(body);
      props.navigation.navigate('MesGroupesP12') 
    }else{
      props.navigation.navigate('GlobalList') 
    }
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
        {sign && <Sign/>}
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
            onChangeItem={item => {
              if(item.label == 'Create a New List'){
                setVisible(false);  
                props.navigation.navigate('List');
              }else{
                setSelectedList({_id: item.value, name: item.label});
          }}}
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

