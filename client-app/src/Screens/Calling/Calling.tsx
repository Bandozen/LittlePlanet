import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';

type RootStackParamList = {
  Main: undefined;
  PhoneKey: undefined;
  Calling: { phoneNumber: string };
};

type CallingRouteProp = RouteProp<RootStackParamList, 'Calling'>;

interface CallingProps {
  route: CallingRouteProp;
  navigation: any; // NOTE: Navigation type can be improved here.
}

const KeypadButton: React.FC<{ number: string | number; onPress: (key: string | number) => void; }> = ({ number, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onPress(number)}>
      <Text style={styles.buttonText}>{number}</Text>
    </TouchableOpacity>
  );
};

export default function Calling({ route, navigation }: CallingProps) {
  const { phoneNumber } = route.params;
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const handleEndCall = async () => {
    if (sound) {
      await sound.stopAsync();
      setSound(null);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}> {phoneNumber}와 통화를 하고 있어요!</Text>
      <View style={styles.keypad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((key) => (
          <KeypadButton key={key} number={key} onPress={() => {}} />
        ))}
      </View>
      <TouchableOpacity style={styles.endCallButton} onPress={handleEndCall}>
        <Text style={styles.endCallText}>통화 종료</Text>
      </TouchableOpacity>
    </View>
  );
}

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
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 240,
  },
  button: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#aaa',
  },
  buttonText: {
    fontSize: 24,
  },
  endCallButton: {
    marginTop: 20,
    width: 120,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCallText: {
    color: 'white',
    fontSize: 16,
  },
});
