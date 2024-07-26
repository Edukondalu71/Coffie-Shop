import React from 'react'
import { Alert, Image, Linking, Pressable } from 'react-native'

const Gmail = () => {
    const openGmail = () => {
        // Define the email details
        const to = 'd.edukondalu3379@gmail.com';
        const subject = 'Subject Here';
        const body = 'Body of the email';

        // Construct the mailto URL
        const url = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Open the email client
        Linking.openURL(url)
            .catch(err => {
                console.error('An error occurred', err);
                Alert.alert('Error', 'Could not open email client.');
            });
    };

    return (
        <Pressable onPress={openGmail}>
            <Image style={{ height: 30, width: 30, marginRight: 10 }} source={require('../../Images/gmail.png')} />
        </Pressable>

    )
}

export default Gmail