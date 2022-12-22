import { StyleSheet, Text, View, KeyboardAvoidingView,ScrollView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase'


const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();
    const press = () => {
        navigation.goBack()
    }

    const handleSignup = () => {
        if (!name || !email || !password) {
            alert("Please fill all fields");
            return;
          }
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (res) => {
        //   setSubmitButtonDisabled(false);
          const user = res.user;
          await updateProfile(user, {
            displayName: name,
          },
          alert('SignUp Successfully'));
        })
        .catch((error) => {
            alert(errorMessage)
        });
    };


    return (

        <>
               <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 12, backgroundColor: 'white', height: '100%', }}>
               <View style={{ alignItems: 'center', marginTop: 50, }}>
                    <Image
                        style={{ width: 150, height: 150, }}
                        source={require('../assets/logo1.png')}
                    />
                </View>
                <View style={{ marginBottom: 50, }}>
                    <Text style={styles.title}>Let's get started</Text>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.59)', fontWeight: "500", textAlign: "center" }}>Create an account to get all features</Text>
                </View>

                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your Name"
                        keyboardType="text"
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your Email"
                        keyboardType="email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        keyboardType="text"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={true}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSignup}
                    >
                        <Text style={{ color: '#FFFFFF', fontWeight: "600" }}>Register</Text>
                    </TouchableOpacity>

                    <View >
                        <Text style={{ textAlign: "center" }}>Already have an account? <Text style={{ color: "#8C52FF", marginBottom: 20, }} onPress={press}>LogIn now</Text></Text>
                    </View>

                </View>
        
               </ScrollView>
        </>
    )
}

export default SignUp

const styles = StyleSheet.create({
    title: {
        fontSize: 26,
        fontWeight: "700",
        textAlign: 'center',
        marginBottom: 10,

    },
    input: {
        height: 46,
        marginVertical: 18,
        borderRadius: 10,
        paddingLeft: 20,
        width: '100%',
        borderWidth:1,
        borderColor:"#8C52FF",
    },

    button: {
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#8C52FF",
        padding: 10,
        marginBottom: 40,
        marginTop: 18,
        height: 46,
        borderRadius: 10,

    },
})