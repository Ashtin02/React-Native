import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Flashcard from './components/Flashcard';

interface FlashcardType {
    question: string;
    answer: string;
}

export default function FlashcardCreation() {
    const { deckName, existingFlashcards } = useLocalSearchParams<{ deckName: string, existingFlashcards?: string }>();
    const [flashcards, setFlashcards] = useState<FlashcardType[]>([]); 
    const router = useRouter();

    // Update flashcards when navigating back to this screen
    useEffect(() => {
        if (existingFlashcards) {
            console.log("Existing flashcards received:", existingFlashcards);
            setFlashcards(JSON.parse(existingFlashcards)); // Update with latest flashcards
        }
    }, [existingFlashcards]); 

    // Save all flashcards to AsyncStorage when "Finish" is clicked
    const saveFlashcards = async () => {
        try {
            console.log(`Saving ${flashcards.length} flashcards for deck ${deckName}`, flashcards);
            
            await AsyncStorage.setItem(deckName, JSON.stringify(flashcards));

            // confirm that the flashcards were saved
            const checkSaved = await AsyncStorage.getItem(deckName);
            const parsedSaved = checkSaved ? JSON.parse(checkSaved) : [];
            console.log(`Verified saved flashcards for ${deckName}:`, parsedSaved);

            router.replace("/dashboard"); // redirect user to dashboard screen
        } catch (error) {
            console.error("Error saving the flashcards to async storage:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{deckName}</Text>

            {/* Button to save flashcards into async storage */}
            <TouchableOpacity style={styles.finishButton} onPress={saveFlashcards}>
                <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>

            {/* allows user to navigate to flashcard creation screen */}
            <TouchableOpacity 
                style={styles.addFlashcardButton} 
                onPress={() => router.push({ pathname: "/addFlashcard", params: { deckName, flashcards: JSON.stringify(flashcards) } })}
            >
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>

            {/* Display flashcards belonging to this deck */}
            <FlatList
                data={flashcards}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Flashcard question={item.question} answer={item.answer} />
                )}
                ListEmptyComponent={<Text style={styles.noFlashcardsText}>Add some flashcards!</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 45,
        paddingTop: 20,
        fontWeight: "bold",
    },
    finishButton: {
        marginTop: 15,
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#9370DB',
        borderRadius: 8,
    },
    addFlashcardButton: {
        margin: 25,
        width: 300,
        height: 200,
        borderRadius: 12,
        backgroundColor: 'lavender',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    noFlashcardsText: {
        fontSize: 20,
        color: 'gray',
        marginTop: 20,
    },
});
