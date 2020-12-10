var express = require('express');
var router = express.Router();

var uid2 = require("uid2");
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");
var axios = require("axios").default;

const recipesModel = require('../models/recipes');
const userModel = require('../models/users');
const groupModel = require('../models/group')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/search', async function(req, res, next) {
  var regex = `${req.body.search}.*`
  var recipes = await recipesModel.find(
    {title: {$regex: regex, $options: 'i'}}
  );
  res.json(recipes);
});

router.get('/find', async function(req, res, next) {
  //limit à enlever pour recevoir toute la bdd
  var recipes = await recipesModel.find().limit( 30 );
  res.json(recipes);
});

router.post('/filters', async function(req, res, next) {

  var filters;

  if(req.body.time === 'quick'){
    filters = {
      readyInMinutes: {$lte: 30},
      cuisines: {$all: [`${req.body.cuisine}`]},
      cheap: req.body.price,
      veryHealthy: req.body.healthy,
      glutenFree: req.body.gluten,
      vegetarian: req.body.vegetarian,
      lactoseFree: req.body.lactose,
      vegan: req.body.vegan
    };
  }else{
    filters = {
      readyInMinutes: {$gt: 30},
      cuisines: {$all: [`${req.body.cuisine}`]},
      cheap: req.body.price,
      veryHealthy: req.body.healthy,
      glutenFree: req.body.gluten,
      vegetarian: req.body.vegetarian,
      lactoseFree: req.body.lactose,
      vegan: req.body.vegan
    };
  }

  let len = Object.keys(req.body).length;
 
  let empty = {};


  for(var i = 0; i<len; i++){
    if (req.body[Object.keys(req.body)[i]] !== '' && req.body[Object.keys(req.body)[i]] !== 'false'){
      empty[Object.keys(filters)[i]] = filters[Object.keys(filters)[i]];
    }
  }

  var result = await recipesModel.find(empty);

  
  res.json(result);
});

router.get('/save', function(req, res, next) {
  var options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
    params: {number: '45'},
    headers: {
      'x-rapidapi-key': '4267f086a5msh5279f0cd7ea484ap11e19djsnbb7a043890d4',
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };
  axios.request(options).then(async function (response) {
    console.log('SUCCESS');
    var recipes = response.data.recipes;
    for( var i = 0; i< recipes.length; i++){
      var newRecipe = new recipesModel ({
        title: recipes[i].title,
        instructions: recipes[i].instructions,
        image: recipes[i].image,
        vegetarian: recipes[i].vegetarian,
        vegan: recipes[i].vegan, 
        glutenFree: recipes[i].glutenFree,
        dairyFree: recipes[i].dairyFree,
        veryHealthy: recipes[i].veryHealthy,
        veryPopular: recipes[i].veryPopular,
        cheap: recipes[i].cheap,
        readyInMinutes: recipes[i].readyInMinutes,
        servings: recipes[i].servings,
        cuisines: recipes[i].cuisines,
        extendedIngredients: recipes[i].extendedIngredients
      });
      await newRecipe.save();
    }
  }).catch(function (error) {
    console.error('ERROR',error);
  });
  res.render('index', { title: 'Express Save' });
});



/* Road sign-up */
router.post('/sign-up', async function(req,res,next){

  var error = [];
  var result = false;
  var saveUser = null;
  var token = null;


  const searchUser = await userModel.findOne({
    email: req.body.emailFromFront
  })

  if(searchUser != null){
    error.push('User already exists')
  }
    
  if(req.body.usernameFromFront == ''
  || req.body.emailFromFront == ''
  || req.body.passwordFromFront == ''
  ){
    error.push('Empty fields')
  }

  if(error.length == 0){

    var salt = uid2(32)
    var newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: SHA256(req.body.passwordFromFront+salt).toString(encBase64),
      token: uid2(32),
      salt: salt,
    })

    saveUser = await newUser.save();

    if(saveUser){
      result = true,
      token = saveUser.token
    }
  }

  res.json({result, saveUser, error, token})
})


/* Road sign-in */
router.post('/sign-in', async function(req,res,next){

  var error = [];
  var result = false;
  var user = null;
  var token = null;

  if(req.body.emailFromFront == ''
  || req.body.passwordFromFront == ''
  ){
    error.push('Empty fields')
  }

  if(error.length == 0){
    const user = await userModel.findOne({
      email: req.body.emailFromFront,
    })

    if(user){
      const passwordEncrypt = SHA256(req.body.passwordFromFront + user.salt).toString(encBase64)

      if(passwordEncrypt == user.password){
        result = true
        token = user.token
        console.log(token);
      } else {
        result = false
        error.push('Incorrect password')
      }
    } else {
      error.push('Incorrect email')
    }
  }

  res.json({result, user, error, token})
})


router.post('/group', async function(req, res, next) {
  
  
  var newGroup = new groupModel ({
    name: req.body.nameGroupFromFront,
    avatar: "./assets/bouf.jpg",
    group_token:uid2(32),
   });

   var groupSave = await newGroup.save();
console.log("test groupe",  groupSave);

  res.json();
});


module.exports = router;
