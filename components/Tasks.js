import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { db } from '../firebase';
import { auth } from '../firebase';

const Tasks = ({taskMessage, onPressClick}) => {

    const [clicked, setClicked] = useState(false);

    const isClicked = () => {
        setClicked(!clicked);
        
    }

    return (
        <Pressable style={styles.container} onPress={isClicked}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <View style={[styles.circle, {backgroundColor: clicked ? "green" : "red"}]} />
                <Text style={{marginLeft: 10}}>{taskMessage}</Text>
            </View>
            <Pressable onPress={onPressClick}>
                <Feather name="x-circle" size={24} color="black" />
            </Pressable>
        </Pressable>
    )
}

export default Tasks

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingVertical: 15,
        borderRadius: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        justifyContent: "space-between"
    },

    circle: {
        height: 22,
        width: 22,
        
        borderRadius: 15,
    }
})
