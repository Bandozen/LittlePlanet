import React, {useState, useEffect, useCallback} from 'react';
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
import LoginComponent from '../components/LoginComponent';
import STTComponent from '../components/STTComponent';

type MainProps = {
  navigation: StackNavigationProp<any, 'Main'>;
};

export default function Main({navigation}: MainProps) {
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [socket, setSocket] = useState<any>(null);
  const [transcript, setTranscript] = useState('');


  const onLoginSuccess = useCallback((jwt: string) => {
    setJwtToken(jwt);
  }, []);

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = await MemberAPI.getJwtToken();
        console.log('받아온 토큰:', token);
        setJwtToken(token);
      } catch (error) {
        console.log('토큰 로딩 실패', error);
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    console.log('JWT 토큰 상태:', jwtToken);
  }, [jwtToken]);

  // 로그인 상태 확인 및 설정
  const checkLoginStatus = useCallback(async () => {
    try {
      const token = await MemberAPI.getJwtToken();
      setJwtToken(token); // 상태 업데이트
    } catch (error) {
      console.error('JWT 토큰 상태 확인 실패:', error);
    }
  }, []);

  useEffect(() => {
    checkLoginStatus();
    console.log('JWT 토큰 상태확인하기:', jwtToken);
  }, [checkLoginStatus]);

  useEffect(() => {
    const newSocket = new WebSocket('ws://172.30.1.84:7777');

    newSocket.onopen = () => {
      console.log('웹소켓 연결');
      setSocket(newSocket);
    };

    newSocket.onmessage = event => {
      console.log(event.data);
      if (event.data === 'do you sent? go Phonekey') {
        navigation.navigate('Call');
        newSocket.close();
      }
    };

    newSocket.onclose = () => {
      console.log('웹소켓 연결 종료');
    };

    return () => {
      newSocket.close();
    };
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await MemberAPI.logout();
      console.log('로그아웃 함수 호출 성공');
      await MemberAPI.setJwtToken(null);
      setJwtToken(null);
      console.log('JWT 토큰 상태를 null로 설정');
      Alert.alert('로그아웃 성공', '다녀오세요!');
    } catch (error) {
      Alert.alert('로그아웃 실패', '다시 시도해주세요.');
      console.log(error);
    }
  }, []);
  // STT 결과를 처리하는 함수
  const handleSTTResult = (text: string) => {
    setTranscript(text);
      console.log('텍스트넘어간다', text);
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
            <Text style={styles.textStyle}>
              시뮬레이션 상황에 맞게 어플이 재구성되니 잠시 기다려주세요.
            </Text>
            <Button title="로그아웃" onPress={handleLogout} />
          </React.Fragment>
        ) : (
          // 로그아웃 상태일 때 보이는 버튼
          <React.Fragment>
            <Text style={styles.textStyle}>소행성서비스는 로그인이 필요해요.</Text>
            <Button
              title="로그인"
              onPress={() => navigation.navigate('Login')}
            />
          </React.Fragment>
        )}

        <Button title="전화 걸기" onPress={() => navigation.navigate('Call')} />
        <STTComponent onSTTResult={handleSTTResult} />
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
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 20,
    color: 'white',
  },
});
