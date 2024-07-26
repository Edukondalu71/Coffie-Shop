/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Alert,
  Button,
  StyleSheet,
} from 'react-native';


import { RAZORPAY_KEY } from '@env';
import RazorpayCheckout from 'react-native-razorpay';



function Payment() {
  const imgURL = 'https://m.media-amazon.com/images/I/61L5QgPvgqL._AC_UF1000,1000_QL80_.jpg';

  const onPressBuy = () => {
    //Order Api: Call POST api with body like (username, id, price etc) to create an Order and use order_id in below options object
    // const response = await .....

    let options: any = {
      description: 'Credits towards consultation',
      image: imgURL, //require('../../images.png')
      currency: 'INR', //In USD - only card option will exist rest(like wallet, UPI, EMI etc) will hide
      key: RAZORPAY_KEY,
      amount: '5000',
      name: 'Acme Corp',
      order_id: '', //Replace this with an order_id(response.data.orderId) created using Orders API.
      prefill: {
        email: 'hasan@example.com',
        contact: '9191919191',
        name: 'Hasan',
      }, //if prefill is not provided then on razorpay screen it has to be manually entered.
      theme: { color: '#3d8df5' },
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        Alert.alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        Alert.alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <Button title={"buy"} onPress={onPressBuy} />
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Payment;
