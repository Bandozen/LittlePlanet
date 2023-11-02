import React from 'react';
import {View, StyleSheet} from 'react-native';
import LoginComponent from '../components/LoginComponent';

type LoginProps = {
  navigation: any;
};

const Login: React.FC<LoginProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LoginComponent navigation={navigation} />
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

export default Login;
