import React, { useState, useLayoutEffect } from 'react'
import { Pressable, SectionList, StyleSheet, Text, TextInput, View } from 'react-native'
import { db, auth } from '../firebase';

const AddFeel = ({navigation}) => {
    
    const [input, setInput] = useState("");
    const [selected, setSelected] = useState("");


    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Create new note",

        })
    }, [navigation])


    const createFeel = async () => {
        await db
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection("ifeel")
            .add({
                feelName: input,
                color: selected,
            }).then(navigation.goBack())
        setInput(null)
    }

    const barve = [
        "red",
        "blue",
        "orange",
        "green",
    ] 

    

    return (
        <View style={{alignItems: "center", flex: 1, marginTop: 50}}>
            <Text style={{fontSize: 30}}>Create new note ...</Text>
            <TextInput style={{marginTop: 30, fontSize: 20, borderBottomWidth: 1, borderBottomColor: "darkgrey", width: 250, paddingVertical: 10}} placeholder="Write new ..." value={input} onChangeText={(text) => setInput(text)} />
            <View style={{marginTop: 40, flexDirection: "row", width: "50%", justifyContent: "space-between"}}>
                {
                    barve.map((item, index) => {
                        return <Pressable key={index} onPress={() => setSelected(item)} style={{height: 30, width: 30, borderRadius: 15, backgroundColor: item, borderColor: "black", borderWidth: selected===item ? 2 : 0}}  />
                    })
                    }
                
            </View>
            <Pressable onPress={() => createFeel()} style={{marginTop: 50, height: 50, width: 170, backgroundColor: "#2C68ED", justifyContent: "center", alignItems: "center"}}>
                <Text style={{color: "#fff", fontSize: 18}}>Add</Text>
            </Pressable>
        </View>
    )
}

export default AddFeel

const styles = StyleSheet.create({})
