import React from 'react'
import { Alert, Image, Linking, Pressable } from 'react-native'

const Linkdin = () => {
    const openLinkedInProfile = () => {
        // Replace with the actual LinkedIn profile URL or page URL
        const profileUrl = 'https://www.linkedin.com/in/edukondalu71';
      
        Linking.openURL(profileUrl)
          .catch(err => {
            console.error('An error occurred', err);
            Alert.alert('Error', 'Could not open LinkedIn profile.');
          });
      };
  return (
    <Pressable onPress={openLinkedInProfile}>
        <Image style={{ height: 30, width: 30, marginRight: 10 }} source={require('../../Images/linkedin.png')} />
    </Pressable>
  )
}

export default Linkdin