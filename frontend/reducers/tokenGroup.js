export default function(tokenGroup = '', action){
 
    if(action.type == 'tokenGroup'){
        return action.tokenGroup
    } else {
        return tokenGroup
    }
}