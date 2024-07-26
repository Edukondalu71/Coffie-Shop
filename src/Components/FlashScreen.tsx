import React from 'react'
import { Image, Text, View } from 'react-native'

const FlashScreen = () => {
    return (
        <View style={{ display: 'flex', height: '70%', justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ height: 60, width: 65 }} source={require('../Images/coffee-lover-hot-coffee.gif')} />
            <Text style={{ marginTop: 10, color: '#000000', fontWeight: '600' }}>Loading...</Text>
        </View>
    )
}

export default FlashScreen