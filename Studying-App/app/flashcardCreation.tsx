import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks'

export default function flashcardCreation() {
    const { deckName } = useLocalSearchParams<{ deckName: string }>();
return (
    <View style={styles.container}>
        <Text style={styles.title}> {deckName} </Text>
        <TouchableOpacity style={styles.flashcard}><Text style={styles.button}>+</Text></TouchableOpacity>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 40,
        paddingTop: 20,
        fontWeight: "bold",
    },
    flashcard: {
        margin: 25,
        width: 300,
        height: 200,
        borderRadius: 12,
        backgroundColor: 'lavender',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        fontSize: 40,
    }

})