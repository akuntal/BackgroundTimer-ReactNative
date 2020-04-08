import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const Location = ({time, location}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.location}>{location}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#ddd',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 5,
  },
  time: {
    fontWeight: 'bold',
  },
  location: {},
});
