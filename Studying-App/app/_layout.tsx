import { Drawer } from "expo-router/drawer";
import { AuthProvider, useAuth } from "./authContext";
import CustomDrawer from "./components/CustomDrawer";

export default function Layout() {
  return (
    <AuthProvider>
      <Drawer drawerContent={() => <CustomDrawer />}> 
        <Drawer.Screen name="index" options={{ title: "Home" }} />
        <Drawer.Screen name="dashboard" options={{ title: "Dashboard" }} />
        <Drawer.Screen name="settings" options={{ title: "Settings" }} />
        <Drawer.Screen name="login" options={{ title: "Sign In", headerShown: true }} />
      </Drawer>
    </AuthProvider>
  );
}