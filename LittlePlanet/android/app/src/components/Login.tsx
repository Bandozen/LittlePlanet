import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { MemberAPI } from '../utils/MemberAPI';

const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async () => {
    try {
      const data = await MemberAPI.login(email, password);
      // 성공하면 메인 화면으로 전환
      Alert.alert('로그인 성공', '소행성 탐험시작!');
    } catch (error) {
      Alert.alert('로그인 실패', '이메일 또는 비밀번호가 틀립니다.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder="이메일" 
        onChangeText={setEmail} 
        value={email} 
        keyboardType="email-address"
      />
      <TextInput 
        style={styles.input} 
        placeholder="비밀번호" 
        onChangeText={setPassword} 
        value={password} 
        secureTextEntry 
      />
      <Button title="로그인" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default LoginComponent;
