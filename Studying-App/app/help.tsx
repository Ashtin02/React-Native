import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const Help: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Help & FAQ</Text>

      <View style={styles.box}>
        <Text style={styles.question}>Q: How do I change my username?</Text>
        <Text style={styles.answer}>You would need to go to the settings and enter new desired Username.</Text>

        <Text style={styles.question}>Q: How do I change my password?</Text>
        <Text style={styles.answer}>In the settings page, you need to enter and confirm the new password, then enter your current password</Text>

        <Text style={styles.question}>Q: Can I keep track of how many flashcards I got correct?</Text>
        <Text style={styles.answer}>There is a thumbs up and thumbs down button that will add to your score.</Text>

        <Text style={styles.question}>Deck Creation:</Text>
        <Text style={styles.answer}>To create a new deck, you would need to go to 
            the dashboard and press the "+" button. That will take you a page to 
            ask what the name of the deck will be. </Text>

        <Text style={styles.question}>Card Creation</Text>
        <Text style={styles.answer}>After naming your deck, you can add a flashcard 
            and then that flashcard's answer on the back. Once completed you will be 
            shown one flashcard thats now in your new deck, you can add more flashcards 
            with the "+" button</Text>
            
        <Text style={styles.answer}>Once you finished adding your flashcards all you would need to do is press finish and then you can start using your new deck</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#CCCCFF",
    paddingVertical: 20,
  },
  box: {
    backgroundColor: "lavender",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  answer: {
    fontSize: 16,
    marginTop: 5,
    color: "#555",
  },
});

export default Help;
