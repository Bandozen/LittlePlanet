import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import CallingComponent from '../components/CallingComponent';
import PhoneKeyComponent from '../components/PhoneKeyComponent';

const Call = () => {
  // 상태 추가: 현재 전화를 거는 중인지 통화 중인지 결정
  const [inCall, setInCall] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  // 전화를 걸면 이 함수를 호출하여 상태를 업데이트
  const handleCallInitiation = (number: string) => {
    setPhoneNumber(number); // 전화번호 상태 설정
    setInCall(true); // 통화 상태를 true로 변경
  };

  const [socket, setSocket] = useState<WebSocket | null>(null);

  if (inCall && socket) {
    const goOneMessage = {
      type: 'page',
      content: 1,
    };
    socket.send(JSON.stringify(goOneMessage));
  }

  useEffect(() => {
    const newSocket = new WebSocket('wss://k9c203.p.ssafy.io:17777');

    newSocket.onopen = () => {
      console.log('WebSocket connection established.');
      setSocket(newSocket);
    };

    newSocket.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    return () => {
      newSocket.close();
      console.log('콜링으로 넘어간다');
    };
  }, []);

  return (
    <View style={styles.container}>
      {inCall ? (
        // 통화 중 상태면 CallingComponent를 표시
        <CallingComponent
          phoneNumber={phoneNumber}
          onEndCall={() => setInCall(false)} // 통화 종료 함수 전달
        />
      ) : (
        // 아니면 PhoneKeyComponent를 표시
        <PhoneKeyComponent
          onCallInitiated={handleCallInitiation} // 전화 시작 함수 전달
        />
      )}
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

export default Call;
