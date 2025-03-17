import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings: React.FC = () => {
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  useEffect(() => {
    // Load the stored username from AsyncStorage
    const loadUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        if (storedUsername) {
          setCurrentUsername(storedUsername);
        }
      } catch (error) {
        console.error("Failed to load username:", error);
      }
    };

    loadUsername();
  }, []);

  const handleSaveChanges = async () => {
    if (username.trim() !== "") {
      try {
        await AsyncStorage.setItem("username", username);
        setCurrentUsername(username);
      } catch (error) {
        console.error("Failed to save username:", error);
      }
    }
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0e5f5",
    paddingTop: 50,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  box: {
    backgroundColor: "#E5D9EC",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
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
});

export default Settings;
