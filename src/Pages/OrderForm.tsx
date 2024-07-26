// MyForm.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, Image, Pressable, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Payment from './PaymentPage';
import RazorpayCheckout from 'react-native-razorpay';
import { RAZORPAY_KEY } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the validation schema using yup
const schema = yup.object().shape({
    name: yup.string().matches(/^[A-Za-z\s]{2,}$/, 'Please enter a valid name (only letters and spaces, at least 2 characters).').required('Name is required'),
    email: yup.string().email('Please enter a valid email address.').required('Email is required'),
    phone: yup.string().matches(/^[0-9]{10}$/, 'Please enter a 10-digit phone number.').required('Phone number is required'),
});

// Define the form data type
interface FormData {
    name: string | any;
    email: string | any;
    phone: string | any;
}

const OrderForm = ({ orderPlaced, close, props }: any) => {

    const initialValues: FormData = {
        name: '',
        email: '',
        phone: ''
    };

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
    });

    const [error, setError] = useState<any>(null);

    // Handle form submission
    const onSubmit = async (data: FormData) => {
        setError(null);
        await AsyncStorage.setItem("name", data?.name);
        await AsyncStorage.setItem("email", data?.email);
        await AsyncStorage.setItem("phone", data?.phone);
        let options: any = {
            description: 'Credits towards consultation',
            image: props?.image, //require('../../images.png')
            currency: 'INR', //In USD - only card option will exist rest(like wallet, UPI, EMI etc) will hide
            key: RAZORPAY_KEY,
            amount: props?.price * 100,
            name: props?.title,
            order_id: '', //Replace this with an order_id(response.data.orderId) created using Orders API.
            prefill: {
                email: data.email,
                contact: data.phone,
                name: data.name,
            }, //if prefill is not provided then on razorpay screen it has to be manually entered.
            theme: { color: '#ECB176' },
        };
        RazorpayCheckout.open(options)
            .then(data => orderPlaced(data))
            .catch(error => {
                // handle failure
                setError('Failed try again !');
            });
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <Pressable onPress={close} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Image style={{ height: 20, width: 20 }} source={require('../Images/close.png')} />
                </Pressable>

                <Text style={styles.label}>Name</Text>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, errors.name ? styles.errorInput : null]}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Enter your name"
                        />
                    )}
                />
                {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

                <Text style={styles.label}>Email</Text>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, errors.email ? styles.errorInput : null]}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                        />
                    )}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

                <Text style={styles.label}>Phone Number</Text>
                <Controller
                    control={control}
                    name="phone"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, errors.phone ? styles.errorInput : null]}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Enter your phone number"
                            keyboardType="phone-pad"
                        />
                    )}
                />
                {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}
                <Text style={styles.label}>Amount INR</Text>
                <TextInput
                    style={[styles.input, { color: '#000000' }]}
                    readOnly
                    value={` ₹ ${props?.price}.00`}
                />
                <Button title="Place order" onPress={handleSubmit(onSubmit)} />
                {error &&
                    <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'red', fontSize: 15, fontWeight: '600' }}>{error}</Text>
                    </View>}
                {/* <Payment /> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    container: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        width: Dimensions.get('screen').width * 0.95,
        borderRadius: 5
    },
    label: {
        fontSize: 15,
        marginBottom: 5,
        color: '#000000'
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
        marginBottom: 10,
        fontSize: 15,
        color: '#000000'
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});
export default OrderForm