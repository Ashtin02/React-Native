import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Displays register screen.
 * If username and password fields are not blank saves user credentials in async storage and redirects user to dashboard.
 * Otherwise, outputs error message on console. 
 * Catches error if user credentials couldn't be saved.
 * @returns register screen
 */
const RegisterScreen = () => {
 const router = useRouter()
 /**
 * Fields username and password are initially blank.
 * Sets username and password fields to values that the user inputed.
 */
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');


 const handleRegister = async() => {
   try {
       if (username != '' && password != '') {
           await AsyncStorage.setItem("username", username)
           await AsyncStorage.setItem("password", password)
           Alert.alert('Success', 'Registered successfully!');
           router.push({pathname: "/dashboard"});
       }
       else {
           Alert.alert('Error', 'Input fields cannot be blank');
       }
   } catch (error) {
       console.error('Error saving credentials:', error);
   }
  
 };


 return (
   <View style={styles.container}>
     <Text style={styles.title}>Register</Text>
     <Text style={styles.label}>Username</Text>
     <TextInput
       style={styles.input}
       placeholder="Username"
       value={username}
       onChangeText={setUsername}
     />
     <Text style={styles.label}>Password</Text>
     <TextInput
       style={styles.input}
       placeholder="Password"
       secureTextEntry
       value={password}
       onChangeText={setPassword}
     />
      <TouchableOpacity style = {styles.button} onPress={handleRegister}>
        <Text style = {styles.buttonText}> Register </Text>
      </TouchableOpacity>
   </View>
 );
};


const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   padding: 20,
 },
 title: {
   fontSize: 25,
   marginBottom: 22,
   fontWeight: 'bold'
 },
 label: {
   color: 'black',
 },
 input: {
   width: '25%',
   height: 42,
   borderColor: 'black',
   borderWidth: 1,
   borderRadius: 8,
   marginBottom: 12,
   paddingHorizontal: 12,
   
 },
 button: {
    width: 100, 
    height: 25, 
    backgroundColor: `rgb(238, 238, 238)`,
    borderWidth: 1,
    borderColor: 'black'
 },
 buttonText: {
    color: 'black', 
    fontSize: 15, 
    textAlign: 'center'
  },
});

export default RegisterScreen;