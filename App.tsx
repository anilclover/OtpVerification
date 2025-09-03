import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Quiz from './src/screen/Quiz';
import Login from './src/screen/Login';
import { Provider } from 'react-redux';
import { store } from './src/redux/store/Store';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Provider store={store}>
      {isLoggedIn ? <Quiz /> : <Login onLogin={handleLogin} />}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
