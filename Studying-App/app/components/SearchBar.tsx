import { TextInput, StyleSheet } from "react-native";

export default function SearchBar({ search, setSearch }:
     { search: string; setSearch: (text: string) => void }) {
  return (
    <TextInput
      style={styles.searchBar}
      placeholder="Search decks..."
      value={search}
      onChangeText={setSearch}
    />
  );
}

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
