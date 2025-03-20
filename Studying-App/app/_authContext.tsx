import React, { createContext, useContext, useEffect, useReducer, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthState = {
  isLoading: boolean;
  userToken: string | null;
};

type AuthContextType = {
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  state: AuthState;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    (prevState: AuthState, action: { type: string; token?: string }) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return { ...prevState, userToken: action.token || null, isLoading: false };
        case "SIGN_IN":
          return { ...prevState, userToken: action.token || null };
        case "SIGN_OUT":
          return { ...prevState, userToken: null };
        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      userToken: null,
    }
  );

  useEffect(() => {
    const loadAuthState = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      dispatch({ type: "RESTORE_TOKEN", token: userToken ?? undefined });
    };
    loadAuthState();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (token: string) => {
        await AsyncStorage.setItem("userToken", token);
        dispatch({ type: "SIGN_IN", token });
      },
      signOut: async () => {
        await AsyncStorage.removeItem("userToken");
        dispatch({ type: "SIGN_OUT" });
      },
      state,
    }),
    [state]
  );

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
