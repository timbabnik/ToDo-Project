import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const Personal = ({taskMessage, slika, taskMessageTwo}) => {
    return (
        <View style={{alignItems: "center", justifyContent: "center", width: "100%"}}>
            {
                taskMessage ? (
                    <View style={{backgroundColor: "white", width: "100%", justifyContent: "center", alignItems: "center"}}>
                        <Text style={{paddingVertical: 20, fontSize: 30}}>{taskMessage}</Text>
                        <Text style={{ fontSize: 20, color: "grey"}}>{taskMessageTwo}</Text>
                    </View> 
                ) : null
            }
            
            {
                slika ? (
                    <View style={{backgroundColor: "white", width: "100%", justifyContent: "center", alignItems: "center", paddingVertical: 20}}>
                        <Image style={{height: 300, width: 300, paddingVertical: 40}} source={{uri: slika}} />
                    </View>
                ) : null
            }
            
        </View>
    )
}

export default Personal

const styles = StyleSheet.create({})
