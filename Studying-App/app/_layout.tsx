import { Drawer } from "expo-router/drawer";
import { AuthProvider, useAuth } from "./components/_authContext";
import CustomDrawer from "./components/CustomDrawer";

export default function Layout() {
  return (
    <AuthProvider>
      <Drawer drawerContent={() => <CustomDrawer />}> 
        <Drawer.Screen name="index" options={{ title: "Home" }} />
        <Drawer.Screen name="dashboard" options={{ title: "Dashboard" }} />
        <Drawer.Screen name="settings" options={{ title: "Settings" }} />
        <Drawer.Screen name="login" options={{ title: "Sign In"}} />
      </Drawer>
    </AuthProvider>
  );
}