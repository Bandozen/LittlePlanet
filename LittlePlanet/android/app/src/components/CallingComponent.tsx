import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import STTComponent from '../components/STTComponent';


interface CallingProps {
  phoneNumber: string;
  onEndCall: () => void;
}

const CallingComponent: React.FC<CallingProps> = ({phoneNumber, onEndCall}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{phoneNumber}와 통화를 하고 있어요!</Text>
      <STTComponent />
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
export default CallingComponent;
