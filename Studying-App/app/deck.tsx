import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Flashcard from '@/app/components/flashcard';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

interface Flashcard {
    question: string;
    answer: string;
}

interface Deck {
    name: string;
    flashcards: Flashcard[];
}



export default function DetailedDeck() {
    //grabs name from passed in param
    const { name } = useLocalSearchParams<{ name?: string }>();

    // State for correct counter
    const [correct, setCorrect] = useState(0);

    // State for selected deck
    const [selectedDeck, setSelectedDeck] = useState<Deck | undefined>(undefined);

    /**
     * Fetches the decks from async storage, 
     * removing any non deck items and then updates the state of 
     * selected deck to the deck thats name matches the names passed in above
     */
    useFocusEffect(
        useCallback(() =>{
        const fetchDeck = async () => {
            try {
                if (name) {
                    let keys = await AsyncStorage.getAllKeys();
                    let entries = await AsyncStorage.multiGet(keys)
                    entries = entries.filter((keys) => keys[0] !== "username" && keys[0] !== "password" && keys[0] !== "userToken")
                    let parsedDecks = entries.map(([name, flashcards]) => ({
                        name,
                        flashcards: flashcards ? JSON.parse(flashcards) :[],
                    }));
                    const selectedDeck = parsedDecks.find(deck => deck.name === name)
                    setSelectedDeck(selectedDeck)
                }
            
            } catch (error) {
                console.error("Error Retrieving Selected Deck: ", error)
            }
        };
        fetchDeck();
        }, [name])
    )
    
    // Reset correct counter when a new deck is selected (based on name change)
    useEffect(() => {
        setCorrect(0);
    }, [name]);
    
    /**
     * Decrements correct counter to a minimum of 0
     */
    const handleIncorrect = () => {
        if (correct > 0) {
            setCorrect(correct - 1)
        }
    }

    /**
     * Increments Correct counter to a maximum of the number fo flashcards in that deck
     */
    const handleCorrect = () => {
        if(selectedDeck?.flashcards?.length != undefined){
            if (correct < selectedDeck?.flashcards.length) {
                setCorrect(correct + 1)
            }
        }
    }

    // If a name isn't given they are proplted it input one
    if (!name) {
        return <View style= {styles.container}><Text style={styles.error}>Please input a Deck name.</Text></View>
    }

    // If the selected Deck cannot be found we are notified 
    if (!selectedDeck) {
        return <View style= {styles.container}><Text style={styles.error}>Deck not found!</Text></View>
    }

return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{selectedDeck.name}</Text>
        </View>

      {/* FlatList with horizontal scrolling */}
        <FlatList
            key={selectedDeck.name}
            data={selectedDeck.flashcards}
            keyExtractor={(item, index) => index.toString()} 
                renderItem={({ item }) => (
                    <Flashcard answer={item.answer} question={item.question} />
        )}
            horizontal 
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToAlignment='start'
            snapToStart={true}
            snapToInterval={350}

        />
        <TouchableOpacity style={[styles.button, styles.correct]} onPress={handleCorrect}>
        <Ionicons name="thumbs-up-outline" size={30} color="green" />
        </TouchableOpacity>
        <View><Text style={styles.counter}>{correct} / {selectedDeck.flashcards.length || 0}</Text></View>
        <TouchableOpacity style={[styles.button, styles.incorrect]} onPress={handleIncorrect}>
         <Ionicons name='thumbs-down-outline' size={30} color={"red"}/>
        </TouchableOpacity>
    </View>
        );
}

const styles = StyleSheet.create({
container: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0, 
    },
titleContainer: {
    backgroundColor: "lavender",
    height: 120,
    width: 250,
    alignItems: "center",
    borderRadius: 15,
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 6, 
    elevation:5,
    
},
title: {
    fontSize: 40,
        fontWeight: 'bold',
        color: 'black',
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
    },

});
