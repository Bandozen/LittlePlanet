import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import Voice from '@react-native-community/voice';

interface STTComponentProps {
  isSTTActive: boolean;
  onSTTResult: (text: string) => void;
}

// 부모 컴포넌트(CallingComponent)로부터 onSTTResult 콜백을 받아 음성 인식 결과를 전달
const STTComponent: React.FC<STTComponentProps> = ({
  isSTTActive,
  onSTTResult,
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const onSpeechStart = () => {
    setIsRecording(true);
    setText('');
  };

  const onSpeechEnd = () => {
    setIsRecording(false);
  };

  const onSpeechResults = (event: any) => {
    const textResult = event.value[0];
    setText(textResult);
    onSTTResult(textResult);
  };

  const onSpeechPartialResults = (event: any) => {
    setText(event.value[0]);
  };

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;

    // STT 활성화/비활성화를 위한 useEffect
    if (isSTTActive) {
      startRecording();
    } else {
      if (isRecording) {
        stopRecording();
      }
    }

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
    // isSTTActive, onSTTResult를 의존성 배열에 추가
    // CallingComponent에서 상태가 변경되면 STTComponent에도 반영되어 리스너 업데이트됨
  }, [isSTTActive, isRecording, onSTTResult]);

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
      <Button
        title={isRecording ? '녹음 중지' : '녹음 시작'}
        onPress={isRecording ? stopRecording : startRecording}
      />
      <Text style={{color: 'red', padding: 10}}>{text}</Text>
    </View>
  );
};

export default STTComponent;
