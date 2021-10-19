import React, {useState} from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const AddText = () => {

    const [inputText, setInputText] = useState("");

    return (
        <View style={{height: 80, width: 380, justifyContent: "center", alignItems: "center", flex: 1, marginTop: 20, borderWidth: 3, borderColor: "grey"}}>
            <TextInput style={{fontSize: 25}} placeholder="Write ..." onChangeText={(text) => setInputText(text)} /> 
        </View>
    )
}

export default AddText

const styles = StyleSheet.create({})
