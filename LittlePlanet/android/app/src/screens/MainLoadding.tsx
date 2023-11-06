import React, {useState, useEffect, useCallback} from 'react';
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
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

type MainLoaddingProps = {
  navigation: StackNavigationProp<any, 'MainLoadding'>;
};

export default function MainLoadding({navigation}: MainLoaddingProps) {
  const [IsLoggedin, setIsLoggedin] = useState(false);
  const [socket, setSocket] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  useEffect(() => {
    const newSocket = new WebSocket('wss://k9c203.p.ssafy.io:17777');

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


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/login_img.jpg')}
        style={styles.backgroundImage}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}></Image>
        <View style={styles.contentContainer}>

              <Text style={styles.textStyle}>
                소행성에 오신 것을 환영합니다!
              </Text>
              <Text style={styles.textStyle}>
                시뮬레이션 상황에 맞게 어플이 재구성되니 잠시 기다려주세요.
              </Text>
              </View>

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
    marginTop: 20,
  },
  textinputStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
