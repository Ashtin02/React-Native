import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useCallback } from 'react'
import { router, useFocusEffect } from 'expo-router';

export default function creation() {
const [deckName, setDeckName] = useState('');

const handleContinue = () => {
    router.push({ pathname: "/addToDeck", params: { deckName }  });
}

    // reset the state for when it's navigated to again
    useFocusEffect(
        useCallback(() => {
            setDeckName('');
        }, [])
    );


return (
    <View style={styles.container}>
    <View style={styles.flashcard}>
    <TextInput
        style={styles.input}
        placeholder='Please input a Deck Name'
        onChangeText={setDeckName}
        value={deckName}
    /> 
    </View>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
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