export default function(ingredientList = [], action) {

    if(action.type == 'ingredientList') {
        var newList = [...ingredientList];
        newList.push(action.ingredient);
      return newList;

    }else if(action.type == 'delingredientList'){
      var newList = [];
      for(var i=0; i<ingredientList.length; i++){
        var list = ingredientList[i].filter( el => el.name !== action.name);
        newList.push(list)
      }
      return newList;
    }else if(action.type == 'clearingredientList'){
      var newList = [];
      return newList;
    }else {
      return ingredientList;
    }
    
  }