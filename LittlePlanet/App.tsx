import React from 'react';
import { View, StyleSheet } from 'react-native';

import STTComponent from './android/app/src/components/STTComponent';
import Login from './android/app/src/components/Login';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Login />
      <STTComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
