import React, {useState, useEffect} from 'react';
import {
  ViewStyle,
  View,
  TextStyle,
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
  'button_press.mp3',
  Sound.MAIN_BUNDLE,
  error => {
    if (error) {
      console.log('효과음을 로드할 수 없습니다.', error);
    }
  },
);

// const signalSound = new Sound('signal.mp3', Sound.MAIN_BUNDLE, error => {
//   if (error) {
//     console.log('신호음 파일을 로드할 수 없습니다.', error);
//   }
// });

const PhoneKeyComponent: React.FC<PhoneKeyProps> = ({onCallInitiated}) => {
  const [number, setNumber] = useState<string>('');

  const handleKeypadPress = (pressedKey: string | number) => {
    const updatedNumber = `${number}${pressedKey}`;
    setNumber(updatedNumber);

    // 사운드를 정지하고 시작점으로 리셋 후 다시 재생(react-native sound는 한번에 하나만 처리함 -> 콜백함수로 누를때마다 소리재생 가능)
    buttonPressSound.stop(() => {
      buttonPressSound.play();
    });
  };
  // 번호 지우기
  const handleBackspacePress = () => {
    setNumber(number.slice(0, -1)); // 현재 번호에서 마지막 자리를 제거
  };
  const handleCall = () => {
    // '119'라면 onCallInitiated를 호출(콜링컴포넌트로 넘어감)
    if (number === '119') {
      // signalSound.play(() => {
      onCallInitiated(number);
      // });
    } else {
      // 다른 번호일때
      Alert.alert('통화 실패', '119를 다시 입력해볼까요?');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.numberDisplay}>{number}</Text>
      <View style={styles.keypad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map(key => (
          <KeypadButton key={key} number={key} onPress={handleKeypadPress} />
        ))}
      </View>
      <View style={styles.extraButtons}>
        <TouchableOpacity style={styles.callButton} onPress={handleCall}>
          <Icon name="phone" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backspaceButton}
          onPress={handleBackspacePress}>
          <Icon name="backspace" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const KeypadButton: React.FC<{
  number: string | number;
  onPress: (key: string | number) => void;
}> = ({number, onPress}) => {
  // 화면 너비를 기반으로 버튼 크기 계산
  const screenWidth = Dimensions.get('window').width;
  const numColumns = 3;
  const size = screenWidth / numColumns;

  const buttonStyle: ViewStyle = {
    width: size - 40,
    height: size - 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: size / 2,
  };

  const textStyle: TextStyle = {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: size - 40,
  };

  return (
    <TouchableOpacity style={buttonStyle} onPress={() => onPress(number)}>
      <Text style={textStyle}>{number}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  numberDisplay: {
    fontSize: 32,
    marginBottom: 20,
    width: '100%',
    textAlign: 'center',
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  keypadButton: {
    width: 100,
    height: 70,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 35,
  },
  buttonText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  extraButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backspaceButton: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 35,
    margin: 20,
  },
  callButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
});

export default PhoneKeyComponent;
