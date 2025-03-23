import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

/**
 * Function that is responsible for creating a new flashcard that will be added to a deck, 
 * it also ensures that a new array of flashcards is sent back to its caller that includes the newly
 * created one
 */
export default function AddFlashcard() {
    const { deckName, flashcards } = useLocalSearchParams<{ deckName: string, flashcards: string }>();
    const router = useRouter();
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [isFlipped, setIsFlipped] = useState(false);


    // reset the states using focused effect so when it's navigated to again the fields are blank
    useFocusEffect(
        useCallback(() => {
            setQuestion("");
            setAnswer("");
            setIsFlipped(false);
        }, [])
    );


    // Convert props to a parsed format
    const parsedFlashcards = flashcards ? JSON.parse(flashcards) : [];

    // function to handle the flashcard being flipped
    const handleContinue = () => {
        if (!isFlipped) {
            setIsFlipped(true);
        } else {
            const newFlashcard = { question, answer };
            const updatedFlashcards = [...parsedFlashcards, newFlashcard]; // copy old and new flashcards

            console.log("New flashcard list being sent back to addTodeck:", updatedFlashcards);

            // Navigate back with updated flashcards as passed params
            router.replace({ 
                pathname: "/addToDeck", 
                params: { deckName, existingFlashcards: JSON.stringify(updatedFlashcards) } 
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.flashcard}>
                {!isFlipped ? (
                    <TextInput
                        placeholder="Enter Flashcard Question..."
                        value={question}
                        onChangeText={setQuestion}
                        style={styles.input}
                    />
                ) : (
                    <TextInput
                        placeholder="Enter Flashcard Answer..."
                        value={answer}
                        onChangeText={setAnswer}
                        style={styles.input}
                    />
                )}
            </View>

            {/* Button to flip flashcards, and then to continue */}
            <TouchableOpacity onPress={handleContinue} style={styles.button}>
                <Text style={styles.buttonText}>
                    {isFlipped ? "Save & Return" : "Continue (Answer)"}
                </Text>
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
    input: {
        borderWidth: 1, 
        textAlign: "center",
        borderRadius: 12,
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'lavender',
        borderRadius: 8,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
    },
});
