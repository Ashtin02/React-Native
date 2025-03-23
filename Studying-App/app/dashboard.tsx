import { useCallback, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import DashboardDecks from "./components/DashboardDecks";
import SearchBar from "./components/SearchBar";
import AddDeckButton from "./components/AddButton";
import deckData from "../decks.json"
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Dashboard() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  
  /**
   * 
   * @param name name of deck that will be deleted
   * 
   * Deletes the deck from async storage with the given key
   * then reloads the decks after deletion for UI
   */
  const deleteDeck = async (name: string) => {
    try {
      await AsyncStorage.removeItem(name);
      getDecks();
    } catch (error) {
      console.error('Error deleting the deck: ', error);
    }
  };

  /**
   * Helper function to clear all of async storage if needed
   */
  const deleteStorage = async () => {
    try {
      let keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      getDecks();
    } catch (error) {
      console.error('Error deleting the deck: ', error);
    }
  };

  /**
   * Stores the three preset decks from JSON file into async storage
   */
  const storePresetDecks = async () => {
    try {
      for (let deck of deckData) {
        await AsyncStorage.setItem(deck.name,JSON.stringify(deck.flashcards) ) // takes each item in the deckData array and sets name as key and flashcards as value
      }
      console.log("Decks Stored Successfully!")
    } catch (error) {
      console.error("Error Storing Decks: ", error)
    }
  }

  /**
   * Retrieves all decks from asyncStorage and filters out any non-deck items (username, password), parses them and updates the deck state
   */
  const getDecks = async () => {
    try {
      let keys = await AsyncStorage.getAllKeys(); //gets all the keys that are currently inside asyncStorage
      if (keys.length < 1) {
        return; // no decks are in storage
      }
      let deckEntries = await AsyncStorage.multiGet(keys); //gets all keys and connects them to their values K/V pair
      deckEntries = deckEntries.filter((keys) => keys[0] !== "username" && keys[0] !== "password" && keys[0] !== "userToken")
      let parsedDecks = deckEntries.map(([name, flashcards]) => ({
        name,
        flashcards: flashcards ? JSON.parse(flashcards) :[],  // turns the "String" flashcards back into the objects they were before being stored
      }));
      setDecks(parsedDecks); //Updates the state with decks retrieved from AsyncStorage
      console.log("Decks Succesfully Loaded!")
    } catch (error) {
      console.error("Error Retrieving Decks: ", error);
    }
  }

/**
 * Reloads the decks dashboard each time app is loaded or updated
 */
  useFocusEffect(
    useCallback(() => {
      storePresetDecks(); 
      getDecks(); 

    }, []) 
  );

  // deck state
  const [decks, setDecks] = useState([] as { name: string; flashcards: { question: string; answer: string }[] }[]);

  // searching
  const filteredDecks = decks.filter((deck) => deck.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={styles.container}>
      <SearchBar search={search} setSearch={setSearch} />

      {/* List of Decks */}
      <FlatList
        data={filteredDecks}
        keyExtractor={(deck) => deck.name}
        renderItem={({ item }) => (
          <DashboardDecks
            deck={{
              name: item.name,
              cards:item.flashcards.length
            }} onPress={() => router.push("/deck")}
            deleteDeck={deleteDeck}/>
        )}
        ListFooterComponent={<AddDeckButton onPress={() => router.push('/createDeck')} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
});