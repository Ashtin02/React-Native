import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable, TouchableOpacity} from 'react-native';
import { useRouter } from 'expo-router';


const LoginScreen = () => {
 const router = useRouter()
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');


 const handleLogin = () => {
   if (username === 'user' && password === 'password') {
     Alert.alert('Success', 'Logged in successfully!');
     router.push({pathname: "/dashboard"});
   } 
   else {
     Alert.alert('Error', 'Invalid credentials');
     return;
   }
 };


 const navigateToRegisterPage = () => {
   router.push({pathname: "/register"});
 };


 return (
   <View style={styles.container}>
     <Text style={styles.title}>Sign In</Text>
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
     <TouchableOpacity style = {styles.button} onPress={handleLogin}>
        <Text style = {styles.buttonText}> Sign In </Text>
     </TouchableOpacity>
     <Text>Don't have an account?</Text>
     <Pressable onPress = {navigateToRegisterPage}>
        <Text style = {styles.text}>Register</Text>
     </Pressable>
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
   marginBottom: 12,
   paddingHorizontal: 12,
 },
 button: {
    width: 100, 
    height: 25, 
    backgroundColor: `rgb(238, 238, 238)`,
    borderWidth: 1,
    borderColor:'black'
 },
 buttonText: {
    color: 'black', 
    fontSize: 15, 
    textAlign: 'center'
  },
 text: {
   color: 'black',
   textDecorationLine: 'underline'
 }
 });


export default LoginScreen;