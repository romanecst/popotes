export default function(preferences = {}, action) {
  
    if(action.type == 'addpref') {
        newObject = {...preferences};
        newObject[action.pref] = true;
        console.log('NEWOBJ', newObject)
      return newObject;

    } else if(action.type == 'delpref'){
        newObject = {...preferences};
        newObject[action.pref] = false;
        console.log('NEWOBJ DELLLL', newObject)
        return newObject;

    }else {
      return preferences;
    }
    
  }