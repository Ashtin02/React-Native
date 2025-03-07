import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Flashcard from '@/app/flashcard';
import flashcardData from "../decks.json"
import { router, useLocalSearchParams } from 'expo-router';
import deckData from '../decks.json'




export default function DetailedDeck() {
    const { name } = useLocalSearchParams();
    const [correct, setCorrect] = useState(0);
    const selectedDeck = deckData.find(deck => deck.name === name);
    
    const handleIncorrect = () => {
        setCorrect(correct - 1)
    }

    const handleCorrect = () => {
        setCorrect(correct + 1)
    }

    if (!selectedDeck) {
        return <Text style={styles.error}>Deck not found!</Text>;
    }

return (
    <View style={styles.container}>
    <Text style={styles.title}>{selectedDeck.name}</Text>

      {/* FlatList with horizontal scrolling */}
        <FlatList
        data={selectedDeck.flashcards}
                renderItem={({ item }) => (
                    <Flashcard answer={item.answer} question={item.question} />
        )}
        horizontal 
        showsHorizontalScrollIndicator={false} 
        />
        <TouchableOpacity style={[styles.button, styles.correct] } onPress={handleCorrect}> <Text style={styles.buttontext}> 👍 </Text></TouchableOpacity>
        <Text style={styles.counter}>{correct}</Text>
        <TouchableOpacity style={[styles.button, styles.incorrect]} onPress={handleIncorrect}> <Text style={styles.buttontext}> 👎 </Text></TouchableOpacity>
        </View>
        );
}

const styles = StyleSheet.create({
container: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, 
},
title: {
    fontSize: 40,
    paddingTop:20,
    fontWeight:"bold",
},
error: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
},
flashcard: {
    margin: 25,
    width: 300,
    height: 200,
    borderRadius: 12,
    backgroundColor: 'lavender', 
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    
    },
    button: {
        position: 'absolute',
        padding: 10,
        borderRadius: 30,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
    }, 
    buttontext: {
        fontSize:25
    }, 
    correct: {
        bottom: 20,
        right: 20
    }, 
    incorrect: {
        left: 20,
        bottom: 20,
    }, 
    counter: {
        bottom: 20, 
    }
});
