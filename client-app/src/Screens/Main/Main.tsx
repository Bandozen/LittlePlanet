import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Main({navigation}) {
  return (
    <View style={styles.mainContainer}>
      <Text>통화버튼을 눌러보세요!</Text>
      <TouchableOpacity style={styles.callButton} onPress={() => navigation.navigate('PhoneKey')}>
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
