import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import DashboardDecks from "./components/DashboardDecks";
import SearchBar from "./components/SearchBar";
import AddDeckButton from "./components/AddButton";
import deckData from "../decks.json"
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");

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
   * Retrieves all decks from asyncStorage and then update the decks state to most updated version
   */
  const getDecks = async () => {
    try {
      let keys = await AsyncStorage.getAllKeys(); //gets all the keys that are currently inside asyncStorage
      if (keys.length < 1) {
        return; // no decks are in storage
      }
      let deckEntries = await AsyncStorage.multiGet(keys); //gets all keys and connects them to their values K/V pair
      let parsedDecks = deckEntries.map(([name, flashcards]) => ({
        name,
        flashcards: flashcards ? JSON.parse(flashcards) :[],  // turns the "String" flashcards back into the objects they were before being stored
      }));

      setDecks(parsedDecks); //sets decks as all decks inside async storage 
      console.log("Decks Succesfully Loaded!")
    } catch (error) {
      console.error("Error Retrieving Decks: ", error);
    }
  }

/**
 * Reloads the decks dashboard each time app is loaded or updated
 */
  useEffect(() => {
    storePresetDecks()
    getDecks()
  }, [])


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
          }} onPress={() => router.push("/deck")} />
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
