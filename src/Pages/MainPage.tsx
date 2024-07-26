/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import CoffieCard from '../Components/CoffieCard';
import FlashScreen from '../Components/FlashScreen';
import PagerButtons from '../Components/SelectionsButtons';
import OrderForm from './OrderForm';


function MainPage(): React.JSX.Element {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);
  let list = ['iced', 'hot'];
  const [activeButton, setActiveButton] = useState(list[0]);


  const getData = async () => {
    try {
      setError(null)
      const resp = await fetch(`https://api.sampleapis.com/coffee/${activeButton}`);
      const json = await resp.json();
      setData(json);
      setLoader(false);
    } catch (err: any) {
      setError(err.message);
      setLoader(false);
    }
  }

  useEffect(() => {
    setLoader(true);
    getData();
  }, [activeButton]);

  return (
    <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: Colors.lighter }}>
      <StatusBar backgroundColor={'#ECB176'} />
      <View style={styles.headerContainer}>
        <Image style={{ height: 50, width: 50 }} source={require('../Images/tea.png')} />
        <Text style={styles.headerContainerText}>Welcome to Coffie Shop !</Text>
        {/* <Pressable onPress={() => setModalVisible(!modalVisible)}>
          <Image style={{ height: 35, width: 30 }} source={require('../Images/icons8-coffee-to-go-80.png')} />
        </Pressable> */}
        <Text></Text>
      </View>
      <View style={styles.selectionCard}>
        <PagerButtons list={['Cold Coffie', 'Hot Coffie']} callBack={(i: number) => setActiveButton(list[i])} />
      </View>
      {loader ? <FlashScreen /> : error ? <Text>{error}</Text> :
        <ScrollView>
          {data.map((el: any) => <CoffieCard data={el} key={el.id} />)}
        </ScrollView>
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    maxHeight: 60,
    backgroundColor: '#ECB176',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  headerContainerText: {
    color: '#000000',
    fontWeight: '800'
  },
  selectionCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ECB176'
  },
  button: {
    color: '#ECB176'
  }
});

export default MainPage;