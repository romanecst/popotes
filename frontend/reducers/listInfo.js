export default function(listInfo = {}, action) {
  
    if(action.type == 'listInfo') {
      return action.listInfo;
    } else {
      return listInfo;
    }
    
  }