export default function(checkList = [], action) {

    if(action.type == 'checkList') {
        var newList = [...checkList];
        newList.push(action.ingredient);
      return newList;

    } else if(action.type == 'delCheckList'){
        var newList = [...checkList];
        newList = newList.filter(element=> element !== action.ingredient);
      return newList;

    }else {
      return checkList;
    }
    
  }