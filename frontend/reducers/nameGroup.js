export default function(addnameGroup = "", action){
  
    if(action.type == 'nameGroup') {
      return action.addnameGroup;
    } else {
      return addnameGroup;
    }
    
  }