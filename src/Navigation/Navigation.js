import { Text, View } from 'react-native'
import React, { useState, useEffect, Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { auth } from '../firebase'
import TabNavigation from './TabNavigation';
import AuthNavigation from './AuthNavigation';


const Navigation = () => {
  // const user =" "
  const [user, setUser] = useState(null)
  useEffect(()=>{
    const unsubscribe= auth.onAuthStateChanged((userExist)=>{
      if(userExist){
        setUser(userExist)
      }else{
        setUser('')
      }
    })
    return unsubscribe;
  },[])
  return (
    <NavigationContainer>
      {user ? <TabNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  )

}


export default Navigation