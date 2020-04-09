import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Link} from './Link';

export const MidText = () => (
  <>
    <Text style={styles.intersectionText}>
      While your risk of infection is medium, remember that currently it is
      safer to consult a doctor thru phone or video than to visit the hospital.
    </Text>
    <Text style={[styles.intersectionText, [{marginTop: 10}]]}>
      We recommend that you stay home to avoid chances of exposure. Follow these
      &nbsp;
      <Link
        text="Dos and Donts"
        url="https://www.mohfw.gov.in/pdf/Poster_Corona_ad_Eng.pdf"
      />
    </Text>
  </>
);

const styles = StyleSheet.create({
  intersectionText: {
    color: '#4B5860',
    fontSize: 12,
    fontFamily: 'Helvetica Neue',
  },
});
