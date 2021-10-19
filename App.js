import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Animated } from 'react-native';
import Router from './navigation/Router';
import LoginScreen from './screens/LoginScreen';
import TaskScreen from './screens/TaskScreen';



export default function App() {


  return (
    <Router />
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
