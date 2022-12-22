import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native'
import Reac, { useState, useEffect } from 'react'
import { db } from '../firebase';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { auth } from '../firebase';
import firestore, { collection, doc, setDoc, getDoc, documentId, query, where, getDocs } from "firebase/firestore";

const About = () => {
  const [items, setItems] = useState([]);
  const [olditems, setOlditems] = useState([]);



  const q = query(collection(db, "ads"), where("uid", "==", auth.currentUser.uid));

  const getDetails = async () => {
    const querySnapshot = await getDocs(q)
    const result = querySnapshot.docs.map(docSnap => docSnap.data())
    // console.log(result)
    setItems(result)

  }

  useEffect(() => {
    getDetails()
    return () => {
      (<>
      </>)
    }
  })

  const renderItem = (item) => {
    return (

      <>

        <View style={styles.shadowProp}>
          <View>
            <Image
              style={{ width: 320, height: 250, borderRadius: 6, }}
              source={{ uri: item.image }}
            />
          </View>
          <View style={{
            padding: 10,

          }}>
            <Text style={{ fontSize: 14, fontWeight: '600', paddingTop: 0, }}>{item.name}</Text>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
              <MaterialIcons name="location-on" size={16} color="#10393f" />
              <Text style={{ marginLeft: 3 }}>{item.address}</Text>
            </View>
            <Text style={{ fontSize: 13, marginBottom: 10 }}>{item.desc}</Text>
            <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: "row" }}>
              <View><Text>Price: ₹ {item.price}</Text>
                <Text>Year of purchase: {item.year}</Text></View>
              <TouchableOpacity style={{ padding: 10, borderWidth: 1, borderRadius: 50, }}>
                <Feather name="phone-call" size={20} color="#10393f" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    )
  }

  return (
    <View style={{ alignItems: "center", justifyContent: "center", paddingTop: 50, backgroundColor: "white", paddingBottom:100,}}>
      <View style={{ backgroundColor: "#f7f5fc", width: "100%", borderTopLeftRadius: 30, borderTopRightRadius: 30, }}>
        <View style={{
          textAlign: 'center',
          backgroundColor: 'white',
          paddingVertical:20,
        }}>
          <Text style={{ textAlign: 'center', fontSize:20, fontWeight:"600" }}>{auth.currentUser.displayName}</Text>
          <Text style={{ textAlign: 'center' }} >{auth.currentUser.email}</Text>

          <TouchableOpacity
            onPress={() => auth.signOut()} >
            <Text
              style={{ borderWidth:1, width:90, margin:"auto", alignSelf:"center", paddingVertical:8, borderColor:'red', color: 'red', marginTop: 20, fontWeight: "600", textAlign:"center" }}>Log out</Text>
          </TouchableOpacity>

        </View>
<View style={{backgroundColor:"whitesmoke"}}>
<Text style={{ marginTop: 20, padding:12, paddingBottom:15, color: 'black', backgroundColor:"white", fontSize: 20, fontWeight: "600" }}>Ads posted by me</Text>
</View>
      </View >



      <FlatList showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={items}
        keyExtractor={(item, index) => item.desc}
        renderItem={({ item }) => renderItem(item)}
        inverted={true}
      >
      </FlatList>
    </View>
  )
}

export default About

const styles = StyleSheet.create({
  input: {
    height: 46,
    marginVertical: 12,
    borderRadius: 10,
    paddingLeft: 20,
    width: '100%',
    backgroundColor: "#E6F4F1",
  },
  shadowProp: {
    shadowOpacity: .10,
    shadowRadius: 100,

    elevation: 15,
    margin: 8,
    backgroundColor: "white",
    borderRadius: 6,
    shadowColor: "#8C52FF",
    // borderWidth:1,b
    // borderWidth:1,
    padding: 10,
    marginBottom:20,
},
})

