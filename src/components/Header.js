import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const Header = (props) => {
  const navigation = useNavigation();

  const handlerHamburger = () => {
    navigation.openDrawer();
    if (props.handlerHamburger) {
      props.handlerHamburger();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.hamburgContainer}>
        {!props.hideHamburger && (
          <TouchableOpacity onPress={handlerHamburger}>
            <Image
              source={require('../../assets/icons8-menu-52.png')}
              style={styles.hamburgIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      {props.showLogo && (
        <View style={styles.hclLogoContainer}>
          <Image source={require('../../assets/HCL-White-Logo.png')} />
        </View>
      )}
      {!props.showLogo && <Text style={styles.heading}>{props.title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#006BB6',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
  },
  hamburgContainer: {
    width: 60,
  },
  hamburgIcon: {
    height: 32,
    width: 32,
    marginTop: 9,
    marginLeft: 12,
    marginRight: 12,
  },
  hclLogoContainer: {
    marginTop: 20,
  },
  heading: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    paddingTop: 12,
  },
});
