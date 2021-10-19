import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TaskScreen from '../screens/TaskScreen';
import AddFeel from '../screens/AddFeel';
import FeelScreen from '../screens/FeelScreen';


const Stack = createNativeStackNavigator();


const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Task" component={TaskScreen} options={{headerShown: true}} />
                <Stack.Screen name="Feel" component={AddFeel} options={{headerShown: true}} />
                <Stack.Screen name="Feeling" component={FeelScreen} options={{headerShown: true}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router

const styles = StyleSheet.create({})
