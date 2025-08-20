import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  DeviceEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
} from 'react-native';

const { OtpModule } = NativeModules;

interface OtpVerificationScreenProps {
  mobile: string;
  onVerified: () => void;
}

const OtpVerificationScreen: React.FC<OtpVerificationScreenProps> = ({
  mobile,
  onVerified,
}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    const requestSmsPermission = async () => {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECEIVE_SMS
        );
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_SMS
        );
      }
    };

    const subscription = DeviceEventEmitter.addListener(
      'OtpReceived',
      receivedOtp => {
        const otpArray = receivedOtp.split('');
        setOtp(otpArray);
        setTimeout(() => {
          onVerified();
        }, 500);
      },
    );

    requestSmsPermission();
    
    if (OtpModule) {
      OtpModule.startListening();
    }

    return () => {
      subscription.remove();
    };
  }, [onVerified]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>OTP sent to {mobile}</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => { if (ref) inputRefs.current[index] = ref; }}
            style={[
              styles.otpBox,
              digit ? styles.otpBoxFilled : null,
            ]}
            value={digit}
            onChangeText={text => handleOtpChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
          />
        ))}
      </View>

      <Text style={styles.statusText}>
        {otp.join('').length === 4
          ? '✅ Verified! Logging in...'
          : otp.join('')
          ? 'Verifying...'
          : 'Waiting for OTP from console...'}
      </Text>
      

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
    marginBottom: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpBox: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 8,
    fontSize: 24,
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  otpBoxFilled: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  statusText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#007AFF',
  },

});

export default OtpVerificationScreen;
