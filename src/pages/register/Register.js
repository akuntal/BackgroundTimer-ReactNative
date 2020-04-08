import React from 'react';
import {
  View,
  Text,
  TextInput,
  Picker,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
  Button,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {getIncrementalArray, saveUserDetails} from '../../utils';

const YEARS = getIncrementalArray(1950, 2020);

export class Register extends React.Component {
  state = {
    user: {yob: 1990, gender: 'M', phone: ''},
    btnDisabled: false,
    terms: true,
  };

  validateForm() {
    const all_fields_filled = !Object.values(this.state.user).some(
      (val) => !val,
    );
    if (all_fields_filled && this.state.user.phone.length === 10) {
      return true;
    }
    return false;
  }

  signUp = async () => {
    const isFormValid = this.validateForm();
    if (isFormValid) {
      this.setState({btnDisabled: true});
      await saveUserDetails(this.state.user);
      this.props.navigation.navigate('Home');
    } else {
      Alert.alert('Invalid', 'Invalid mobile number');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <>
          <Text style={styles.txt}>Year of Birth*</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={this.state.user.yob}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({user: {...this.state.user, yob: itemValue}})
              }>
              {YEARS.map((year) => (
                <Picker.Item
                  key={`key-${year}`}
                  label={year.toString()}
                  value={year}
                />
              ))}
            </Picker>
          </View>
        </>

        <>
          <Text style={styles.txt}>Gender*</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={this.state.gender}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({user: {...this.state.user, gender: itemValue}})
              }>
              <Picker.Item label="Male" value="M" />
              <Picker.Item label="Female" value="F" />
            </Picker>
          </View>
        </>

        <>
          <Text style={styles.txt}>Mobile*</Text>
          <TextInput
            style={styles.input}
            value={this.state.phone}
            keyboardType="number-pad"
            autoCompleteType="tel"
            onChangeText={(val) =>
              this.setState({user: {...this.state.user, phone: val}})
            }
          />
        </>

        <View style={styles.containerCheckbox}>
          <CheckBox
            style={styles.checkbox}
            value={this.state.terms}
            disabled
            onValueChange={() => this.setState({terms: true})}
          />
          <Text>
            Please confirm that you are fine with sharing your location with us.
          </Text>
        </View>

        <View style={styles.done}>
          <Button
            title="Done"
            onPress={this.signUp}
            disabled={this.state.btnDisabled}
          />
        </View>

        <View>
          <Image
            source={require('../../../assets/Image4.png')}
            style={styles.logo}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  done: {
    width: Dimensions.get('window').width - 60,
    marginTop: 40,
    borderRadius: 50,
  },
  picker: {
    width: Dimensions.get('window').width - 60,
    height: 50,
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 0,
    color: 'black',
    borderRadius: 2,
    fontSize: 15,
    fontWeight: '500',
    borderBottomWidth: 1.5,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: '#B2BABF',
  },
  containerCheckbox: {
    width: Dimensions.get('window').width - 60,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
    paddingLeft: 10,
  },
  checkbox: {
    alignSelf: 'center',
  },
  txt: {
    width: 350,
    fontSize: 12,
    paddingTop: 10,
  },
  registerTxt: {
    color: 'white',
    fontSize: 25,
    paddingTop: 20,
    paddingLeft: 30,
    textAlign: 'left',
  },

  bottomTxt: {
    color: '#006BB6',
    fontSize: 25,
    paddingTop: 20,
    paddingLeft: 30,
    textAlign: 'center',
  },
  buttonTxt: {
    color: 'white',
    fontSize: 16,
    paddingTop: 14,
    textAlign: 'center',
  },
  input: {
    width: Dimensions.get('window').width - 60,
    height: 50,
    backgroundColor: '#ffffff',
    margin: 10,
    color: 'black',
    borderRadius: 2,
    fontSize: 15,
    fontWeight: '500',
    borderBottomWidth: 1.5,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: '#B2BABF',
  },
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    height: '100%',
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  logo: {
    width: 98,
    height: 15,
    marginTop: 80,
  },
});
