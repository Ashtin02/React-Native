import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function DashboardDecks({ deck, onPress }: { deck: { id: string; title: string; cards: number }; onPress: ()=> void  }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.deckCard}
      onPress={() => router.push({ pathname: "/deck", params: { name: deck.title } })} // Pass deck ID
    >
      <Text style={styles.deckTitle}>{deck.title}</Text>
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
