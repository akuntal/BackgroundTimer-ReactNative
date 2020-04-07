import React from 'react'
import {
  View,
  Button,
  Text,
  TextInput,
  Image,
  Alert,
  CheckBox,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

export class Register extends React.Component {
  state = {
    username: '', password: '', email: '', phone_number: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signUp = async () => {
    //const { username, password, email, phone_number } = this.state
    try {
      // here place your signup logic
      //console.log('user successfully signed up!: ', success)
      Alert.alert("working")
      this.props.navigation.navigate('Friends')
    } catch (err) {
      console.log('error signing up: ', err)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <>

        <Text style={styles.txt}>Year of Birth</Text>
        <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('username', val)}
        />
        </>

        <>
        <Text style={styles.txt}>Gender</Text>
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />
        </>

        <>
        <Text style={styles.txt}>Mobile</Text>
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('email', val)}
        />
        </>

        <>
        <Text style={styles.txt}>Terms of use</Text>
        <TextInput
          style={styles.input}
          placeholder='Phone Number'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('phone_number', val)}
        />
        </>
        <View style={styles.containerCheckbox}>

            <CheckBox




            />
            <Text style={styles.txt}>Terms & Condition</Text>
        </View>

        <TouchableOpacity style={[{ width: "85%", marginTop:60, height:50,backgroundColor:"#006BB6",borderRadius:50 }]} onPress={this.signUp}>
            <Text style={styles.buttonTxt}>Done</Text>
        </TouchableOpacity>

        <View style={styles.container} >
            <Image source = {require('./assets/Image4.png')} style={{width: 98, height: 15,marginTop:100}}/>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  txt: {
    width:350,
    fontSize:12,
    paddingTop:10,
  },
  registerTxt: {
      color:'white',
      fontSize:25,
      paddingTop:20,
      paddingLeft:30,
      textAlign:'left'
    },

   bottomTxt: {
         color:'#006BB6',
         fontSize:25,
         paddingTop:20,
         paddingLeft:30,
         textAlign:'center'
       },
    buttonTxt: {
          color:'white',
          fontSize:25,
          paddingTop:7,

          textAlign:'center'
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
    borderBottomWidth : 1.5,
    borderTopWidth : 1.5,
    borderLeftWidth : 1.5,
    borderRightWidth : 1.5,
    borderColor:'#B2BABF'
  },
  container: {
    alignSelf: 'stretch',
    //flex: 1,
    //justifyContent: 'flex-start',
    alignItems: 'center',
    height:'100%'

  },
  containerCheckbox: {
      flex: 2,
      justifyContent: 'flex-start',
      height:'100%'

    }
})