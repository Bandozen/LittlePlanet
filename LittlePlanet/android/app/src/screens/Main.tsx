import React from 'react';
import {ImageBackground, View, StyleSheet, Button, Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import STTComponent from '../components/STTComponent';
import {MemberAPI} from '../utils/MemberAPI';
import { Text } from 'react-native-reanimated/lib/typescript/Animated';

type MainProps = {
  navigation: StackNavigationProp<any, 'Main'>;
};

const handleLogout = async () => {
  try {
    const logoutResponse = await MemberAPI.logout();
    Alert.alert('로그아웃 성공', '다녀오세요!');
  } catch (error) {
    console.log('로그아웃 실패', error);
  }
};

export default function Main({navigation}: MainProps) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/login_img.jpg')}
        style={styles.backgroundImage}>

        <Button title="로그인" onPress={() => navigation.navigate('Login')} />
        <Button title="로그아웃" onPress={handleLogout} />
        <STTComponent />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
});
