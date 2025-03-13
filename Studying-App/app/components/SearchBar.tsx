import { TextInput, StyleSheet } from "react-native";

/**
 * Component to support a search functionality, relies on a state (passed in as props) found within the implementing file
 * @param param0 pass in the search states that this component relies on and is watching for changes
 */
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
