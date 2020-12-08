var express = require('express');
var router = express.Router();

var uid2 = require("uid2");
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");
var axios = require("axios").default;

const recipesModel = require('../models/recipes')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/find', async function(req, res, next) {
  var recipes = await recipesModel.find();
  res.json(recipes);
});

router.post('/filters', async function(req, res, next) {

  console.log(req.body)

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

  console.log('EMP',empty)

  var result = await recipesModel.find(empty);

  console.log('RES',result);
  
  res.json(result);
});

router.get('/save', function(req, res, next) {
  var options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
    params: {number: '40'},
    headers: {
      'x-rapidapi-key': '4267f086a5msh5279f0cd7ea484ap11e19djsnbb7a043890d4',
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };
  axios.request(options).then(async function (response) {
    console.log('SUCCESS',response.data);
    var recipes = response.data.recipes;
    for( var i = 0; i< recipes.length; i++){
      var newRecipe = new recipesModel ({
        title: recipes[i].title,
        instruction: recipes[i].instruction,
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

module.exports = router;
