import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Flashcard from '@/app/components/flashcard';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Flashcard question='What is the best way to study?' answer='With flashcards!'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
