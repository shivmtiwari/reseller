import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();
    const Loginpress = () => {
        navigation.navigate('SignUp')
    }

    const handleLogin = () => {
        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then(async (res) => {
                alert('Login Successfull')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            });
    };

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 12, backgroundColor: 'white', height: '100%', }}>
                <View style={{ alignItems: 'center', marginTop: 100, }}>
                    <Image
                        style={{ width: 150, height: 150, }}
                        source={require('../assets/logo1.png')}
                    />
                </View>
                <View style={{ marginBottom: 50, }}>
                    <Text style={styles.title}>Hello Again 👋</Text>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.59)', fontWeight: "500", textAlign: "center" }}>Welcome back you've been missed</Text>
                </View>

                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        keyboardType="text"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        keyboardType="password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                    >
                        <Text style={{ color: '#FFFFFF', fontWeight: "600" }}>Login</Text>
                    </TouchableOpacity>

                    <View >
                        <Text style={{ textAlign: "center" }}>Don't have an account? <Text style={{ color: "#8C52FF", }} onPress={Loginpress}>SignUp now</Text></Text>
                    </View>

                </View>
            </ScrollView>
        </>
    )
}

export default LogIn

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
        borderWidth: 1,
        borderColor: "#8C52FF",
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