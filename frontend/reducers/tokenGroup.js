export default function(tokenGroup = '', action){
    console.log('test token group', action.tokenGroup)
    if(action.type == 'tokenGroup'){
        return action.tokenGroup
    } else {
        return tokenGroup
    }
}