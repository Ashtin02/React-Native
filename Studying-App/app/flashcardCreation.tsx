import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function flashcardCreation() {

    const [deckName, setDeckName] = useState('');

    
    return (
        <View style={styles.container}>
            <View style={styles.flashcard}>
            <TextInput
                style={styles.input}
                    placeholder='Please input a Deck Name'
                    value={deckName}
                    onChangeText={setDeckName}
                /> 
            </View>
            <TouchableOpacity style={styles.button}>
            <Text> Continue </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        borderWidth: 1, 
        textAlign: "center",
        borderRadius: 12,
    },
    flashcard: {
        margin: 25,
        width: 300,
        height: 200,
        borderRadius: 12,
        backgroundColor: 'lavender', // Default color for the front
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    button: {
        backgroundColor: "lavender", 
        padding: 10, 
        borderRadius: 12,

    }
})