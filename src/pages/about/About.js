import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Header} from '../../components/Header';

export const About = () => (
  <>
    <Header title="About" />
    <View style={styles.container}>
      <Text>OmniTrace</Text>
    </View>
  </>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    alignItems: 'center',
  },
});
