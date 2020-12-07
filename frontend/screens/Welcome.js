console.disableYellowBox = true;
import React, { useState } from 'react';
import { StyleSheet, View, Image, ImageBackground, TouchableOpacity, AsyncStorage } from 'react-native';
import { Text, Button, Overlay } from 'react-native-elements';

export default function welcome({navigation}) {

    const [visible, setVisible] = useState(false);
    const [glutenFree, setGlutenFree] = useState(false);
    const [vegetarian, setVegetarian] = useState(false);
    const [lactoseFree, setLactoseFree] = useState(false);
    const [vegan, setVegan] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    // LOCAL STORAGE ================>
    function favoriteAlim(diet) {
        AsyncStorage.getItem(diet, function (error, data) {
            console.log(data);
            if (data === null || data === 'false') {
                console.log('test IF', data);
                AsyncStorage.setItem(diet, 'true')
            } else {
                console.log('test ELSE', data);
                AsyncStorage.setItem(diet, 'false')
            }
        })
    };

    // COULEUR APRES SELECTION  ================>
    var gluten = { width: 100, height: 100 };
    var vegeta = { width: 100, height: 100 };
    var lactose = { width: 100, height: 100 };
    var vega = { width: 100, height: 100 };

    if (glutenFree) {
        gluten = { backgroundColor: '#ADE498', width: 100, height: 100, borderRadius: 400, borderColor: 'black' }
    };
    if (vegetarian) {
        vegeta = { backgroundColor: '#ADE498', width: 100, height: 100, borderRadius: 400, borderColor: 'black' }
    };
    if (lactoseFree) {
        lactose = { backgroundColor: '#ADE498', width: 100, height: 100, borderRadius: 400, borderColor: 'black' }
    };
    if (vegan) {
        vega = { backgroundColor: '#ADE498', width: 100, height: 100, borderRadius: 400, borderColor: 'black' }
    };

    return (
        <ImageBackground source={require('../assets/Background.jpeg')} style={{ flex: 1 }}>
            <View style={styles.container}>
                <Image style={{ width: 300, height: 300 }} source={require('../assets/logo.png')} />
                <Text h1 style={{ marginTop: 120, color: '#FFFF', fontFamily: 'Kohinoor Telugu' }}>Welcome ! </Text>
                <Button
                    title="Next"
                    type="outline"
                    buttonStyle={{ borderColor: 'white', marginTop: 200, padding: 5 }}
                    titleStyle={{ color: 'white', fontFamily: 'Kohinoor Telugu', fontSize: 20 }}
                    onPress={toggleOverlay}
                />
                <Overlay overlayStyle={{ backgroundColor: '#dfe6e9', borderRadius: 50, }} isVisible={visible} onBackdropPress={toggleOverlay} >
                    <Button
                        title="skip"
                        onPress={() => navigation.navigate('CreateGroup')}
                        type="clear"
                        buttonStyle={{ borderColor: '#dfe6e9', justifyContent: 'flex-end' }}
                        titleStyle={{ color: 'black', fontFamily: 'Kohinoor Telugu', fontSize: 11, paddingBottom: 20, paddingRight: 17 }}
                    />
                    <View style={styles.overlay}>
                        <Text style={{ fontFamily: 'Kohinoor Telugu', fontSize: 18 }}>Let me learn more about you...{"\n"}{"\n"}</Text>
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
                            <TouchableOpacity style={styles.picto} activeOpacity={0.3} onPress={() => {favoriteAlim('Lactose free');setLactoseFree(!lactoseFree)}}>
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
                            onPress={() => {navigation.navigate('CreateGroup');setVisible(false)}}
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

