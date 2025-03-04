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
  const [decks, setDecks] = useState([
    { id: "1", title: "ENGL 101", cards: 10 },
    { id: "2", title: "BIOL 143", cards: 15 },
    { id: "3", title: "CHEM 120", cards: 8 },
  ]);

  // searching
  const filteredDecks = decks.filter((deck) => deck.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={styles.container}>
      <SearchBar search={search} setSearch={setSearch} />

      {/* List of Decks */}
      <FlatList
        data={filteredDecks}
        keyExtractor={(deck) => deck.id}
        renderItem={({ item }) => (
          <DashboardDecks deck={item} onPress={() => router.push("/deck")} />
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
