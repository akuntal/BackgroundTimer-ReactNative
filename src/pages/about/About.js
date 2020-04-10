import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Header} from '../../components/Header';
import Images from '../../components/Images';

export const About = () => (
  <>
    <Header title="About" />
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={Images.image3} style={{height: 160, width: 160}} />
      </View>
      <Text style={styles.txt}>CovidTrace</Text>
    </View>
  </>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    alignItems: 'center',
    height:'100%',
    width:'100%',
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    borderRadius:20,
    borderWidth:2,
    borderColor:'#fefefe',
    backgroundColor:"#ffffff"
  },
  txt: {
    fontSize:20,
  },
  imageContainer: {
    backgroundColor: '#e8f0f3',
    padding: 10,
    margin: 20,
    borderRadius: 100,
    borderColor: '#e0e0e0',
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
