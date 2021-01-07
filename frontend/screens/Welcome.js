console.disableYellowBox = true;
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ImageBackground, TouchableOpacity, AsyncStorage } from 'react-native';
import { Text, Button, Overlay } from 'react-native-elements';

import { connect } from 'react-redux';

//Welcome page of the app, asks for dietery preferences only the firs time the user opens the app
function Welcome({ navigation, savePreferences, delPreferences }) {

    const [visible, setVisible] = useState(false);
    const [glutenFree, setGlutenFree] = useState(false);
    const [vegetarian, setVegetarian] = useState(false);
    const [lactoseFree, setLactoseFree] = useState(false);
    const [vegan, setVegan] = useState(false);
    const [prefStored, setPrefStored] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    // get preferences from local storage and send to redux store

    useEffect(()=>{
        const goToHome = async()=>{
        var preferences = ['gluten free','vegetarian','lactose free','vegan','no pref'];
        for (let i = 0; i<preferences.length; i++){
            await AsyncStorage.getItem(preferences[i], 
            function(error, data){
            if(data){
                if(!prefStored){
                    setPrefStored(true);
                }
                if(data === 'true'){
                    savePreferences(preferences[i])
                }else{
                    delPreferences(preferences[i])
                }
            }else{
                delPreferences(preferences[i])
            }
            })
        };
    }
    goToHome();
    },[])
    
//if preferences in local storage go to home page else ask for preferences

    if(!prefStored){
        var next = <Button 
        title="Next"
        type="outline"
        buttonStyle={{ borderColor: 'white', marginTop: 200, padding: 5 }}
        titleStyle={{ color: 'white', fontFamily: 'Kohinoor Telugu', fontSize: 20 }}
        onPress={toggleOverlay}
    />
    }else{
        var next = <Button 
        title="Next"
        type="outline"
        buttonStyle={{ borderColor: 'white', marginTop: 200, padding: 5 }}
        titleStyle={{ color: 'white', fontFamily: 'Kohinoor Telugu', fontSize: 20 }}
        onPress={() => {navigation.navigate('Home')}}
        />
    }

    // save preferences in LOCAL STORAGE and redux store ================>
    function favoriteAlim(diet) {
        AsyncStorage.getItem(diet, function (error, data) {
            if (data === null || data === 'false') {
                AsyncStorage.setItem(diet, 'true');
                savePreferences(diet);
            } else {
                AsyncStorage.setItem(diet, 'false');
                delPreferences(diet);
            }
        })
    };

    function NoPref(){
        if(!glutenFree && !vegetarian && !lactoseFree && !vegan){
            AsyncStorage.setItem('no pref', 'true')
        }
    }

    // change color on select  ================>
    var greyBackground = { backgroundColor: '#FFFFFF', borderRadius: 400, width: 100, height: 100 };
    var selectedBackground = { backgroundColor: '#ADE498', width: 100, height: 100, borderRadius: 400, borderColor: 'black' };
    
    var gluten = greyBackground;
    var vegeta = greyBackground;
    var lactose = greyBackground;
    var vega = greyBackground;
    
    if (glutenFree) {
        gluten = selectedBackground;
    };
    if (vegetarian) {
        vegeta = selectedBackground;
    };
    if (lactoseFree) {
        lactose = selectedBackground;
    };
    if (vegan) {
        vega = selectedBackground;
    };
 

return (
    <ImageBackground source={require('../assets/Background.jpeg')} style={{ flex: 1 }}>
        <View style={styles.container}>
            <Image style={{ width: 300, height: 300 }} source={require('../assets/logo.png')} />
            <Text h1 style={{ marginTop: 120, color: '#FFFF', fontFamily: 'Kohinoor Telugu' }}>Welcome ! </Text>
            {next}
            <Overlay overlayStyle={{ backgroundColor: '#dfe6e9', borderRadius: 50, }} isVisible={visible} onBackdropPress={toggleOverlay} >
                <View style={styles.overlay}>
                    <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 18 }}>Hello,{"\n"}let me learn more about you...{"\n"}{"\n"}</Text>
                    <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingBottom: 30 }}>First, select your preferences : </Text>
                    <View style={styles.prefalim}>
                        <TouchableOpacity style={styles.picto} activeOpacity={0.3} onPress={() => { favoriteAlim('gluten free'); setGlutenFree(!glutenFree) }}>
                            <Image
                                style={gluten}
                                source={require('../assets/noGluten.png')}
                            />
                            <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 11 }}>Gluten free</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.picto} activeOpacity={0.3} onPress={() =>{ favoriteAlim('vegetarian');setVegetarian(!vegetarian)}}>
                            <Image style={vegeta}
                                source={require('../assets/noMeat.png')}
                            />
                            <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 11 }}>Vegetarian</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.prefalim}>
                        <TouchableOpacity style={styles.picto} activeOpacity={0.3} onPress={() => {favoriteAlim('lactose free');setLactoseFree(!lactoseFree)}}>
                            <Image style={lactose}
                                source={require('../assets/noMilk.png')}
                            />
                            <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 11 }}>Lactiose free</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.picto} activeOpacity={0.3} onPress={() =>{ favoriteAlim('vegan');
                        setVegan(!vegan)}}>
                            <Image style={vega}
                                source={require('../assets/vegetalien.png')}
                            />
                            <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 11 }}>Vegan</Text>
                        </TouchableOpacity>
                    </View>
                    <Button
                        title="Next"
                        onPress={() => {NoPref(); navigation.navigate('homePage'); setVisible(false)}}
                        type="clear"
                        buttonStyle={{ borderColor: 'white', justifyContent: 'flex-end' }}
                        titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu', fontSize: 18, paddingTop: 30 }}

                        />
                    </View>
                </Overlay>
            </View>
        </ImageBackground>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        savePreferences: function (info) {
            dispatch({ type: 'addpref', pref: info })
        },
        delPreferences: function (info) {
            dispatch({ type: 'delpref', pref: info })
        },
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Welcome);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    }, overlay: {
        width: 290,
        margin: 18,
        justifyContent: 'center',
    }, prefalim: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    }, picto: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
    }, taille: {
    }
});
