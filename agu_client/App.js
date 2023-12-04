import React from 'react';
import { StyleSheet } from "react-native"
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./components/authentication/LoginScreen";
import SignUpScreen from "./components/authentication/SignUpScreen";
import { createStackNavigator } from '@react-navigation/stack';
import MainApp from "./components/MainApp";

const Stack = createStackNavigator();

export default function App() {
  return (
      // deny access to move between screens
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="LogIn" component={LoginScreen}/>
          <Stack.Screen name="MainApp" component={MainApp}/>
          <Stack.Screen name="SignUp" component={SignUpScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
