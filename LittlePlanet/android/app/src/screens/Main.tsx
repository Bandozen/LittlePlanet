import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  Button,
  Alert,
  Text,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MemberAPI} from '../utils/MemberAPI';

type MainProps = {
  navigation: StackNavigationProp<any, 'Main'>;
};

export default function Main({navigation}: MainProps) {
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        // JWT 토큰을 가져와 상태를 설정합니다.
        const token = await MemberAPI.getJwtToken();
        setJwtToken(token);
      } catch (error) {
        console.log('토큰 로딩 실패', error);
      }
    };

    initialize();
  }, []);

  const handleLogout = async () => {
    try {
      // 로그아웃 API 호출
      await MemberAPI.logout();
      // JWT 토큰 상태 초기화
      await MemberAPI.setJwtToken('');
      setJwtToken('');
      Alert.alert('로그아웃 성공', '다녀오세요!');
    } catch (error) {
      Alert.alert('로그아웃 실패', '다시 시도해주세요.');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/login_img.jpg')}
        style={styles.backgroundImage}>
        {jwtToken ? (
          // 로그인 상태일 때 보이는 버튼
          <React.Fragment>
            <Text style={styles.textStyle}>소행성에 오신 것을 환영합니다!</Text>
            <Button title="로그아웃" onPress={handleLogout} />
          </React.Fragment>
        ) : (
          // 로그아웃 상태일 때 보이는 버튼
          <React.Fragment>
            <Button
              title="로그인"
              onPress={() => navigation.navigate('Login')}
            />
            <Text style={styles.textStyle}>로그인해주세요.</Text>
          </React.Fragment>
        )}

        <Button title="전화 걸기" onPress={() => navigation.navigate('Call')} />
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
    color: 'white',
  },
});
