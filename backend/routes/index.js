var express = require('express');
var router = express.Router();

var uid2 = require("uid2");
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");
var axios = require("axios").default;

const recipesModel = require('../models/recipes');
const userModel = require('../models/users');
const groupModel = require('../models/group');
const listModel = require('../models/list')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/search', async function (req, res, next) {
  var regex = `${req.body.search}.*`
  var recipes = await recipesModel.find(
    { title: { $regex: regex, $options: 'i' } }
  );
  res.json(recipes);
});


/* Recipe filter */
router.get('/find', async function (req, res, next) {
  //limit à enlever pour recevoir toute la bdd
  var recipes = await recipesModel.find().limit(50);
  res.json(recipes);
});

router.post('/filters', async function (req, res, next) {

  var filters;

  if (req.body.time === 'quick') {
    filters = {
      readyInMinutes: { $lte: 30 },
      cuisines: { $all: [`${req.body.cuisine}`] },
      cheap: req.body.price,
      veryHealthy: req.body.healthy,
      glutenFree: req.body.gluten,
      vegetarian: req.body.vegetarian,
      lactoseFree: req.body.lactose,
      vegan: req.body.vegan,
      dishTypes: { $all: [`${req.body.type}`] }
    };
  } else {
    filters = {
      readyInMinutes: { $gt: 30 },
      cuisines: { $all: [`${req.body.cuisine}`] },
      cheap: req.body.price,
      veryHealthy: req.body.healthy,
      glutenFree: req.body.gluten,
      vegetarian: req.body.vegetarian,
      lactoseFree: req.body.lactose,
      vegan: req.body.vegan,
      dishTypes: { $all: [`${req.body.type}`] }
    };
  }

  let len = Object.keys(req.body).length;

  let empty = {};


  for (var i = 0; i < len; i++) {
    if (req.body[Object.keys(req.body)[i]] !== '' && req.body[Object.keys(req.body)[i]] !== 'false') {
      empty[Object.keys(filters)[i]] = filters[Object.keys(filters)[i]];
    }
  }

  var result = await recipesModel.find(empty);

  res.json(result);
});


/* Save recipe in BDD */
router.get('/save', function (req, res, next) {
  var options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
    params: { number: '45' },
    headers: {
      'x-rapidapi-key': '4267f086a5msh5279f0cd7ea484ap11e19djsnbb7a043890d4',
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };
  axios.request(options).then(async function (response) {
    console.log('SUCCESS');
    console.log("RECIPE", response.data.recipes);
    console.log('TYPE', response.data.recipes[0].dishTypes)

    var recipes = response.data.recipes;
    for (var i = 0; i < recipes.length; i++) {
      var newRecipe = new recipesModel({
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
        extendedIngredients: recipes[i].extendedIngredients,
        dishTypes: recipes[i].dishTypes
      });
      await newRecipe.save();
    }
  }).catch(function (error) {
    console.error('ERROR', error);
  });
  res.render('index', { title: 'Express Save' });
});



/* Road sign-up */
router.post('/sign-up', async function (req, res, next) {

  var error = [];
  var result = false;
  var saveUser = null;
  var token = null;


  const searchUser = await userModel.findOne({
    email: req.body.emailFromFront
  })

  if (searchUser != null) {
    error.push('User already exists')
  }

  if (req.body.usernameFromFront == ''
    || req.body.emailFromFront == ''
    || req.body.passwordFromFront == ''
  ) {
    error.push('Empty fields')
  }

  if (error.length == 0) {

    var salt = uid2(32)
    var newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: SHA256(req.body.passwordFromFront + salt).toString(encBase64),
      token: uid2(32),
      salt: salt,
    })

    saveUser = await newUser.save();

    if (saveUser) {
      result = true,
        token = saveUser.token
    }
  }

  res.json({ result, saveUser, error, token })
})


/* Road sign-in */
router.post('/sign-in', async function (req, res, next) {

  var error = [];
  var result = false;
  var user = null;
  var token = null;

  if (req.body.emailFromFront == ''
    || req.body.passwordFromFront == ''
  ) {
    error.push('Empty fields')
  }

  if (error.length == 0) {
    const user = await userModel.findOne({
      email: req.body.emailFromFront,
    })

    if (user) {
      const passwordEncrypt = SHA256(req.body.passwordFromFront + user.salt).toString(encBase64)

      if (passwordEncrypt == user.password) {
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

  res.json({ result, user, error, token })
})

/* Create group */
router.post('/group', async function (req, res, next) {
  console.log('je passe par ma route ')

  var error = [];
  var result = false;
  var groupSave;
  var token;
  var groupSearch;


  groupSearch = await groupModel.findOne({
    name: req.body.nameGroupFromFront
  })

  if (groupSearch != null) {
    error.push('Group already exists'),
      console.log('test différent de null')
  }

  if (req.body.nameGroupFromFront == '') {
    result = false,
      error.push('Empty fields'),
      console.log('test si champ name vide')
  }
  if (error.length == 0) {

    var newGroup = new groupModel({
      name: req.body.nameGroupFromFront,
      avatar: req.body.avatarGroupFromFront,
      group_token: uid2(32),
    });

    groupSave = await newGroup.save();
    console.log("test groupeSave", groupSave)
  }

  if (groupSave) {
    result = true,
      token = groupSave.group_token,
      console.log('tout est ok')
  };


  res.json({ result, token, error, groupSave });
});


/* Assign color a user group */
router.post('/addUser', async function (req, res, next) {

  var colorUser = ['#FFC312', '#C4E538', '#12CBC4', '#FDA7DF', '#ED4C67',
    '#F79F1F', '#A3CB38', '#1289A7', '#D980FA', '#B53471',
    '#EE5A24', '#009432', '#0652DD', '#9980FA', '#833471',
    '#EA2027', '#006266', '#1B1464', '#5758BB', '#6F1E51']

    var group = await groupModel.findOne({ group_token: req.body.token });
  var userColor = [];

  for (var i = 0; i < group.user_id.length; i++) {
    userColor.push({ user: group.user_id[i], color: colorUser[i] })
  }
  res.json(JSON.stringify(userColor));
})

/* Deleted group */
router.delete('/deleteGroup/:name', async function (req, res, next) {

  var returnDb = await groupModel.deleteOne({ nameGroup: req.body.nameGroup });

  var result = false;
  if (returnDb.deletedCount == 1) {
    result = true
  }
  res.json({ result })
})

/* User update */
router.post('/userUpdate', async function (req, res, next) {

  var user = await userModel.findOne({ token: req.body.token })
  console.log("dede", req.body.token);
  console.log("edesas", user);

  const passwordEncrypt = SHA256(req.body.passwordFromFront + user.salt).toString(encBase64);


  if (req.body.emailFromFront != user.email) {
    var update = await userModel.updateOne({ token: req.body.token }, { email: req.body.emailFromFront })
  }
  else if (req.body.usernameFromFront != user.username) {
    var update = await userModel.updateOne({ token: req.body.token }, { username: req.body.usernameFromFront })
  }
  else if (passwordEncrypt != user.password) {
    var update = await userModel.updateOne({ token: req.body.token }, { password: passwordEncrypt })
  }
  res.json({ update })
});

router.post('/addList', async function (req, res, next) {
  var result = false;
  var newList = new listModel({
    name: req.body.name
  });
  listSave = await newList.save();
  if (listSave) {
    result = true;
  }
  res.json(listSave)
});

router.get('/list', async function (req, res, next) {
  var result = await listModel.find();
  res.json(result)
});

router.post('/deleteList', async function (req, res, next) {
  var result = false;
  var returnDb = await listModel.deleteOne({ _id: req.body.id });
  if (returnDb.deletedCount == 1) {
    result = true
  }
  res.json(result)
});

router.post('/addIngredients', async function (req, res, next) {
  var ingredients = JSON.parse(req.body.list);
  if (ingredients.length !== 0) {
    var list = await listModel.updateOne(
      { _id: req.body.listID },
      { ingredients: ingredients }
    );
  }
  res.json()
});

router.post('/deleteIngredients', async function (req, res, next) {
  // var ingredients = JSON.parse(req.body.list);
  // if(ingredients.length !== 0){
  //   var list = await listModel.updateOne(
  //     {_id: req.body.listID},
  //     {ingredients: ingredients}
  //     );
  // }
  res.json()});
router.post('/getIngredients', async function(req,res,next){
    var list = await listModel.findOne({_id: req.body.id});
  res.json(list)
});


/* Random carrousel */
router.get('/randomCourrousel', async function(req, res, next) {
  var recipes = await recipesModel.find();
  var idRecipe = [];
  for(var i=0; i<recipes.length; i++){
    idRecipe.push(recipes[i]._id)
  }
  var random = Math.round(Math.random() * idRecipe.length)
  var id = idRecipe[random];
  var randomRecipe = await recipesModel.findOne({_id:id});

  res.json(randomRecipe);
});


module.exports = router;




