import {DrawerContentComponentProps,} from "@react-navigation/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { useRouter } from "expo-router";
import  AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect  } from "react";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}
       screenOptions = {{
        headerStyle: {
          backgroundColor: '#D9D9D9',
        },
      }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "Index",
          }}
        />
        <Drawer.Screen
          name="dashboard"
          options={{
            drawerLabel: "Dashboard",
            title: "Dashboard",
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            title: "Settings",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user data in AsyncStorage
  useEffect(() => {
    const checkLoginStatus = async () => {
      const username = await AsyncStorage.getItem("username");
      const password = await AsyncStorage.getItem("password");
      setIsLoggedIn(username !== null && password !== null);
    };

    checkLoginStatus();
  }, []);

  // Handle logout 
  const handleLogout = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
    router.push("/login"); 
  };

  return (
    <View style={{ flex: 1, justifyContent: "space-between", backgroundColor: '#F3EDF7' }}>
      {/*  Drawer Items */}
      <View>
        <TouchableOpacity onPress={() => router.push("/")} style={[styles.drawerItem, styles.drawerItemTop]}>
          <Text style={styles.drawerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/dashboard")} style={styles.drawerItem}>
          <Text style={styles.drawerText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/settings")} style={[styles.drawerItem, styles.drawerItemBottom]}>
          <Text style={styles.drawerText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/*  Bottom Drawer Item */}
      <TouchableOpacity onPress={isLoggedIn ? handleLogout : () => router.push("/login")} style={styles.logoutItem}>
        <Text style={styles.logoutText}>{isLoggedIn ? "Log Out" : "Login"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles =  StyleSheet.create({
  drawerItemTop: {
    borderTopWidth: 2,
    borderBottomWidth: 0,
  },
  drawerItem: {
    padding: 15,
    alignItems: "center",
    borderStyle: 'solid',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    backgroundColor: "#E5D9EC"
  },
  drawerItemBottom: {
    borderTopWidth: 0,
    borderBottomWidth: 2,
  },
  drawerText: {
    fontSize: 18,
  },
  logoutItem: {
    padding: 16,
    backgroundColor: "#E5D9EC",
    alignItems: "center",
    borderTopWidth: 2,
  },
  logoutText: {
    fontSize: 18,
  },
});
