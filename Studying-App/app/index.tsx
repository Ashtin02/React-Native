import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Flashcard from '@/app/components/flashcard';
import { useAuth } from "./_authContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function Home() {
  const { state } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");

/**
 * fetches username from async storage and sets as username state to welcome the user
 */
  useEffect(() => {
    const fetchUsername = async () => {
      const storedUsername = await AsyncStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    };
    fetchUsername();
  }, []);

  // If there is a user signed in display this page 
  if (state.userToken) {
    
    return (
      <View style={styles.container}>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome to FlipFocus!</Text>
          <Text style={styles.subHeading}>Learn interactively with flashcards!</Text>
          <Text style={styles.welcomeText}>Welcome {username}!</Text>
        </View>

        <View style={styles.flashcardContainer}>
          <Flashcard question='What is the best way to study?' answer='With flashcards!' />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/dashboard")}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => router.push("/help")}>
            <Text style={styles.footerText}>need help?</Text>
          </TouchableOpacity>
        </View>

      </View>
    );

    // If user is not signed in display this page
  } else {

    return (
      <View style={styles.container}>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome to FlipFocus!</Text>
          <Text style={styles.subHeading}>Learn interactively with flashcards!</Text>
        </View>

        <View style={styles.flashcardContainer}>
          <Flashcard question='What is the best way to study?' answer='With flashcards!' />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/login")}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => router.push("/help")}>
            <Text style={styles.footerText}>need help?</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom:20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  subHeading: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
  }, 
  footer: {
    position: 'absolute',
    bottom: 10,
  },
  footerText: {
    fontSize: 12,
    color: '#4a90e2',
    textDecorationLine: 'underline',
  },
  flashcardContainer: {
    flex: 2,
    justifyContent: "center",
    elevation:5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom:20,
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation:5,
  },
  welcomeText: {
    fontSize: 20,
    color: '#333',
    marginTop: 20,
  },
  
});
