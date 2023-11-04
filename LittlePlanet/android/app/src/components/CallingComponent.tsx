import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Sound from 'react-native-sound';
import STTComponent from '../components/STTComponent';
import {MemberAPI} from '../utils/MemberAPI';
import io from 'socket.io-client';

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
    // JWT 토큰을 가져오는 비동기 함수
    const fetchTokenAndConnect = async () => {
      try {
        const jwtToken = await MemberAPI.getJwtToken();
        if (jwtToken) {
          const newSocket = io('wss://k9c203.p.ssafy.io:18099', {
            extraHeaders: {
              Authorization: `Bearer ${jwtToken}`, // 헤더에 JWT 토큰 추가
            },
            secure: true,
          });
          setSocket(newSocket);

          // 정답 이벤트 리스너
          newSocket.on('correct-answer', data => {
            // 서버에서 'correct-answer' 이벤트를 받으면 다음 파일을 재생
            playNextFile();
          });

          // 오답 이벤트 리스너
          newSocket.on('wrong-answer', data => {
            // 서버에서 'wrong-answer' 이벤트를 받으면 오답 관련 파일 재생
            playSoundFile('narr_4.mp3');
          });

          // 통화 종료 이벤트 리스너
          newSocket.on('call-ended', data => {
            console.log('서버에서 통화 종료 요청을 받음:', data);
            onEndCall(); // 통화 종료
          });

          // 컴포넌트가 언마운트될 때 소켓 연결을 해제
          return () => {
            newSocket.off('correct-answer');
            newSocket.off('wrong-answer');
            newSocket.off('call-ended');
            newSocket.disconnect();
          };
        }
      } catch (error) {
        console.error('소켓 연결 설정 중 오류 발생:', error);
      }
    };

    fetchTokenAndConnect();
  }, []);
  // 컴포넌트가 마운트될 때 첫번째 파일을 재생
  useEffect(() => {
    playNextFile();

    // 소켓 설정 및 초기화
    return () => {
      // 컴포넌트가 언마운트될 때 WebSocket 연결을 정리
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  // STT 결과를 처리하는 함수
  const handleSTTResult = (text: string) => {
    setTranscript(text);
    if (socket) {
      socket.emit('STT_text', {text});
    }
    setIsSTTActive(false); // STT 중지
    setCurrentFileIndex(currentFileIndex + 1); // 다음 파일로 이동
    playNextFile(); // 다음 파일 재생
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{phoneNumber}와 통화를 하고 있어요!</Text>
      {isSTTActive && <STTComponent onSTTResult={handleSTTResult} />}
      <TouchableOpacity style={styles.endCallButton} onPress={onEndCall}>
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
