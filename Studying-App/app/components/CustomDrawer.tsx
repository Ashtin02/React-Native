import { useAuth } from "../_authContext";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";


/**
 * This component is used to define the drawer that is found across the project, it also has additional
 * functionality to ensure that a user is logged in versus not to dynamically change the drawre components
 * @returns a custom drawer that is used to navigate across the project
 */
export default function CustomDrawer() {
  const { state, signOut } = useAuth();
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "space-between", backgroundColor: "lavender" }}>
      {/* Drawer Items */}
      <View>
        <TouchableOpacity onPress={() => router.push("/")} style={[styles.drawerItem, styles.drawerItemTop]}>
          <Text style={styles.drawerText}>Home</Text>
        </TouchableOpacity>

        
        <TouchableOpacity
          onPress={() => {
            if (state.userToken) {
              router.push("/dashboard"); // User is logged in
            } else {
              router.push("/"); // User is not logged in
            }
          }}
          style={styles.drawerItem}
        >
          <Text style={styles.drawerText}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={() => {
            if (state.userToken) {
              router.push("/settings"); // User is logged in
            } else {
              router.push("/"); // User is not logged in
            }
          }}
           style={[styles.drawerItem, styles.drawerItemBottom]}>
          <Text style={styles.drawerText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Drawer Item: Login/Logout */}
      <TouchableOpacity onPress={() => {
      
        if (state.userToken) {
          signOut()           // logs out the user using the defined function
          router.push("/"); 
        } else {
          router.push("/login");
        }
      }} style={styles.logoutItem}>
        <Text style={styles.logoutText}>{state.userToken ? "Log Out" : "Login"}</Text> 
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerItemTop: {
    borderTopWidth: 2,
    borderBottomWidth: 0,
  },
  drawerItem: {
    padding: 15,
    alignItems: "center",
    borderStyle: "solid",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    backgroundColor: "#CCCCFF",
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
    backgroundColor: "#CCCCFF",
    alignItems: "center",
    borderTopWidth: 2,
  },
  logoutText: {
    fontSize: 18,
  },
});
