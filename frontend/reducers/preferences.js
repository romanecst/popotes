export default function(preferences = {}, action) {
  
    if(action.type == 'addpref') {
        newObject = {...preferences};
        newObject[action.pref] = true;
      return newObject;

    } else if(action.type == 'delpref'){
        newObject = {...preferences};
        newObject[action.pref] = false;
        return newObject;

    }else {
      return preferences;
    }
    
  }