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
import Icon from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {StackNavigationProp} from '@react-navigation/stack';
import {MemberAPI} from '../utils/MemberAPI';
import STTComponent from '../components/STTComponent';

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
  const [narrstatus, setnarrstatus] = useState('');

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
        // const newSocket = new WebSocket('ws://192.168.100.85:7777');
        const newSocket = new WebSocket('wss://k9c203.p.ssafy.io:17777');

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
        type: 'text',
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
        type: 'text',
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
    <ImageBackground
      source={require('../assets/images/login_img.jpg')}
      style={styles.backgroundImage}>
      <KeyboardAwareScrollView>
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
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={handleLogout}>
                <Text style={styles.buttonText}>로그아웃</Text>
              </TouchableOpacity>
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
          <TouchableOpacity
            style={[styles.callButton]}
            onPress={() => navigation.navigate('Call')}>
            <Icon name="phone" size={40} color="yellow" />
            <Text style={styles.textStyle}>전화</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sttButton]}
            onPress={toggleSTT}
            activeOpacity={0.7} // 옵셔널: 눌렀을 때 투명도 효과를 줍니다.
          >
            <FontAwesome
              name={isSTTActive ? 'microphone-slash' : 'microphone'}
              size={40}
              color="yellow"
            />
            <Text style={styles.textStyle}>
              {isSTTActive ? 'Stop STT' : 'Start STT'}
            </Text>
          </TouchableOpacity>
        </View>
        <STTComponent
          isSTTActive={isSTTActive}
          onSTTResult={handleSTTResult}
          socketSend={socket_send}
        />
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    fontFamily: 'GowunDodum-Regular',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    textAlign: 'center',
    marginTop: 10,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {width: 0, height: 2},
    elevation: 5,
  },
  buttonText: {
    color: 'black',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
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
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 1},
    elevation: 2,
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
  callButton: {
    position: 'absolute',
    bottom: -80,
    left: 100, // 왼쪽 하단, left의 값을 조정하여 위치 변경
  },
  sttButton: {
    position: 'absolute',
    bottom: -80,
    right: 50, // 오른쪽 하단, right의 값을 조정하여 위치 변경
  },
});
