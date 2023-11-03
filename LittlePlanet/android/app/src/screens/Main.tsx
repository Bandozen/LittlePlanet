import React from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  Button,
  Alert,
  Text,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import STTComponent from '../components/STTComponent';
import {MemberAPI} from '../utils/MemberAPI';
// import { Text } from 'react-native-reanimated/lib/typescript/Animated';

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
        <Button title="전화 걸기" onPress={() => navigation.navigate('Call')} />
        <Text style={ styles.textStyle }>소행성에 오신 것을 환영합니다!</Text>
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
    width: '100%', // 전체 부모 너비를 차지하도록 설정
    height: '100%', // 전체 부모 높이를 차지하도록 설정
    resizeMode: 'cover', // 이미지가 부모 뷰를 완전히 커버하도록 설정
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 20,
    color: 'white'
  }
});
