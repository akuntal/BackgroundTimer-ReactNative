import React, { useState,useEffect } from "react";
import { StyleSheet, Text,Button, View,StatusBar,SafeAreaView,ScrollView } from 'react-native';
import {Header, Colors} from 'react-native/Libraries/NewAppScreen';
import {useBackgroundGeolocation,getPersonStatus,clearCache,uploadData} from './useBackgroundGeolocation';
export default function Friends(){

    const [geolocations] = useBackgroundGeolocation();
    const [status] = getPersonStatus();
    useEffect(() => {

        }, [])

    return (
      <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>


                 <View style={styles.containerTop}>

                <View style={styles.container}>
                    <View style={styles.buttonContainer}>
                            <Button
                              onPress={() => {
                                clearCache();
                              }}
                              title="Clear Locations"
                              padding="5px"
                              backgroundColor='#cadcea'
                            />
                            <Button
                              onPress={() => {
                                uploadData();
                              }}
                              title="Upload"
                              padding="5px"
                            />
                     </View>
                    <View style={styles.body}>
                        <Text>Name - {status.name}</Text>
                        <Text>Gender - {status.gender}</Text>
                        <Text>Phone - {status.phone}</Text>
                        <Text>Email - {status.email}</Text>
                        <Text>Status - {status.status}</Text>
                     </View>
                    <View style={styles.body}>
                      <Text>Counter - {geolocations ? geolocations.length : 0}</Text>
                    </View>
                      <ScrollView
                                contentInsetAdjustmentBehavior="automatic"
                                style={styles.scrollView}>
                     <View style={styles.body}>
                        <Text>Positions - {JSON.stringify(geolocations)}</Text>
                     </View>

                      </ScrollView>

                </View>

             </View>
            </SafeAreaView>

          </>
    );
  }


const styles = StyleSheet.create({

  containerTop: {

        backgroundColor: '#ffffff',
    },

  container: {
      opacity:1,
      justifyContent: 'center',
      marginTop: 50,
      padding: 20,
      backgroundColor: '#ffffff',
  },

  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.blue,
    padding:20
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});