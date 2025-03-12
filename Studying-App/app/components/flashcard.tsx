import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface FlashcardProps {
    question: string;
    answer: string
}

export default function Flashcard({ question, answer }: FlashcardProps) {
const [flipped, setFlipped] = useState(false);

const flipCard = () => {
    setFlipped(!flipped);
};


return (
    <View style={styles.container}>
    <TouchableOpacity onPress={flipCard}>
        <View style={styles.flashcard}>
          {/* Front Side of Flashcard */}
        {flipped ? (
            <View style={[styles.flashcard]}>
                        <Text style={styles.cardText}>{question}</Text>
            </View>
        ) : (
            <View style={[styles.flashcard]}>
                            <Text style={styles.cardText}>{answer}</Text>
            </View>
        )}
        </View>
    </TouchableOpacity>
    </View>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    padding: 20,
},
});
