import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
  const [isSTTActive, setIsSTTActive] = useState(true);
  const [transcript, setTranscript] = useState('');
  const [socket, setSocket] = useState<any>(null);

  // 신호음 재생
  const signalSound = new Sound('signal.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('신호음 파일을 로드할 수 없습니다.', error);
    }
  });

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

  // 나레이션 재생 후 STT 활성화 함수
  const activateSTTAfterNarration = () => {
    setIsSTTActive(true);
    // 5초 후 STT 비활성화 및 다음 나레이션 파일 재생
    setTimeout(() => {
      setIsSTTActive(false); // STT 비활성화
      playNextFile(); // 다음 나레이션 파일 재생
    }, 5000);
  };

  useEffect(() => {
    // 신호음 재생
    signalSound.play(() => {
      // 신호음 재생 후 첫 번째 나레이션 파일 재생
      playSoundFile(narrationFiles[0]);
      // 첫 번째 나레이션 재생 후 STT 활성화
      activateSTTAfterNarration();
    });

    let newSocket: WebSocket | null = null;

    // JWT 토큰을 가져오고 WebSocket 연결을 시도하는 함수
    const fetchTokenAndConnect = async () => {
      try {
        const jwtToken = await MemberAPI.getJwtToken();
        if (jwtToken) {
          newSocket = new WebSocket('wss://k9c203.p.ssafy.io:17777');

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

  // STT 결과를 처리하는 함수
  const handleSTTResult = (text: string) => {
    setTranscript(text);
    if (socket) {
      socket.send({text});
      console.log('텍스트넘어간다', text);
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
      <View style={styles.contactInfoContainer}>
        <Text style={styles.contactName}>{phoneNumber}</Text>
        <Text style={styles.callStatus}>통화 중...</Text>
      </View>

      {isSTTActive && (
        <STTComponent isSTTActive={isSTTActive} onSTTResult={handleSTTResult} />
      )}

      {isSTTActive && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.listeningText}>듣고 있어요...</Text>
        </View>
      )}

      <View style={styles.transcriptContainer}>
        <Text style={styles.transcriptText}>{transcript}</Text>
      </View>

      <View style={styles.callActionContainer}>
        <TouchableOpacity
          style={styles.endCallButton}
          onPress={onEndCallModified}>
          <Icon name="call-end" size={30} color="#FFF" />
          <Text style={styles.endCallText}>통화종료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // 화면 전체에 균등 분포
    alignItems: 'center', // 수평 중앙 정렬
    padding: 20,
    backgroundColor: '#f5f5f5', // 배경색 변경
  },
  contactInfoContainer: {
    alignItems: 'center',
  },
  contactName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  callStatus: {
    fontSize: 18,
    color: '#666',
    marginTop: 8,
  },
  callActionContainer: {
    alignSelf: 'stretch', // 부모의 너비에 맞춤
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  endCallButton: {
    marginTop: 20,
    width: 100,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF4444',
    borderRadius: 22,
    margin: 20, // 버튼 주변의 여백
  },
  endCallText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  transcriptContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  transcriptText: {
    fontSize: 18,
    color: '#333',
  },
  activityIndicatorContainer: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listeningText: {
    fontSize: 18,
    color: '#555',
    marginTop: 10,
  },
});
export default CallingComponent;
