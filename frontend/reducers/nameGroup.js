export default function(nameGroup = " ", action){
  console.log("essai reducer namegroup", nameGroup)
    if(action.type == 'nameGroup') {
      return action.nameGroup;
    } else {
      return nameGroup;
    }
    
  }