import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView} from 'react-native';
import { Header, SearchBar } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';

import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default function Favorite({ navigation }) {

    const [searchTxt, setSearchTxt] = useState('')

    function updateSearch(search){
        setSearchTxt(search)}


    return (


        <View style={{ flex: 1, backgroundColor: '#fff2df' }}>
            
            <Header
                containerStyle={{backgroundColor:'#febf63', height:90, paddingTop:50}}
                leftComponent= {<AntDesign name="leftcircleo" size={24} color="white" />}
                centerComponent={{ text: 'FAVORITE', style: { color: '#fff', fontFamily: 'Kohinoor Telugu'} }}
                rightComponent={<Fontisto name="shopping-basket" size={24} color="white" onPress={() => {navigation.navigate('List')}} />}
            />
           
           <SearchBar 
            // backgroundColor="white"
            containerStyle= {{width:"70%", borderRadius:20, backgroundColor:'#fff2df', borderTopColor:'#fff2df', borderBottomColor: '#fff2df', marginLeft:59, marginTop:10}}
            inputContainerStyle= {{borderRadius: 50, backgroundColor:"white"}}
            lightTheme={true}
            placeholder="Search"
            onChangeText= {updateSearch}
            value={searchTxt}/>

            <ScrollView style={{ flex: 1, marginTop: 10 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <View style={styles.container}>
                        <Image style={styles.picture} source={require('../assets/bouf.jpg')} />
                        <Text style={styles.text} >** TITLE RECIPES**</Text>
                        <View style={{backgroundColor:'#fbfafa', paddingBottom:63, paddingTop:63, paddingRight:5}}>
                        <Entypo name="cross" size={24} color="black" />
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Image style={styles.picture} source={require('../assets/bouf.jpg')} />
                        <Text style={styles.text} >** TITLE RECIPES **</Text>
                        <View style={{backgroundColor:'#fbfafa', paddingBottom:63, paddingTop:63, paddingRight:5}}>
                        <Entypo name="cross" size={24} color="black" />
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Image style={styles.picture} source={require('../assets/bouf.jpg')} />
                        <Text style={styles.text} >** TITLE RECIPES **</Text>
                        <View style={{backgroundColor:'#fbfafa', paddingBottom:63, paddingTop:63, paddingRight:5}}>
                        <Entypo name="cross" size={24} color="black" />
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Image style={styles.picture} source={require('../assets/bouf.jpg')} />
                        <Text style={styles.text} >** TITLE RECIPES **</Text>
                        <View style={{backgroundColor:'#fbfafa', paddingBottom:63, paddingTop:63, paddingRight:5}}>
                        <Entypo name="cross" size={24} color="black" />
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Image style={styles.picture} source={require('../assets/bouf.jpg')} />
                        <Text style={styles.text} >** TITLE RECIPES **</Text>
                        <View style={{backgroundColor:'#fbfafa', paddingBottom:63, paddingTop:63, paddingRight:5}}>
                        <Entypo name="cross" size={24} color="black" />
                        </View>
                    </View>
                    
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    }, picture: {
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 0,
        width: 150,
        height: 150,
    }, text: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fbfafa',
        width: 180,
        height: 150,
        fontSize: 15,
        paddingTop:66,
        paddingLeft:15
    }
});
