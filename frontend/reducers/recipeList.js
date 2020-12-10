export default function(recipeList = [], action) {

    if(action.type == 'recipeList') {
        var newList = [...recipeList];
        newList.push(action.recipeInfo);
      return newList;

    } else if(action.type == 'recipeListDel'){
        var newList = [...recipeList];
        newList = newList.filter(element=> element.title !== action.title);
      return newList;

    }else {
      return recipeList;
    }
    
  }