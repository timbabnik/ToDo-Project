import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View,Pressable } from 'react-native'
import { auth, db } from '../firebase';

const RegisterScreen = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(({user}) => {
            db.collection("users").doc(user.uid).set({
                    displayName: name,
            })
        })
        .catch((error) => alert(error.message))
    }

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{fontSize: 30, fontWeight: "500", marginBottom: 40}}>Create your account</Text>
            <View style={{marginBottom: 50}}>
                <TextInput placeholder="Full Name" style={[styles.input, {marginBottom: 10}]} onChangeText={(text) => setName(text)} value={name} />
                <TextInput placeholder="Email" style={[styles.input, {marginBottom: 10}]} onChangeText={(text) => setEmail(text)} value={email} />
                <TextInput placeholder="Password" style={styles.input} onChangeText={(text) => setPassword(text)} value={password} secureTextEntry />
            </View>
            <Pressable onPress={register} style={{marginBottom: 80, height: 50, width: 200, backgroundColor: "#5B9BFF", justifyContent: "center", alignItems: "center"}}>
                <Text style={{color: "#fff", fontSize: 17}}>Register</Text>
            </Pressable>
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: "darkgrey",
        width: 270,
        paddingVertical: 15
    }
})
