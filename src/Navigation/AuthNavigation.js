import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import SignUp from '../Screens/SignUp';
import LogIn from '../Screens/LogIn';



const Stack = createNativeStackNavigator();


const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }} >
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  )

}

export default AuthNavigation

const styles = StyleSheet.create({})