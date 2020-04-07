import React from 'react';
import {
  View,
  Text,
  TextInput,
  Picker,
  Image,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {getIncrementalArray, saveUserDetails} from '../../utils';

const YEARS = getIncrementalArray(1950, 2020);

export class Register extends React.Component {
  state = {
    yob: 1990,
    gender: 'M',
    phone: '',
  };

  validateForm() {
    const all_fields_filled = !Object.values(this.state).some((val) => !val);
    if (all_fields_filled && this.state.phone.length === 10) {
      return true;
    }
    return false;
  }

  signUp = async () => {
    const isFormValid = this.validateForm();
    if (isFormValid) {
      await saveUserDetails(this.state);
      this.props.navigation.navigate('Home');
    } else {
      Alert.alert('Invalid mobile number');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <>
          <Text style={styles.txt}>Year of Birth*</Text>
          <Picker
            selectedValue={this.state.yob}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({yob: itemValue})
            }>
            {YEARS.map((year) => (
              <Picker.Item
                key={`key-${year}`}
                label={year.toString()}
                value={year}
              />
            ))}
          </Picker>
        </>

        <>
          <Text style={styles.txt}>Gender*</Text>
          <Picker
            selectedValue={this.state.gender}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({gender: itemValue})
            }>
            <Picker.Item label="Male" value="M" />
            <Picker.Item label="Female" value="F" />
          </Picker>
        </>

        <>
          <Text style={styles.txt}>Mobile*</Text>
          <TextInput
            style={styles.input}
            value={this.state.phone}
            keyboardType="number-pad"
            autoCompleteType="tel"
            onChangeText={(val) => this.setState({phone: val})}
          />
        </>

        <View style={styles.containerCheckbox}>
          <CheckBox style={styles.checkbox} value={true} disabled />
          <Text>
            Please confirm that you are fine with sharing your location with us.
          </Text>
        </View>

        <TouchableOpacity style={styles.done} onPress={this.signUp}>
          <Text style={styles.buttonTxt}>Done</Text>
        </TouchableOpacity>

        <View style={styles.container}>
          <Image
            source={require('../../../assets/Image4.png')}
            style={{width: 98, height: 15, marginTop: 100}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  done: {
    width: '85%',
    marginTop: 60,
    height: 50,
    backgroundColor: '#006BB6',
    borderRadius: 50,
  },
  picker: {
    height: 50,
    width: 150,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  containerCheckbox: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
    paddingLeft: 25,
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
    fontSize: 25,
    paddingTop: 7,
    textAlign: 'center',
  },
  input: {
    width: 350,
    height: 40,
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
  },
});
