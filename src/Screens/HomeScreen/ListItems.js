import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView, TextInput, Linking, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { db } from '../../firebase';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { auth } from '../../firebase';
import Feather from 'react-native-vector-icons/Feather';
import firestore, { collection, doc, setDoc, getDoc, getDocs, documentId } from "firebase/firestore";

const ListItems = (props) => {
    const [items, setItems] = useState([]);
    const [olditems, setOlditems] = useState([]);
    const [search, setSearch] = useState('');
    const searchRef = useRef();


    const getDetails = async () => {
        const querySnapshot = await getDocs(collection(db, "ads"));
        const result = querySnapshot.docs.map(docSnap => docSnap.data())
        // console.log(result)
        setItems(result)
        // setOlditems(result)

    }

    useEffect(() => {
        getDetails()
        return () => {
            <>
                <Text>Hey</Text>
            </>
        }
    })

    // const onSearch=(text)=>{
    //     let tempList=items.filter(item =>{
    //         return item.name.toLowerCase().indexOf(text.toLowerCase()) >-1;
    //     })
    //     setItems(tempList)
    // }

    // const myitems = [
    //     {
    //         id: 1,
    //         name: "Product Name",
    //         year: "2022",
    //         price: "200",
    //         phone: "7523805619",
    //         image: "https://images.unsplash.com/photo-1661961112835-ca6f5811d2af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80",
    //         desc: "hey how are you",
    //         address: "Naraini road, Banda"
    //     },
    //     {
    //         id: 2,
    //         name: "Product Name 2 ",
    //         year: "2022",
    //         price: "200",
    //         phone: "7523805619",
    //         image: "https://images.unsplash.com/photo-1661961112835-ca6f5811d2af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80",
    //         desc: "hey how are you",
    //         address: "Naraini road, Banda"

    //     },
    //     {
    //         id: 3,
    //         name: "Product Name 3",
    //         year: "2022",
    //         price: "200",
    //         phone: "7523805619",
    //         image: "https://images.unsplash.com/photo-1661961112835-ca6f5811d2af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80",
    //         desc: "hey how are you",
    //         address: "Naraini road, Banda"

    //     },
    //     {
    //         id: 4,
    //         name: "Product Name 3",
    //         year: "2022",
    //         price: "200",
    //         phone: "7523805619",
    //         image: "https://images.unsplash.com/photo-1661961112835-ca6f5811d2af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80",
    //         desc: "hey how are you",
    //         address: "Naraini road, Banda"

    //     }
    // ]

    // const openDial=(phone)=>{
    //     if (Platform.OS === 'android'){
    //         Linking.openURL(`tel:${phone}`)
    //     }
    // }
    const renderItem = (item) => {
        return (

            <>
                <View style={styles.shadowProp}>
                    <View>
                        <Image
                            style={{ width: 320, height: 250, borderRadius: 10, }}
                            source={{ uri: item.image }}
                        />
                    </View>
                    <View style={{
                        paddingTop: 10,
                        paddingBottom:10,

                    }}>
                        <Text style={{ fontSize: 13, fontWeight: '600', paddingTop: 0, }}>{item.name}</Text>
                        <Text style={{ fontSize: 12, marginBottom:6, }}>{item.desc}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center", marginBottom: 10 }}>
                            <MaterialIcons name="location-on" size={16} color="#10393f" />
                            <Text style={{ marginLeft: 3, fontSize:12, }}>{item.address}</Text>
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: "row" }}>
                            <View><Text>Price: ₹ {item.price}</Text>
                                <Text>Year of purchase: {item.year}</Text></View>
                            <TouchableOpacity onPress={() => { Linking.openURL(`tel:${item.phone}`); }} style={{ padding: 10, borderWidth: 1, borderRadius: 50, borderColor: "#8C52FF", }}>
                                <Feather name="phone-call" size={20} color="#8C52FF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </>
        )
    }
    return (
        <View style={{ paddingBottom: 100, alignItems: "center", backgroundColor: "white" }}>
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


export default ListItems

const styles = StyleSheet.create({
    input: {
        height: 46,
        marginVertical: 12,
        // borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 20,
        width: '100%',
        borderWidth: 1,
        backgroundColor: 'whitesmoke',
        borderColor: "#b8b8b8",
    },
    shadowProp: {
        shadowOpacity: .10,
        shadowRadius: 100,

        elevation: 15,
        margin: 8,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "#8C52FF",
        padding: 10,
        marginBottom:20,
    },
})

