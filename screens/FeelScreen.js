import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Button, Pressable, TextInput, Image, TouchableOpacity } from 'react-native'
import { auth } from '../firebase'
import { db } from '../firebase'
import Tasks from '../components/Tasks'
import Personal from '../components/Personal'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import AddText from '../components/AddText'
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase'
require("firebase/firestore")
require("firebase/firebase-storage")


const FeelScreen = ({route, navigation}) => {

   

    const [kontent, setKontent] = useState([]); 
    const [plus, setPlus] = useState(false);
    const [inputText, setInputText] = useState("");
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.Images,
            allowsEditing : true
        })

        if(!result.cancelled){
            setImage(result.uri)
        }
    }

    const addSomething = () => {
        setPlus(!plus);
    }

    const plusPress = () => {
        console.warn(inputText)
        setPlus(false);
    }

    const createNewText = async () => {
        await db
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection("ifeel")
            .doc(route.params.id)
            .collection("content")
            .add({
                contentName: inputText,
            })
        setPlus(false)
    }

    const createNewPhoto = async () => {
        await db
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection("ifeel")
            .doc(route.params.id)
            .collection("content")
            .add({
                imageContent: image,
            })
        setImage(null);
    }


    const uploadImage = async () => {
        const response = await fetch(image);
        const blob = await response.blob();
        const childPath = `post/${auth.currentUser.uid}/${Math.random().toString(36)}`

        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob)

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTrasnferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
                console.log(snapshot);
            })
        } 

        const taskError = snapshot => {
            console.log(snapshot);
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);

        setImage(null);
    }


    const savePostData = (imageContent) => {
        db.collection("users").doc(auth.currentUser.uid).collection("ifeel").doc(route.params.id).collection("content").add({
            imageContent,
            creation: firebase.firestore.FieldValue.serverTimestamp()
        })
    }
    

    useEffect(() => {
        const unsubscribe = db.collection("users").doc(auth.currentUser.uid).collection("ifeel").doc(route.params.id).collection("content").onSnapshot((snapshot) => 
            setKontent(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );

        return unsubscribe;
    }, [])

    const idSender = route.params.id;

    return (
        <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={{alignItems: "center"}} showsVerticalScrollIndicator={false}>
                
                   { kontent.map(({id, data: { contentName, imageContent } }) => {
                       return <Personal key={id} 
                       id={id}  taskMessage={contentName} slika={imageContent} />
                   })}
                   {
                       plus ? (
                        <View style={{height: 80, width: 340, justifyContent: "center", alignItems: "center", flex: 1, marginTop: 20, borderWidth: 3, borderColor: "grey"}}>
                            <TextInput style={{fontSize: 25}} placeholder="Write ..." onChangeText={(text) => setInputText(text)} onSubmitEditing={() => createNewText()} /> 
                        </View>
                       ) : null
                   }

                   {image && 
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Image source={{uri: image}} style={{width: 200, height: 200, marginTop: 20}} />
                            <TouchableOpacity style={{marginLeft: 30}} onPress={() => uploadImage()}>
                                <Ionicons name="add-circle" size={34} color="black" />
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={{height: 200}} />
                   
            </ScrollView>
            

            <View style={{flexDirection: "row", position: "absolute", bottom: 60, justifyContent: "space-around", width: "90%", marginLeft: 20}}>
                <Pressable onPress={() => addSomething()} style={{height: 80, width: 80, backgroundColor: "lightgrey", borderRadius: 40, justifyContent: "center", alignItems: "center"}}>
                    <AntDesign name="plus" size={24} color="black" />
                </Pressable>
                <Pressable onPress={pickImage} style={{height: 80, width: 80, backgroundColor: "lightgrey", borderRadius: 40, justifyContent: "center", alignItems: "center"}}>
                    <Entypo name="image" size={24} color="black" />
                </Pressable>
            </View>
        </View>
    )
}

export default FeelScreen

const styles = StyleSheet.create({})
