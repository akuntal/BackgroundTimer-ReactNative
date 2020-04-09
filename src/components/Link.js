import React from 'react';
import {Text, StyleSheet, Linking} from 'react-native';

export const Link = (props) => (
  <Text style={styles.link} onPress={() => Linking.openURL(props.url)}>
    {props.text}
  </Text>
);

const styles = StyleSheet.create({
  link: {
    color: '#006BB6',
    fontSize: 12,
    fontFamily: 'Helvetica Neue',
  },
});
