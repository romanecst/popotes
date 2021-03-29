export default function(ingredientList = [], action) {

    if(action.type == 'ingredientList') {
        var newList = [...ingredientList];
        action.ingredient.forEach(element => {
          newList.push(element);
        });
      return newList;

    }else if(action.type == 'delingredientList'){
      var newList = ingredientList.filter( el => el.name !== action.name);
      return newList;

    }else if(action.type == 'clearingredientList'){

      return action.fav;
      
    }else if(action.type == 'addIngr'){
      var newList = [...ingredientList];
      newList.push(action.ingr);
      return newList;
    }else {
      return ingredientList;
    }
    
  }