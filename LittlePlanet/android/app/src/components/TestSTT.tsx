import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Voice from '@react-native-community/voice';

interface TestSTTProps {
  isSTTActive: boolean;
  onSTTResult: (text: string) => void;
  socketSend: (text: string) => void;
}

// 부모 컴포넌트(CallingComponent)로부터 onSTTResult 콜백을 받아 음성 인식 결과를 전달
const TestSTT: React.FC<TestSTTProps> = ({
  isSTTActive,
  onSTTResult,
  socketSend,
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const [isFinal, setIsFinal] = useState<string>('');

=======
=======
>>>>>>> bce34b93ae35da6089d24e565787e4aba463edfd
=======
>>>>>>> bce34b93ae35da6089d24e565787e4aba463edfd
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isFinal, setIsFinal] = useState<string>('');
  // 타임딜레이 주는 함수
  const stopRecordingWithDelay = async (delay: number) => {
    // 이미 설정된 타임아웃을 취소
    if (timeoutId) clearTimeout(timeoutId);

    // 새로운 타임아웃을 설정
    const newTimeoutId = setTimeout(async () => {
      try {
        await Voice.stop();
        setIsRecording(false); // 음성 인식이 멈춘 후에 isRecording 상태를 업데이트
      } catch (e) {
        console.error(e);
      }
    }, delay);

    // 새로운 타임아웃 ID를 저장
    setTimeoutId(newTimeoutId);
  };
>>>>>>> bce34b93ae35da6089d24e565787e4aba463edfd

  const onSpeechStart = () => {
    setIsRecording(true);
    setText('');
  };
  
  const onSpeechEnd = () => {
    if (text) {
      console.log('최최종말끝남텍스트먼데', text);
      onSTTResult(text); // text가 비어있지 않다면 부모 컴포넌트에 전달
    } else {
      console.log('음성 인식 결과가 아직 준비되지 않았습니다.');
    }
    setIsRecording(false);
  };
  // 음성 인식의 임시 결과를 처리하는 함수
  const onSpeechPartialResults = (event: any) => {
    // event.value는 배열로 임시 결과를 포함하고 있음.
    console.log('onSpeechPartialResults의 event.value:', event.value);
    // setText(event.value[0]);
  };
  const onSpeechResults = (event: any) => {
    console.log('onSpeechResults의 event.value', event.value);
    // 최종 결과만을 setText로 설정
    let finalResult = event.value.join(' ');
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    setText(finalResult); // 이전 텍스트에 더하지 않고 새로운 값을 설정
    console.log('조인된 finalResult?', finalResult);
    onSTTResult(finalResult); // 부모 컴포넌트에 결과 전달
=======
=======
>>>>>>> bce34b93ae35da6089d24e565787e4aba463edfd
=======
>>>>>>> bce34b93ae35da6089d24e565787e4aba463edfd
    setText(prevText => prevText + ' ' + event.value.join(' '));
    console.log('최종말들 이어졌나요?', finalResult);
    ;
    onSTTResult(finalResult);
>>>>>>> bce34b93ae35da6089d24e565787e4aba463edfd
  };
  // // 최종 결과를 처리하는 함수
  // const onSpeechResults = (event: any) => {
  //   console.log('최종말들', event.value);
  //   // 최종 결과를 setText로 설정하고 onSTTResult 콜백을 호출
  //   let finalResult = event.value.join(' ');
  //   setText(prevText => prevText + ' ' + event.value.join(' '));
  //   console.log('최종말들 이어졌나요?', finalResult);
  //   onSTTResult(finalResult);
  // };
  // const onSpeechResults = (event: any) => {
  //   const textResult = event.value[0];
  //   setText(textResult);
  //   onSTTResult(textResult);
  // };

  // const onSpeechPartialResults = (event: any) => {
  //   setText(event.value[0]);
  // };
  useEffect(() => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    // text 상태가 변경될 때만 socketSend를 호출
    if (text) {
      socketSend(text);
    }
  }, [text]); // text 상태가 변경될 때마다 실행
=======
=======
>>>>>>> bce34b93ae35da6089d24e565787e4aba463edfd
=======
>>>>>>> bce34b93ae35da6089d24e565787e4aba463edfd
    setIsFinal(text)
  
  
  }, [text]);
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> bce34b93ae35da6089d24e565787e4aba463edfd
=======
>>>>>>> bce34b93ae35da6089d24e565787e4aba463edfd
=======
>>>>>>> bce34b93ae35da6089d24e565787e4aba463edfd

  useEffect(() => {
    // 리스너 추가
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;

    // STT 활성화/비활성화를 위한 useEffect
    if (isSTTActive) {
      startRecording().catch(console.error);
    } else {
      if (isRecording) {
        stopRecording().catch(console.error);
      }
    }
    // 컴포넌트가 언마운트될 때 리스너 제거 
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [isSTTActive]);

  useEffect(() => {
    socketSend(text);
  }, [isFinal]);

  useEffect(() => {
    
    socketSend(text)
    
  }, [isFinal]);

  useEffect(() => {
    
    socketSend(text)
    
  }, [isFinal]);

  useEffect(() => {
    
    socketSend(text)
    
  }, [isFinal]);

  const startRecording = async () => {
    try {
      await Voice.start('ko-KR');
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'red', padding: 10, flexShrink: 1}}>{text}</Text>
    </View>
  );
};

export default TestSTT;
