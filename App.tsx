import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Quiz from './src/screen/Quiz';
import Login from './src/screen/Login';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoggedIn ? <Quiz /> : <Login onLogin={handleLogin} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
