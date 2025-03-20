import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable} from 'react-native';
import { useRouter } from 'expo-router';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { useAuth } from './components/_authContext';


const LoginScreen = () => {
 const router = useRouter()
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const {signIn} = useAuth();


  const handleLogin = async () => {
    try {
      if (username != '' && password != '') {
          await AsyncStorage.setItem("username", username)
          await AsyncStorage.setItem("password", password)
          Alert.alert('Success', 'Login was successfully!');

          const authToken = "token";
          await AsyncStorage.setItem("userToken", authToken);
          signIn(authToken);

          router.push({pathname: "/dashboard"});
      }
      else {
          Alert.alert('Error', 'Input fields cannot be blank');
      }
  } catch (error) {
      console.error('Error saving credentials:', error);
  }
 };


 const handleRegister = () => {
   router.push({pathname: "/register"});
 };


 return (
   <View style={styles.container}>
     <Text style={styles.title}>Login</Text>
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
     <Button title="Sign In" background-color="light gray" onPress={handleLogin}/>
     <Text>Don't have an account?</Text>
     <Pressable onPress = {handleRegister}>
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
   width: '100%',
   height: 42,
   borderColor: 'black',
   borderWidth: 1,
   marginBottom: 12,
   paddingHorizontal: 12,
 },
 button: {
   color: "gray"
 },


 text: {
   color: 'black',
   textDecorationLine: 'underline'
 }
 });


export default LoginScreen;