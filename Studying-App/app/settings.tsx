import React, { useState, useCallback } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, Alert 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";

const Settings: React.FC = () => {
  const router = useRouter();
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);
  const [storedPassword, setStoredPassword] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  // Function to load user data from AsyncStorage
  const loadUserData = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem("username");
      const storedPassword = await AsyncStorage.getItem("password");

      console.log("Retrieved Username:", storedUsername);
      console.log("Retrieved Password:", storedPassword);

      setCurrentUsername(storedUsername);
      setStoredPassword(storedPassword);
    } catch (error) {
      console.error("Failed to load user data:", error);
    }
  };

  // Reload data every time the screen is reloaded
  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [])
  );

  // If no username and password, route to login page button
  if (!currentUsername && !storedPassword) {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.header}>Please Login in to change settings</Text>
          <TouchableOpacity 
            style={[styles.button, styles.loginButton]} 
            onPress={() => router.push("/login")}
          >
            <Text style={[styles.buttonText, { color: "black" }]}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }


  const handleSaveChanges = async () => {
    try {
      // Changing username
      if (username.trim() !== "") {
        await AsyncStorage.setItem("username", username);
        setCurrentUsername(username);
        Alert.alert("Success", "Username updated!");
      }
      // Password changes checks
      if (newPassword && confirmPassword) {
        if (newPassword !== confirmPassword) {
          Alert.alert("Error", "New passwords do not match.");
          return;
        }

        if (storedPassword && oldPassword !== storedPassword) {
          Alert.alert("Error", "Old password is incorrect.");
          return;
        }

        // Changed password
        await AsyncStorage.setItem("password", newPassword);
        setStoredPassword(newPassword);
        Alert.alert("Success", "Password updated successfully!");
      }
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
  };

  // For testing purposes only (Clears data)
  const handleClearStorage = async () => {
    Alert.alert(
      "Clear Storage",
      "Are you sure you want to delete all app data? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              setCurrentUsername(null);
              setUsername("");
              setNewPassword("");
              setConfirmPassword("");
              setOldPassword("");
              setStoredPassword(null);
              Alert.alert("Success", "Local storage cleared successfully!");
            } catch (error) {
              console.error("Failed to clear storage:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.box}>
        <Text style={styles.label}>Current Username</Text>
        <Text style={styles.currentUsername}>{currentUsername || "No username set"}</Text>

        <Text style={styles.label}>Change Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter New Name"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>Change Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <Text style={styles.label}>Confirm New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-enter new Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Text style={styles.label}>Enter Old Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Old Password"
          secureTextEntry
          value={oldPassword}
          onChangeText={setOldPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={handleClearStorage}>
          <Text style={[styles.buttonText, { color: "red" }]}>Clear Storage</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0e5f5",
    justifyContent: "center",
  },
  box: {
    backgroundColor: "#E5D9EC",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
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
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  currentUsername: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  button: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",

  },
  loginButton: {
    marginTop: 20,
    borderWidth: 3,
    borderColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  clearButton: {
    borderColor: "red",
    marginTop: 10,
  },
  
});

export default Settings;
