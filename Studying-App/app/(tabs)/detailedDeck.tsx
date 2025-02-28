import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import Flashcard from '@/components/flashcard';

const decks = [
{
    name: 'React Basics',
    flashcards: [
    { question: 'What is React Native?', answer: 'A framework for building mobile apps using React.' },
    { question: 'What is JSX?', answer: 'A syntax extension for JavaScript that looks similar to HTML.' },
    { question: 'What is a component?', answer: 'A building block of React apps that encapsulates logic and UI.' },
    ],
},
];

export default function DetailedDeck() {
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
    fontSize: 30,
    paddingBottom: 20, 
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
});
