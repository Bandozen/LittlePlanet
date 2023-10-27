import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import PhoneKey from '../../Components/PhoneKey/PhoneKey';

export default function App() {
  const [isDialing, setIsDialing] = useState(false);

  const handleStartDialing = () => {
    setIsDialing(true);
  };

  const handleEndDialing = () => {
    setIsDialing(false);
  };

  return isDialing ? (
    <PhoneKey onEndCall={handleEndDialing} />
  ) : (
    <View style={styles.mainContainer}>
        <Text>통화버튼을 눌러보세요!</Text>
      <TouchableOpacity style={styles.callButton} onPress={handleStartDialing}>
        <MaterialIcons name="call" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callButton: {
    marginTop: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
