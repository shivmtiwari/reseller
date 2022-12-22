import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import { db } from '../firebase';
import { auth } from '../firebase';
import { getFirestore, collection, addDoc, serverTimestamp, firestore, Timestamp, documentId, } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref , storage} from "firebase/storage";
import { async } from '@firebase/util';


const CreateAd = () => {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState('');
    const [uploading, setUploading] = useState('');

    const [hasGalleryPermission, setHasgalleryPermission]= useState('');
    const [modal, setModal] = useState(false);


    useEffect(()=>{
        (async()=>{
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasgalleryPermission(galleryStatus.status==='granted');

        })();
    },[]);

    const pickImage =async ()=>{
        let result= await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect:[4,3],
            quality:1,
        })

        const source= {uri:result.uri}
        setImage(source);
        alert('Image Uploaded')

        if(!result.canceled){
            setImage(result.uri);

        }
    }

    if (hasGalleryPermission===false){
        return(
            <Text>What?</Text>
        )
    }

    const uploadImage =async()=>{
        setUploading(true);
        const response = await fetch(image.uri);
        const blob = await response.blob();
        const filename = image.uri.substring(image.uri.lastIndexOf('/')+1);
        var ref = firebase.storage().ref().child(filename).put(blob);
        try{
            await ref;
        }catch(e){
            console.log(e);
        }setUploading(false)
    }
    function myFunction(){
       uploadImage();
       postData();
    }
    
    const postData = async () => {
        if (!name || !year || !price || !phone ||!address || !desc || !image ) {
            alert("Please fill all fields");
            return;
          }
        try {
            const docRef = await addDoc(collection(db, "ads"), {
                name,
                year,
                price,
                phone,
                address,
                desc,
                image,
                uid: auth.currentUser.uid,
                Time: serverTimestamp(),
                posttime: Timestamp.now(),
            });
            alert('Your Ad has been posted successfully')
        } catch (error) {
            alert(error)
        }



    }


    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 12, backgroundColor: 'white', height: '100%' }}>
                <View style={{ alignItems: 'center', marginTop: 50, }}>

                </View>
                <View style={{ marginBottom: 30, }}>
                    <Text style={styles.title}>Sell Your Items</Text>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.59)', fontWeight: "500", textAlign: "center" }}>Submit your product details and reach to  potential customers who need it.</Text>
                </View>

                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="What are you selling ?"
                        keyboardType="text"
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Year of purchase"
                        keyboardType="numeric"
                        value={year}
                        onChangeText={text => setYear(text)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Enter Price in INR"
                        keyboardType='numeric'
                        value={price}
                        onChangeText={text => setPrice(text)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Enter your contact number"
                        keyboardType="numeric"
                        value={phone}
                        onChangeText={text => setPhone(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your full address"
                        keyboardType="text"
                        value={address}
                        onChangeText={text => setAddress(text)}
                        clearButtonMode="always"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Tell us more about product"
                        keyboardType="text"
                        value={desc}
                        onChangeText={text => setDesc(text)}
                        multiline={true}
                        numberOfLines={4}
                    />

                    <TouchableOpacity
                        style={styles.ImageButton}
                        onPress={()=>pickImage()}
                    >
                        <Feather name="upload-cloud" size={50} color="#8C52FF" />
                        <Text style={{ color: 'black', fontWeight: "500" }}>Upload an image</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={myFunction}
                        style={styles.button}
                    >
                        <Text style={{ color: '#FFFFFF', fontWeight: "600", textAlign: 'center' }}>Post</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </>
    )
}

export default CreateAd


const styles = StyleSheet.create({
    title: {
        fontSize: 26,
        fontWeight: "700",
        textAlign: 'center',
        marginBottom: 10,

    },
    input: {
        height: 46,
        marginVertical: 12,
        // borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 20,
        width: '100%',
        borderWidth:1,
        backgroundColor:'whitesmoke',
        borderColor:"#b8b8b8", 
       },

    button: {
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#8C52FF",
        padding: 10,
        marginBottom: 40,
        marginTop: 12,
        height: 46,
        borderRadius: 10,

    },
    height: {
        height: 92,

    },
    ImageButton: {
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "whitesmoke",
        padding: 10,
        marginBottom: 20,
        marginTop: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'dashed'

    },
})