export default function(ingredientList = [], action) {

    if(action.type == 'ingredientList') {
        var newList = [...ingredientList];
        newList.push(action.ingredient);
      return newList;

    }else {
      return ingredientList;
    }
    
  }