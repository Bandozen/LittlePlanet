import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Alert,
  Modal,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {MemberAPI} from '../utils/MemberAPI';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Main: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export default function LoginComponent({
  navigation,
}: {
  navigation: NavigationProp;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = async () => {
    try {
      const loginResponse = await MemberAPI.login(email, password);
      Alert.alert('로그인 성공', '환영합니다!');

      setLoginFailed(false);
      navigation.navigate('Main');
    } catch (error) {
      console.log('로그인 실패', error);

      Alert.alert('로그인 실패', '이메일 또는 비밀번호가 틀립니다.');
      setLoginFailed(true);
    }
  };

  return (
    <View style={{padding: 20}}>
      <TextInput
        style={{borderWidth: 1, padding: 10, marginBottom: 10}}
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
      />
      {emailError && <Text style={{color: 'red'}}>{emailError}</Text>}

      <TextInput
        style={{borderWidth: 1, padding: 10, marginBottom: 10}}
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {passwordError && <Text style={{color: 'red'}}>{passwordError}</Text>}

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={{color: 'blue', marginTop: 10}}>비밀번호 찾기</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: 300,
              padding: 20,
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <Text>비밀번호 찾기 모달</Text>
            <Button title="닫기" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
});
