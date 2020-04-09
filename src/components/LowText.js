import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Link} from './Link';

export const LowText = () => (
  <>
    <Text style={styles.intersectionText}>
      Your risk of infection is low. We recommend that you stay home to avoid
      chances of exposure. Follow these &nbsp;
      <Link
        text="Dos and Donts"
        url="https://www.mohfw.gov.in/pdf/Poster_Corona_ad_Eng.pdf"
      />
    </Text>
    <Text style={styles.intersectionText}>
      Retake the self-assessment test after 24 hours.
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
