import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";

/**
 * This component helps to list the decks in an organized fashion for the dashboard page
 * @param param0 object of the deck name, and the amount of cards it has
 */
export default function DashboardDecks({ deck, deleteDeck }: { deck: { name: string; cards: number }; onPress: () => void; deleteDeck: (name: string) => void;  }) {
  const router = useRouter();

  

  return (
    <TouchableOpacity
      style={styles.deckCard}
      onPress={() => router.push({ pathname: "/deck", params: { name: deck.name } })} // Pass deck title
    >
      <Text style={styles.deckTitle}>{deck.name}</Text>
      <Text style={styles.deckInfo}>{deck.cards} cards</Text>
      <TouchableOpacity style={styles.delete} onPress={() => deleteDeck(deck.name) }><Icon name="delete" size={30} color="black" /></TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deckCard: {
    padding: 100,
    backgroundColor: "lavender",
    borderRadius: 10,
    marginBottom: 50,
    marginTop: 10,
    elevation: 2,
  },
  deckTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  deckInfo: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  delete: {
    position: "absolute",
    top: 200,
    right: 0,
    padding: 5,
    zIndex: 1, 
  },
});
