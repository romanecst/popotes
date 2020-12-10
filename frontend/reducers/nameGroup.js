export default function(listNameGroup = [], action) {
  
    if(action.type == 'nameGroup') {
var newListNameGroup = [...listNameGroup, action.nomDuGroupe]
console.log(newListNameGroup)
      return newListNameGroup;
    } else {
      return listNameGroup;
    }
    
  }