import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Sound from 'react-native-sound';
import STTComponent from '../components/STTComponent';
import {MemberAPI} from '../utils/MemberAPI';


interface CallingProps {
  phoneNumber: string;
  onEndCall: () => void;
}

const narrationFiles = [
  'narr_4.mp3',
  'narr_5.mp3',
  'narr_6.mp3',
  'narr_7.mp3',
  'narr_8.mp3',
];

const CallingComponent: React.FC<CallingProps> = ({phoneNumber, onEndCall}) => {
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [isSTTActive, setIsSTTActive] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [socket, setSocket] = useState<any>(null);

  // 음성 파일 재생 함수
  const playSoundFile = (narrationFiles: string) => {
    let sound = new Sound(narrationFiles, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('사운드 출력 실패', error);
        return;
      }
      sound.play(success => {
        if (success) {
          console.log('사운드 플레이 성공');
        } else {
          console.log('Playback failed due to audio decoding errors');
        }
        sound.release();
      });
    });
  };

  const playNextFile = () => {
    if (currentFileIndex < narrationFiles.length) {
      playSoundFile(narrationFiles[currentFileIndex]);
      setCurrentFileIndex(currentFileIndex + 1); // 다음 파일 인덱스로 업데이트
    } else {
      console.log('모든 파일이 재생되었습니다.');
    }
  };
  useEffect(() => {
    let newSocket: WebSocket | null = null;
  
    // JWT 토큰을 가져오고 WebSocket 연결을 시도하는 함수
    const fetchTokenAndConnect = async () => {
      try {
        const jwtToken = await MemberAPI.getJwtToken();
        if (jwtToken) {
          newSocket = new WebSocket('ws://172.30.1.84:7777');
  
          newSocket.onopen = () => {
            console.log('웹소켓 연결');
          };
  
          // 모든 이벤트를 하나의 onmessage 핸들러에서 처리
          newSocket.onmessage = event => {
            console.log(event.data);
            if (event.data === 'correct-answer') {
              playNextFile();
            } else if (event.data === 'wrong-answer') {
              playSoundFile('narr_4.mp3');
            } else if (event.data === 'call-ended') {
              onEndCall(); // 통화 종료
            }
          };
  
          newSocket.onclose = () => {
            console.log('웹소켓 연결 종료');
          };
  
          setSocket(newSocket);
        }
      } catch (error) {
        console.error('소켓 연결 설정 중 오류 발생:', error);
      }
    };
  
    fetchTokenAndConnect();
  
    // 컴포넌트가 언마운트 될 때 WebSocket 연결을 정리하는 정리 함수
    return () => {
      if (newSocket) {
        newSocket.close(); // 컴포넌트가 언마운트될 때 소켓 닫기
      }
    };
  }, []);
  
  useEffect(() => {
    playNextFile();
  }, []);

  // STT 결과를 처리하는 함수
  const handleSTTResult = (text: string) => {
    setTranscript(text);
    if (socket) {
      socket.send({text});
      console.log("텍스트넘어간다", text)
    }
    setIsSTTActive(false); // STT 중지
    setCurrentFileIndex(currentFileIndex + 1); // 다음 파일로 이동
    playNextFile(); // 다음 파일 재생
  };
  const onEndCallModified = () => {
    if (socket) {
      socket.close(); // WebSocket 닫기 호출
    }
    onEndCall();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{phoneNumber}와 통화를 하고 있어요!</Text>
      {isSTTActive && <STTComponent onSTTResult={handleSTTResult} />}
      <TouchableOpacity style={styles.endCallButton} onPress={onEndCallModified}>
        <Text style={styles.endCallText}>통화 종료</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  endCallButton: {
    marginTop: 20,
    width: 120,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF4444',
    borderRadius: 22,
  },
  endCallText: {
    color: '#FFF',
    fontSize: 18,
  },
});
export default CallingComponent;
