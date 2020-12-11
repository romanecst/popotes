export default function(tokenGroup = '', action){
    console.log('test tokengroup reducer', tokenGroup)
    if(action.type == 'tokenGroup'){
        return action.tokenGroup
    } else {
        return tokenGroup
    }
}