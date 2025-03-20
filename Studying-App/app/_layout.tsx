import { Drawer } from "expo-router/drawer";
import { AuthProvider, useAuth } from "./_authContext";
import CustomDrawer from "./components/CustomDrawer";

export default function Layout() {
  return (
    <AuthProvider>
      <Drawer
        drawerContent={() => <CustomDrawer />}
        screenOptions={{
          headerStyle: {
            backgroundColor: "#D9D9D9",
          },
        }} 
      >
        <Drawer.Screen name="index" options={{ title: "Home" }} />
        <Drawer.Screen name="dashboard" options={{ title: "Dashboard" }} />
        <Drawer.Screen name="settings" options={{ title: "Settings" }} />
        <Drawer.Screen name="login" options={{ title: "Login" }} />
        <Drawer.Screen name = "addFlashcard" options={{title: "Add a new Flashcard"}}/>
        <Drawer.Screen name = "createDeck" options={{title: "Create a New Deck"}}/>
        <Drawer.Screen name = "addToDeck" options={{title: "Add to Deck"}}/>
      </Drawer>
    </AuthProvider>
  );
}
