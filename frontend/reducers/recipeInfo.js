export default function(recipe = {}, action) {
  
    if(action.type == 'recipeInfo') {
      return action.recipeInfo;
    } else {
      return recipe;
    }
    
  }