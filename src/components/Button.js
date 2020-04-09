import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export const Button = (props) => {
  return (
    <TouchableOpacity
      style={[
        styles.wrapper,
        [
          {
            backgroundColor: props.disabled ? '#4B5860' : '#006BB6',
            opacity: props.disabled ? 0.5 : 1,
          },
        ],
      ]}
      onPress={props.handlerPress}
      disabled={props.disabled}>
      <Text style={styles.buttonTxt}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 35,
    backgroundColor: '#006BB6',
    borderRadius: 50,
  },
  buttonTxt: {
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    color: '#FFFFFF',
    alignSelf: 'center',
    paddingTop: 8,
  },
});
