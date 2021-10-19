import React, {useState, useEffect} from 'react'
import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { auth } from '../firebase'



const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser){
                navigation.replace("Task");
            }
        });

        return unsubscribe;
    }, [])

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).catch(error => alert(error));
    }

    return (
        <View style={styles.container}>
            <Image source={require("../loginPic.jpg")} style={{height: 300, width: 331}} />
            <View style={{marginTop: 40}}>
                <TextInput placeholder="Email" style={[styles.input, {marginBottom: 30}]} value={email} onChangeText={(text) => setEmail(text)} />
                <TextInput placeholder="Password" style={styles.input} secureTextEntry value={password} onChangeText={(text) => setPassword(text)} />
            </View>
            <TouchableOpacity onPress={signIn} style={{backgroundColor: "#5B9BFF", height: 50, width: 180, marginTop: 40, justifyContent: "center", alignItems: "center"}}>
                <Text style={{color: "white"}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Register")} style={{justifyContent: "center", alignItems: "center", height: 50, width: 180, borderWidth: 1, borderColor: "#5B9BFF", marginTop: 20}}>
                <Text style={{color: "#5B9BFF"}}>Register</Text>
            </TouchableOpacity>
            
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },

    input: {
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: "darkgrey",
        width: 270,
        paddingVertical: 10
    }
})
