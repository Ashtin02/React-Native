import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Flashcard from '@/app/flashcard';
import flashcardData from "../decks.json"
import { router } from 'expo-router';

const decks = require('../decks.json')




export default function DetailedDeck() {
    const [correct, setCorrect] = useState(0);
    const [selectedDeck, setSelectedDeck] = useState('');
    
    const handleIncorrect = () => {
        setCorrect(correct - 1)
    }

    const handleCorrect = () => {
        setCorrect(correct + 1)
    }
return (
    <View style={styles.container}>
    <Text style={styles.title}>{decks[0].name}</Text>

      {/* FlatList with horizontal scrolling */}
        <FlatList
        data={decks[0].flashcards}
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
