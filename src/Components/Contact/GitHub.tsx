import React from 'react'
import { Alert, Image, Linking, Pressable } from 'react-native'

const GitHub = () => {
    const openGitHubProfile = () => {
        // Replace with the actual LinkedIn profile URL or page URL
        const profileUrl = 'https://www.github.com/Edukondalu71';
      
        Linking.openURL(profileUrl)
          .catch(err => {
            console.error('An error occurred', err);
            Alert.alert('Error', 'Could not open GitHub profile.');
          });
      };
  return (
    <Pressable onPress={openGitHubProfile}>
        <Image style={{ height: 30, width: 30, marginRight: 10 }} source={require('../../Images/github.gif')} />
    </Pressable>
  )
}

export default GitHub