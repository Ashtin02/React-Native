import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


const RegisterScreen = () => {
 const router = useRouter()
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');


 const handleRegister = async() => {
   try {
       if (username != '' && password != '') {
           await AsyncStorage.setItem("username", username)
           await AsyncStorage.setItem("password", password)
           Alert.alert('Success', 'Registered successfully!');
           router.push({pathname: "./dashboard"});
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
     <Button title="Register" background-color="light gray" onPress={handleRegister}/>
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
   width: '100%',
   height: 42,
   borderColor: 'black',
   borderWidth: 1,
   marginBottom: 12,
   paddingHorizontal: 12,
 }
});


export default RegisterScreen;