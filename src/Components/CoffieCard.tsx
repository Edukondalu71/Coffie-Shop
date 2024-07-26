import React, { useState } from 'react'
import { Alert, Image, ImageBackground, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import OrderForm from '../Pages/OrderForm';

const CoffieCard = ({ data }: any) => {
    const { height, width } = useWindowDimensions();
    const [modalVisible, setModalVisible] = useState(false);
    const price = Math.floor(data?.description.length);

    const orderPlaced = (data:any) => {
        setModalVisible(!modalVisible);
        Alert.alert('order placed !', `your orderid ${data.razorpay_payment_id}`, [
            {
            //   text: 'Cancel',
            //   onPress: () => null,
            //   style: 'cancel',
            },
            {text: 'ok', onPress: () => null},
          ]);
    }

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}>
                <OrderForm orderPlaced={orderPlaced} close={() => setModalVisible(!modalVisible)}props={{...data, price}} />
            </Modal>

            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ImageBackground source={{ uri: data.image }} style={[styles.card, { height: height * 0.85, width: width }]}>
                    <View style={{ display: 'flex', width: 350, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.title}>{data.title}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{ backgroundColor: '#1c76eb', minWidth: 100, height: 35, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#FFFFFF', marginHorizontal: 5 }}> ₹ {Math.floor(data?.description.length)}.00</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.desc}>{data.description}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', marginHorizontal: 20, flexWrap: 'wrap' }}>
                        {data.ingredients.map((el: any) => <Text key={el} style={[styles.desc, { backgroundColor: '#ECB176', padding: 5, marginRight: 5, borderRadius: 60 }]}>{el}</Text>)}
                    </View>

                </ImageBackground >
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },
    title: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 2,
        marginHorizontal: 20,
    },
    desc: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
        marginVertical: 5,
        paddingHorizontal: 20
    }
})

export default CoffieCard