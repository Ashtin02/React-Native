import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

/**
 * This component helps to list the decks in an organized fashion for the dashboard page
 * @param param0 object of the deck name, and the amount of cards it has
 */
export default function DashboardDecks({ deck, onPress }: { deck: { name: string; cards:number }; onPress: ()=> void  }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.deckCard}
      onPress={() => router.push({ pathname: "/deck", params: { name: deck.name } })} // Pass deck title
    >
      <Text style={styles.deckTitle}>{deck.name}</Text>
      <Text style={styles.deckInfo}>{deck.cards} cards</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deckCard: {
    padding: 100,
    backgroundColor: "#E5D9EC",
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
});
