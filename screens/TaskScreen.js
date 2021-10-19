import React, { useState, useLayoutEffect, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Keyboard, Pressable, FlatList } from 'react-native'
import Tasks from '../components/Tasks'
import { auth } from '../firebase'
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { db } from '../firebase';
import Feel from '../components/Feel';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const TaskScreen = ({ navigation }) => {

    const [task, setTask] = useState("");
    const [taskItems, setTaskItems] = useState([]);
    const [users, setUsers] = useState([]);
    

    
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login")
        })
    }

    const deleteItem = (id) => {
        db.collection("users").doc(auth.currentUser.uid).collection("chats").doc(id).delete();
    }

    useEffect(() => {
        const unsubscribe = db.collection("users").doc(auth.currentUser.uid).collection("chats").onSnapshot((snapshot) => 
            setTaskItems(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );

        return unsubscribe;
    }, [])

    useEffect(() => {
        const unsubscribe = db.collection("users").doc(auth.currentUser.uid).collection("ifeel").onSnapshot((snapshot) => 
            setUsers(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );

        return unsubscribe;
    }, [])

    

    const createChat = async () => {
        await db
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection("chats")
            .add({
                chatName: task,
            })
        setTask(null)
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Today´s tasks",
            headerStyle: { backgroundColor: "#2C68ED" },
            headerTitleStyle: { color: "white", fontSize: 22 },
            headerTintColor: "white",
            headerLeft: () => (
                <TouchableOpacity onPress={signOutUser}>
                    <SimpleLineIcons name="logout" size={24} color="white" />
                </TouchableOpacity>
            )
        })
    }, [navigation])


    return (
        <View style={styles.container}>
            <View style={styles.taskContainer}>
                
                <ScrollView style={styles.yourTasks} showsVerticalScrollIndicator={false}>
                   { taskItems.map(({id, data: { chatName } }) => {
                       return <Tasks key={id} 
                       id={id}  taskMessage={chatName} onPressClick={() => deleteItem(id) } />
                   })}

                    <Pressable style={styles.containerInput}>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <View style={[styles.circle, {backgroundColor: "grey"}]} />
                            <TextInput style={{marginLeft: 10}} placeholder="Write new task ..." onSubmitEditing={createChat} value={task} onChangeText={(text) => setTask(text)}  />
                        </View>
                    </Pressable>
                </ScrollView>
                
                
            </View>
            <View style={styles.helpContainer}>
                
                
                <View style={{ alignItems: "center", width: "80%", flexDirection: "row", marginBottom: 20}}>
                    <ScrollView horizontal style={styles.yourTasksTwo} showsHorizontalScrollIndicator={false}>
                        { users.map(({id, data: { feelName, color } }) => {
                            return <Feel key={id} 
                            id={id}  backgroundC={color} feeling={feelName} onPress={() => navigation.navigate("Feeling", {id})} />
                        })}
                    </ScrollView>
                    <TouchableOpacity style={{marginTop: 20, marginLeft: 10}} onPress={() => navigation.navigate("Feel")}>
                        <AntDesign name="plussquareo" size={20} color="darkgrey"  />
                    </TouchableOpacity>
                </View>
                
                
            </View>
        </View>
    )
}

export default TaskScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8E8E8"
    },

    taskContainer: {
        paddingHorizontal: 40,
    },

    yourTasks: {
        height: "69%",
        marginTop: 10
    },  

    helpContainer: {
        backgroundColor: "#fff",
        height: 150,
        width: "100%",
        position: "absolute",
        bottom: 0,
        alignItems: "center",
        flexDirection:"row",
        justifyContent: "center"
    },

    yourTasksTwo: {
        width: "70%",
        
    },

    containerInput: {
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
