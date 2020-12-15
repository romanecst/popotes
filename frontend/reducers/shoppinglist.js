export default function(list = [], action) {
    if(action.type == 'addList') {
        var newList = [...list];
        newList.push(action.list);
      return newList;

    }else if(action.type == 'delList'){
        var newList = [...list];
        newList.filter(el => el._id !== action.list);
      return newList;

    }else if(action.type == 'loadList'){
      return action.list;
    }else {
      return list;
    }
    
  }