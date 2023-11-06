import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import Main from "./android/app/src/screens/Main";
import MainTest from "./android/app/src/screens/MainTest";
import MainLoadding from "./android/app/src/screens/MainLoadding";
import Login from "./android/app/src/screens/Login";
import Call from './android/app/src/screens/Call';


const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainTest"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="MainTest" component={MainTest} />
        <Stack.Screen name="MainLoadding" component={MainLoadding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Call" component={Call} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
