import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import Voice from '@react-native-community/voice';

interface TestSTTProps {
  isSTTActive: boolean;
  onSTTResult: (text: string) => void;
}

// 부모 컴포넌트(CallingComponent)로부터 onSTTResult 콜백을 받아 음성 인식 결과를 전달
const TestSTT: React.FC<TestSTTProps> = ({isSTTActive, onSTTResult}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const onSpeechStart = () => {
    setIsRecording(true);
    setText('');
  };

  const onSpeechEnd = () => {
    onSTTResult(text);
    console.log('최최종말끝남', 'text');
    setIsRecording(false);
  };
  // 음성 인식의 임시 결과를 처리하는 함수
  const onSpeechPartialResults = (event: any) => {
    // event.value는 배열로 임시 결과를 포함하고 있음.
    console.log('임시말들:', event.value);
    setText(event.value[0]);
  };

  // 최종 결과를 처리하는 함수
  const onSpeechResults = (event: any) => {
    console.log('최종말들', event.value);
    // 최종 결과를 setText로 설정하고 onSTTResult 콜백을 호출
    let finalResult = event.value.join(' ');
    setText(prevText => prevText + ' ' + finalResult);
    console.log("최종말들 이어졌나요?", finalResult )
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
    // 리스너 추가
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;

    // let timerId: NodeJS.Timeout; // 타이머 ID 타입을 NodeJS.Timeout으로 설정
    // STT 활성화/비활성화를 위한 useEffect(10초버전)
    // if (isSTTActive) {
    //   startRecording().catch(console.error);
    //   timerId = setTimeout(() => {
    //     if (isRecording) {
    //       stopRecording().catch(console.error);
    //     }
    //   }, 10000);
    // } else {
    //   if (isRecording) {
    //     stopRecording().catch(console.error);
    //   }
    // }

    // STT 활성화/비활성화를 위한 useEffect
    if (isSTTActive) {
      startRecording();
    } else {
      if (isRecording) {
        stopRecording();
      }
    }
    // 컴포넌트가 언마운트될 때 리스너 제거 및 타이머 취소
    return () => {
      // clearTimeout(timerId); // 타이머 취소
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [isSTTActive]);

  const startRecording = async () => {
    try {
      await Voice.start('ko-KR');
      if (isRecording) {
        stopRecording();
      }
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
