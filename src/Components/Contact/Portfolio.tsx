import React from 'react'
import { Alert, Image, Linking, Pressable } from 'react-native'

const Portfolio = () => {
    const openPortfolioProfile = () => {
        // Replace with the actual LinkedIn profile URL or page URL
        const profileUrl = 'https://edukondalu.vercel.app/';
      
        Linking.openURL(profileUrl)
          .catch(err => {
            console.error('An error occurred', err);
            Alert.alert('Error', 'Could not open Portfolio profile.');
          });
      };
  return (
    <Pressable onPress={openPortfolioProfile}>
        <Image style={{ height: 30, width: 30, marginRight: 10 }} source={require('../../Images/portfolio.png')} />
    </Pressable>
  )
}

export default Portfolio