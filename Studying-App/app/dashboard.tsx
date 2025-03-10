import { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import DashboardDecks from "./components/DashboardDecks";
import SearchBar from "./components/SearchBar";
import AddDeckButton from "./components/AddButton";
import deckData from "../decks.json"

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");



  // test deck data
  const [decks, setDecks] = useState(deckData);

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
        ListFooterComponent={<AddDeckButton onPress={() => router.push('/creation')} />}
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
