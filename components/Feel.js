import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'

const Feel = ({ feeling, backgroundC, onPress, id }) => {
    return (
        <Pressable id={id} onPress={onPress} style={{height: 90, width: 90, backgroundColor: backgroundC, justifyContent: "center", alignItems: "center", borderRadius: 10, marginHorizontal: 10, marginTop: 20}}>
            <Text>{feeling}</Text>
        </Pressable>
        
    )
}

export default Feel

const styles = StyleSheet.create({})
