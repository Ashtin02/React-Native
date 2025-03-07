import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function AddDeckButton({ onPress }: { onPress: () => void }) {
  return (
    <View style={styles.addButtonContainer}>
      <TouchableOpacity style={styles.addButton} onPress={onPress}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  addButtonContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
  },
  addButton: {
    width: 60,
    height: 60,
    backgroundColor: "#E5D9EC",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  addButtonText: {
    fontSize: 24,
  },
});
