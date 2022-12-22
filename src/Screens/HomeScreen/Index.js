import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, {  } from 'react'
import ListItems from './ListItems'
import { auth } from '../../firebase'
const Index = (props) => {

  return (
    <>
      <View style={{ backgroundColor: "white", paddingHorizontal: 12,}}>
        <Text style={{ paddingTop: 40,  fontSize: 14, fontWeight: "600", color: "#8C52FF", backgroundColor: "white" }} >Hello,{auth.currentUser ?auth.currentUser.displayName :  " "}
        </Text>
        <Text style={{ paddingBottom: 16,  fontSize: 16, fontWeight: "600", color: "#10393f", backgroundColor: "white" }}>What are you looking for?</Text>
      </View>

      <ListItems />
    </>
  )
}

export default Index

const styles = StyleSheet.create({
  input: {
    height: 46,
    marginVertical: 12,
    // borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    width: '100%',
    backgroundColor: "white",
    borderWidth:1,
    borderColor:"whitesmoke",
  },
})