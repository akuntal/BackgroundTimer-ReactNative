import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ImageBackground,
  Alert
} from 'react-native';
import Carousel from 'react-native-anchor-carousel'; 
import {Button} from './Button';
import {AppDrawer} from '../pages/appDrawer/AppDrawer';
import {NavigationContainer} from '@react-navigation/native';
import Images from './Images'

const { width } = Dimensions.get('window');

const data = [
  {
    title: 'Thank you, COVID Warrior!',
    content1: 'By installing COVIDTrace, you are one step ahead in ensuring the safety of your own self, family, community, state and the country.',
    content2: 'Together we can win the war against the corona pandemic. '
  },
  {
    title: 'COVIDTrace early detection works by checking where you have been recently against the time and place of people who reported positive. \n\n The app results are accompanied by instructions on how to self-protect and action you can take in case of exposure.',
    content1: 'Just,\n 1. Install the app \n 2. Turn on GPS location \n 3. Assess your risk, every 24 hours ',
    content2: ''
  },
  {
    title: 'With COVIDTrace, your data is never compromised and is only compared with the central database approved by the Govt of India.',
    content1: 'For best results, you are recommended to enable GPS location sharing always. You can change it anytime later.',
    content2: 'By clicking on the button below, you accept the Terms and Conditions and contribute to a safer India.'
  }
];



export default class ImageCarousel extends Component {

    signUp = async () => {
        this.props.navigation.navigate('Profile');
    };
  renderItem = ({ item, index }) => {
    const { uri, title, content1,content2 } = item;
    return (
        (index == 0)?
      <TouchableOpacity
        activeOpacity={1}
        style={styles.item}
        onPress={() => {
          this.numberCarousel.scrollToIndex(index);
        }}
      >
        {/* <ImageBackground
          source="{{ uri: uri }}"
          style={styles.imageBackground}
        >
          
        </ImageBackground> */}
        <View style={styles.mainContainer}>
          <View style={styles.rightTextContainer}>
              <Text style={styles.rightText}>{title}</Text>
            </View>
          <View style={styles.imageContainer}>
            <Image source={Images.image1} />
          </View>
          <View style={styles.lowerContainer}>
            <Text style={styles.titleText}>{content1}</Text>
          </View>
          <View style={styles.lowerContainer}>
            <Text style={styles.contentText}>{content2}</Text>
          </View>
        </View>
      </TouchableOpacity>
      :(index == 1)?
      <TouchableOpacity
        activeOpacity={1}
        style={styles.item}
        onPress={() => {
          this.numberCarousel.scrollToIndex(index);
        }}
      >
        {/* <ImageBackground
          source="{{ uri: uri }}"
          style={styles.imageBackground}
        >
          
        </ImageBackground> */}
        <View style={styles.mainContainer}>
          <View style={styles.rightTextContainer}>
              <Text style={styles.rightText}>{title}</Text>
            </View>
          <View style={styles.imageContainer}>
            <Image source={Images.image2} />
          </View>
          <View style={styles.lowerContainer}>
            <Text style={styles.contentText2}>{content1}</Text>
          </View>
          {content2 ? <View style={styles.lowerContainer}>
            <Text style={styles.contentText}>{content2}</Text>
          </View>: null}
        </View>
      </TouchableOpacity>
      :
      <TouchableOpacity
        activeOpacity={1}
        style={styles.item}
        onPress={() => {
          this.numberCarousel.scrollToIndex(index);
        }}
      >
        {/* <ImageBackground
          source="{{ uri: uri }}"
          style={styles.imageBackground}
        >
          
        </ImageBackground> */}
        <View style={styles.mainContainer}>
        <View style={styles.rightTextContainer}>
            <Text style={styles.rightText}>{title}</Text>
          </View>
        <View style={styles.imageContainer}>
          <Image source={Images.image3} style={{height:160,width:160}}/>
        </View>
        <View style={styles.lowerContainer3}>
          <Text style={styles.titleText}>{content1}</Text>
        </View>
        <View style={styles.lowerContainer3}>
          <Text style={styles.contentText}>{content2}</Text>
        </View>
        <View style={styles.agree}>
            <Button label="I Agree" handlerPress={this.signUp}/>
        </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <Carousel
        style={styles.carousel}
        data={data}
        renderItem={this.renderItem}
        itemWidth={0.99 * width}
        inActiveOpacity={0.3}
        containerWidth={width}
        pagingEnable={true}
        ref={(c) => {
          this.numberCarousel = c;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  agree:{
    margin:10,
    padding:5
  },
  mainContainer:{
    backgroundColor:"#f0f4f6",
    height:'100%'
  },
  carousel: {
    flex: 1,
    backgroundColor: '#f0f4f6'
  },
  item: {
    borderWidth: 5,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 2,
    borderColor: 'white',
    elevation: 1
  },
  imageBackground: {
    flex: 2,
    backgroundColor: '#ffffff',
    borderWidth: 5,
    borderColor: 'white'
  },
  imageContainer: {
    //marginLeft: 'auto',
    //marginRight: 4,
    backgroundColor: '#e8f0f3',
    padding: 10,
    margin:15,
    borderRadius: 100,
    borderColor:"#e0e0e0",
    //elevation: 1,
    borderWidth:0,
    justifyContent: 'center', 
    alignItems: 'center'
    
  },
  rightTextContainer: {
    //marginLeft: 'auto',
    //marginRight: 4,
    backgroundColor: '#ffffff',
    padding: 10,
    margin:10,
    //marginTop: 3,
    borderRadius: 30,
    borderColor:"#e8f0f3",
    elevation: 0,
    borderWidth:2
    
  },
  rightText: { color: '#282D31',textAlign:'center',fontSize: 18 },
  lowerContainer: {
    //flex: 1,
    backgroundColor: '#ffffff',
    padding: 40,
    margin:10,
    borderRadius: 20,
    borderColor:"#e8f0f3",
    borderWidth:2,
    elevation: 0,
  },
  lowerContainer3: {
    //flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    margin:10,
    borderRadius: 20,
    borderColor:"#e8f0f3",
    borderWidth:2,
    elevation: 0,
  },
  titleText: {
    fontSize: 16,
    textAlign:'center'
  },
  contentText: { 
    fontSize:16,
    textAlign:'center'
  },
  contentText2: { 
    fontSize:14,
    textAlign:'left'
  }
});


