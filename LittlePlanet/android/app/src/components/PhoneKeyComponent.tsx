import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface PhoneKeyProps {
  onCallInitiated: (phoneNumber: string) => void;
}

const buttonPressSound = new Sound(
  'music/buttonPress.mp3',
  Sound.MAIN_BUNDLE,
  (error) => {
    if (error) {
      console.log('효과음을 로드할 수 없습니다.', error);
    }
  },
);

const signalSound = new Sound(
  'music/signal.mp3',
  Sound.MAIN_BUNDLE,
  (error) => {
    if (error) {
      console.log('신호음 파일을 로드할 수 없습니다.', error);
    }
  },
);

const PhoneKeyComponent: React.FC<PhoneKeyProps> = ({ onCallInitiated }) => {
  const [number, setNumber] = useState<string>('');

  const handleKeypadPress = (pressedKey: string | number) => {
    const updatedNumber = `${number}${pressedKey}`;
    setNumber(updatedNumber);
    buttonPressSound.play();
  };

  const handleCall = () => {
    // '119'라면 신호음을 재생하고 onCallInitiated를 호출합니다.
    if (number === '119') {
      signalSound.play(() => {
        onCallInitiated(number);
      });
    } else {
      // 다른 번호라면 알림을 보여줍니다.
      Alert.alert('통화 실패', '119를 다시 입력해볼까요?');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.numberDisplay}>{number}</Text>
      <View style={styles.keypad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((key) => (
          <KeypadButton key={key} number={key} onPress={handleKeypadPress} />
        ))}
      </View>
      <TouchableOpacity style={styles.callButton} onPress={handleCall}>
        <Icon name="phone" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const KeypadButton: React.FC<{
  number: string | number;
  onPress: (key: string | number) => void;
}> = ({ number, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onPress(number)}>
      <Text style={styles.buttonText}>{number}</Text>
    </TouchableOpacity>
  );
};

const windowWidth = Dimensions.get('window').width;
const buttonWidth = (windowWidth - 40) / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberDisplay: {
    fontSize: 32,
    marginBottom: 20,
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: windowWidth - 20,
  },
  button: {
    width: buttonWidth,
    height: buttonWidth,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#aaa',
  },
  buttonText: {
    fontSize: 24,
  },
  callButton: {
    marginTop: 20,
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PhoneKeyComponent;
