import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PagerButtons({list, callBack}:any) {
    const [active, setActive] = useState(1);
    return (
        <View style={styles.container}>
            {/* <Text style={{ marginBottom: 20 }}>{active}</Text> */}
            <Button
                buttons={[...list]}
                onClick={setActive}
                callBack={callBack}
            />
        </View>
    );
}

function Button({ buttons, onClick, callBack }:any) {
    const [btnContainerWidth, setWidth] = useState(0);
    const btnWidth = btnContainerWidth / buttons.length;
    const translateX = useRef(new Animated.Value(0)).current;
    const translateXOpposit = translateX.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
    });
    const onPress = i => {
        callBack(i);
        onClick(i + 1);
        Animated.spring(translateX, {
            toValue: i * btnWidth,
            useNativeDriver: true,
            bounciness: 0,
        }).start();
    };
    return (
        <View
            style={styles.btnContainer}
            onLayout={e => setWidth(e.nativeEvent.layout.width)}>
            {buttons.map((btn, i) => (
                <TouchableOpacity
                    key={btn}
                    style={styles.btn}
                    onPress={() => onPress(i)}>
                    <Text style={[styles.btnTextActive, {color:'#FFFFFF'}]}>{btn}</Text>
                </TouchableOpacity>
            ))}
            <Animated.View
                style={[
                    styles.animatedBtnContainer,
                    { width: btnWidth, transform: [{ translateX }] },
                ]}>
                {buttons.map(btn => (
                    <Animated.View
                        key={btn}
                        style={[
                            styles.animatedBtn,
                            { width: btnWidth, transform: [{ translateX: translateXOpposit }] },
                        ]}>
                        <Text style={styles.btnTextActive}>{btn}</Text>
                    </Animated.View>
                ))}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        marginBottom:15
    },
    btnContainer: {
        height: 40,
        borderRadius: 5,
        overflow: 'hidden',
        flexDirection: 'row',
        backgroundColor: '#ECB176',
        width: '100%'
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    animatedBtnContainer: {
        height: 40,
        flexDirection: 'row',
        position: 'absolute',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
    },
    animatedBtn: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        color:"#FFFFFF"
    },
    btnTextActive: {
        color: '#000000',
        fontWeight: 'bold',
    },
});