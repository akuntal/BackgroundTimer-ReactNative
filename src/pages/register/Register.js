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
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {getIncrementalArray, getUserDetails} from '../../utils';
import {Header} from '../../components/Header';
import {Button} from '../../components/Button';
import {connect} from 'react-redux';
import {registerUser} from '../../redux/actions';
import ImageCarousel from '../../components/ImageCarousel';

const YEARS = getIncrementalArray(1950, 2020);

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {...props.user},
      btnDisabled: false,
      terms: true,
      showCarousel: true,
    };
  }

  handlerScreenFocus = async () => {
    const user = await getUserDetails();
    if (user) {
      this.setState({
        user: JSON.parse(user),
        headerLabel: 'Profile',
        hideHamburger: false,
      });
    }
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
      this.props.registerUser({
        user: {...this.state.user},
        isUserRegistered: true,
      });
      this.props.navigation.navigate('Home');
    } else {
      Alert.alert('Invalid', 'Invalid mobile number');
    }
  };

  render() {
    const {isUserRegistered} = this.props;
    const headerLabel = isUserRegistered ? 'Profile' : 'Registration';
    const hideHamburger = !isUserRegistered;

    const btnDisabled =
      isUserRegistered ||
      !this.state.terms ||
      this.state.user.phone.length !== 10;

    if (this.state.showCarousel && !isUserRegistered) {
      return (
        <ImageCarousel onAgree={() => this.setState({showCarousel: false})} />
      );
    }
    return (
      <>
        <Header title={headerLabel} hideHamburger={hideHamburger} />
        <View style={styles.container}>
          <>
            <Text style={styles.txt}>Year of Birth*</Text>
            <View style={styles.pickerContainer}>
              <Picker
                enabled={!isUserRegistered}
                style={styles.picker}
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
            <View style={styles.pickerContainer}>
              <Picker
                enabled={!isUserRegistered}
                style={styles.picker}
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
            <Text style={styles.txt}>Mobile Number*</Text>
            <View style={styles.mobileContainer}>
              <Image
                source={require('../../../assets/flag.png')}
                style={styles.flag}
              />
              <Text style={styles.countryCodeText}>+91</Text>
              <TextInput
                editable={!isUserRegistered}
                maxLength={10}
                style={styles.input}
                value={this.state.user.phone}
                keyboardType="number-pad"
                autoCompleteType="tel"
                onChangeText={(val) => {
                  this.setState({user: {...this.state.user, phone: val}});
                }}
              />
            </View>
          </>

          <View style={styles.containerCheckbox}>
            <CheckBox
              disabled={isUserRegistered}
              style={styles.checkbox}
              value={this.state.terms}
              onValueChange={() => this.setState({terms: !this.state.terms})}
            />
            <Text style={styles.txt}>
              I agree to share my data to assess risk of exposure.
            </Text>
          </View>

          <View style={styles.done}>
            <Button
              handlerPress={this.signUp}
              label="Register"
              disabled={!!btnDisabled}
            />
          </View>

          <View>
            <Image
              source={require('../../../assets/Image4.png')}
              style={styles.logo}
            />
          </View>
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.appState.user,
  isUserRegistered: state.appState.isUserRegistered,
});

const mapDispatchToProps = (dispatch) => ({
  registerUser: (user) => dispatch(registerUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
  done: {
    width: Dimensions.get('window').width - 260,
    marginTop: 40,
    borderRadius: 50,
  },
  pickerContainer: {
    width: Dimensions.get('window').width - 60,
    height: 50,
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 0,

    borderRadius: 2,
    fontSize: 15,
    fontWeight: '500',
    borderBottomWidth: 1.5,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: '#B2BABF',
  },
  picker: {
    color: '#4B5860',
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
    fontSize: 12,
    paddingTop: 5,
    color: '#4B5860',
    fontFamily: 'Helvetica Neue, Medium',
    width: Dimensions.get('window').width - 60,
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
  mobileContainer: {
    width: Dimensions.get('window').width - 60,
    display: 'flex',
    flexDirection: 'row',
  },
  flag: {
    marginTop: 14,
    width: 60,
  },
  input: {
    width: Dimensions.get('window').width - 165,
    height: 50,
    backgroundColor: '#ffffff',
    margin: 10,
    color: '#4B5860',
    borderRadius: 2,
    fontSize: 15,
    fontWeight: '500',
    borderBottomWidth: 1.5,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: '#B2BABF',
    paddingLeft: 10,
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
  countryCodeText: {
    marginTop: 24,
    marginLeft: 10,
  },
});
