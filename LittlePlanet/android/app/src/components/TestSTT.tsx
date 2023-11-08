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

  const onSpeechStart = () => {
    setIsRecording(true);
    setText('');
  };

  const onSpeechEnd = () => {
    onSTTResult(text);
    console.log('최최종말끝남', 'text');
    // 즉시 음성 인식을 멈추지 않고, 지연 시간 후에 멈춤
    stopRecordingWithDelay(3000); // 3초 후에 음성 인식을 멈추도록 설정
    setIsRecording(false);
  };
  // 음성 인식의 임시 결과를 처리하는 함수
  const onSpeechPartialResults = (event: any) => {
    // event.value는 배열로 임시 결과를 포함하고 있음.
    console.log('임시말들:', event.value);
    // setText(event.value[0]);
  };

  // 최종 결과를 처리하는 함수
  const onSpeechResults = (event: any) => {
    console.log('최종말들', event.value);
    // 최종 결과를 setText로 설정하고 onSTTResult 콜백을 호출
    let finalResult = event.value.join(' ');
    setText(prevText => prevText + ' ' + event.value.join(' '));
    console.log('최종말들 이어졌나요?', finalResult);
    onSTTResult(finalResult);
  };
  // const onSpeechResults = (event: any) => {
  //   const textResult = event.value[0];
  //   setText(textResult);
  //   onSTTResult(textResult);
  // };

  // const onSpeechPartialResults = (event: any) => {
  //   setText(event.value[0]);
  // };
  useEffect(() => {
    setIsFinal(text);
  }, [text]);

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
    // 컴포넌트가 언마운트될 때 리스너 제거 및 타이머 취소
    return () => {
      // clearTimeout(timerId); // 10초 타이머 취소
      if (timeoutId) clearTimeout(timeoutId); // 타임아웃 취소
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [isSTTActive, timeoutId]);

  useEffect(() => {
    socketSend(text);
  }, [isFinal]);

  const startRecording = async () => {
    try {
      await Voice.start('ko-KR');
      // if (isRecording) {
      //   stopRecording();
      // }
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
