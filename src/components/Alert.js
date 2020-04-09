import React, {Component} from 'react';

import {
  Platform,
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';

export class AlertComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {showAlert} = this.props;
    return (
      <Modal
        visible={showAlert}
        transparent={true}
        animationType={'fade'}
        onRequestClose={() => {
          this.props.onCancel();
        }}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.Alert_Main_View}>
            <Text style={styles.Alert_Title}>Attention!</Text>

            <Text style={styles.Alert_Message}>{this.props.message}</Text>
            <View
              style={{
                flexDirection: 'column',
                height: '20%',
                width: '100%',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={styles.buttonStyle_Yes}
                onPress={this.props.onOk}
                activeOpacity={0.7}>
                <Text style={styles.TextStyle}> YES </Text>
              </TouchableOpacity>
              <View
                style={{width: 1, height: '30%', backgroundColor: '#fff'}}
              />
              <TouchableOpacity
                style={styles.buttonStyle_No}
                onPress={this.props.onCancel}
                activeOpacity={0.7}>
                <Text style={styles.TextStyle}> NO </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  Alert_Main_View: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    height: 350,
    width: '90%',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    elevation: 5,
    borderRadius: 30,
    paddingTop: 20,
    paddingBottom: 60,
    paddingLeft: 40,
    paddingRight: 40,
  },
  Alert_Title: {
    fontSize: 25,
    fontFamily: 'Helvetica Neue, Medium',
    color: '#282D31',
    textAlign: 'center',
    padding: 10,
    height: '28%',
  },
  Alert_Message: {
    fontSize: 12,
    fontFamily: 'Helvetica Neue, Regular',
    color: '#4B5860',
    textAlign: 'center',
    padding: 0,
    margin: 20,
    height: '27%',
  },

  buttonStyle_Yes: {
    width: '70%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006BB6',
    borderRadius: 50,
  },

  TextStyle: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Helvetica Neue',
    marginTop: -5,
  },

  buttonStyle_No: {
    width: '70%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#99A2A8',
    borderRadius: 50,
  },
});
