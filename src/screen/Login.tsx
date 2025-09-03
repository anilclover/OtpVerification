import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
} from 'react-native';
import OtpVerificationScreen from './OtpVerificationScreen';

import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, reset } from '../redux/slice/CounterSlice';
import { RootState } from '../redux/store/Store';
interface LoginProps {
  onLogin: () => void;
}
// https://vegease.in/
const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const sendOtp = () => {
    if (mobile.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return;
    }
    setIsOtpSent(true);
    console.log('Waiting for OTP from emulator console...');
  };

  if (isOtpSent) {
    return <OtpVerificationScreen mobile={mobile} onVerified={onLogin} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz App Login</Text>
      <Text style={styles.title}> {count}</Text>

      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="numeric"
        maxLength={10}
      />

      <TouchableOpacity style={styles.button} onPress={sendOtp}>
        <Text style={styles.buttonText}>Send OTP {'  '}👈</Text>
      </TouchableOpacity>
      {/* <View style={styles.view}></View>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <View style={styles.view}></View>
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
      <View style={styles.view}></View>
      <Button title="ReSet" onPress={() => dispatch(reset())} />
      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#007AFF',
    fontSize: 16,
  },
  view: {
    justifyContent: 'center',
    margin: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Login;
