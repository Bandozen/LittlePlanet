import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  Image,
  View,
  StyleSheet,
  Button,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MemberAPI} from '../utils/MemberAPI';
import TestSTT from '../components/TestSTT';

type MainProps = {
  navigation: StackNavigationProp<any, 'Main'>;
};

export default function Main({navigation}: MainProps) {
  const [IsLoggedin, setIsLoggedin] = useState(false);
  const [socket, setSocket] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [isSTTActive, setIsSTTActive] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [status, setstatus] = useState('');

  const handleLogin = async () => {
    try {
      const {jwt} = await MemberAPI.login(email, password);
      console.log('jwt', jwt);
      if (jwt) {
        await MemberAPI.setJwtToken(jwt);
        await MemberAPI.setEmail(email);
        Alert.alert('로그인 성공', '환영합니다!');
        setIsLoggedin(true);
        // 로그인 성공 후 WebSocket 연결 초기화
        const newSocket = new WebSocket('ws://192.168.100.85:7777');

        newSocket.onopen = () => {
          console.log('웹소켓 연결');

          // 소켓이 열린 후에 핸드셰이크를 수행
          const handShake = {
            type: 'app',
            email,
          };
          newSocket.send(JSON.stringify(handShake));
          console.log('핸드셰이크 전송 성공');
        };

        newSocket.onmessage = event => {
          const eventMessage = JSON.parse(event.data);
          if (eventMessage.type === 'narr' && eventMessage.content === 0) {
            navigation.navigate('Call');
          }
        };

        newSocket.onclose = () => {
          console.log('웹소켓 연결 종료');
        };

        // WebSocket 인스턴스를 상태에 저장
        setSocket(newSocket);

        // Main 화면으로 네비게이션
        navigation.navigate('Main');
      } else {
        throw new Error('No JWT returned');
      }
    } catch (error) {
      console.log('로그인 실패', error);
      Alert.alert('로그인 실패', '이메일 또는 비밀번호가 틀립니다.');
      setIsLoggedin(false);
    }
  };

  const handleLogout = async () => {
    try {
      Alert.alert('로그아웃 성공', '다녀오세요!');
      await MemberAPI.logout();
      setIsLoggedin(false);
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert('로그아웃 실패', '다시 시도해주세요.');
      console.log(error);
    }
  };

  const handleSTTResult = (text: string) => {
    setTranscript(text);
    if (socket && text) {
      const textMessage = {
        type: `text${status}`,
        content: text,
      };
      socket.send(JSON.stringify(textMessage));
    } else {
      console.log('텍스트 안넘어감');
    }
    setIsSTTActive(false);
  };
  const socket_send = (text: string) => {
    if (socket && text) {
      const textMessage = {
        type: `text${status}`,
        content: text,
      };
      socket.send(JSON.stringify(textMessage));
    } else {
      console.log('text 없는듯?');
    }
  };
  const toggleSTT = () => {
    setIsSTTActive(!isSTTActive);
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/login_img.jpg')}
        style={styles.backgroundImage}>
        <View style={styles.contentContainer}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}></Image>
          {IsLoggedin ? (
            // 로그인 상태일 때 보이는 버튼
            <React.Fragment>
              <Text style={styles.textStyle}>
                소행성에 오신 것을 환영합니다!
              </Text>
              <Text style={styles.textStyle}>
                시뮬레이션 상황에 맞게 어플이 재구성되니
              </Text>
              <Text style={styles.textStyle}>잠시 기다려주세요.</Text>
              <Button title="로그아웃" onPress={handleLogout} />
            </React.Fragment>
          ) : (
            // 로그아웃 상태일 때 보이는 버튼
            <React.Fragment>
              <View style={styles.textinputStyle}>
                <TextInput
                  style={styles.inputText}
                  placeholder="이메일을 입력하세요."
                  value={email}
                  onChangeText={setEmail}
                />
                {emailError && <Text style={{color: 'red'}}>{emailError}</Text>}
              </View>
              <View style={styles.textinputStyle}>
                <TextInput
                  style={styles.inputText}
                  placeholder="비밀번호를 입력하세요."
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
                {passwordError && (
                  <Text style={{color: 'red'}}>{passwordError}</Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={handleLogin}>
                <Text style={styles.buttonText}>로그인</Text>
              </TouchableOpacity>
            </React.Fragment>
          )}
          <Button
            title="전화 걸기"
            onPress={() => navigation.navigate('Call')}
          />
          <Button
            title={isSTTActive ? 'Stop STT' : 'Start STT'}
            onPress={toggleSTT}
          />
        </View>
        <TestSTT
          isSTTActive={isSTTActive}
          onSTTResult={handleSTTResult}
          socketSend={socket_send}
        />
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
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textStyle: {
    fontFamily: 'GowunDodum-Regular',
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  buttonStyle: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'GowunDodum-Regular',
  },
  inputText: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: '80%',
    backgroundColor: 'white',
    borderColor: 'white',
    color: 'black',
    borderRadius: 10,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  textinputStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
