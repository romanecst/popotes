export default function(nameGroup = " ", action){

    if(action.type == 'nameGroup') {
      return action.nameGroup;
    } else {
      return nameGroup;
    }
    
  }