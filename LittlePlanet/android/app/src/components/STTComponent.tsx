import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import Voice from '@react-native-community/voice';

const STTComponent: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = () => {
    setIsRecording(true);
    setText('');
  };

  const onSpeechEnd = () => {
    setIsRecording(false);
  };

  const onSpeechResults = (event: any) => {
    setText(event.value[0]);
  };

  const onSpeechPartialResults = (event: any) => {
    setText(event.value[0]);
};

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title={isRecording ? '녹음 중지' : '녹음 시작'}
        onPress={isRecording ? stopRecording : startRecording}
      />
      <Text>{text}</Text>
    </View>
  );
};

export default STTComponent;
