import {DrawerContentComponentProps,} from "@react-navigation/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

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
      <TouchableOpacity onPress={() => router.push("/logout")} style={styles.logoutItem}>
        <Text style={styles.logoutText}>Logout</Text>
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
