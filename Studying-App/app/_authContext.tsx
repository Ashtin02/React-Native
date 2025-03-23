import React, { createContext, useContext, useEffect, useReducer, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


// used to define AuthState
type AuthState = {
  isLoading: boolean;
  userToken: string | null;
};

// defines what the context will look like
type AuthContextType = {
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  state: AuthState;
};

// creates a context for the project
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Wraps auth context, and allows for state management for all its children
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    (prevState: AuthState, action: { type: string; token?: string }) => {
      switch (action.type) {
        case "RESTORE_TOKEN":     // restores the most recent token (whether a user is signed in or out)
          return { ...prevState, userToken: action.token || null, isLoading: false };
        case "SIGN_IN":
          return { ...prevState, userToken: action.token || null }; // signs in a user, providing an authentication token
        case "SIGN_OUT":
          return { ...prevState, userToken: null }; // signs out a user, clearing the authentcion token
        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      userToken: null,
    }
  );

  // runs on app start to automatically check if a user was previously logged in our out
  useEffect(() => {
    const loadAuthState = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      dispatch({ type: "RESTORE_TOKEN", token: userToken ?? undefined });
    };
    loadAuthState();
  }, []);


  // prevents a new object from being  created on every rerender, preventing any possible errors from useEffect 
  // or useFocusEffect
  const authContext = useMemo(
    () => ({
      // signs in a user
      signIn: async (token: string) => {
        await AsyncStorage.setItem("userToken", token);
        dispatch({ type: "SIGN_IN", token });
      },
      //signs out a user
      signOut: async () => {
        await AsyncStorage.removeItem("userToken");
        dispatch({ type: "SIGN_OUT" });
      },
      state,
    }),
    [state]
  );

  // provides project with access to authContext across the project
  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
