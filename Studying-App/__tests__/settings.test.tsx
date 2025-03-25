import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useFocusEffect } from "expo-router";
import Settings from "../app/settings";

// Mock dependencies for testing
jest.mock("@react-native-async-storage/async-storage", () => ({ 
  setItem: jest.fn(),
  getItem: jest.fn(),
  clear: jest.fn(() => Promise.resolve()),
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
  useFocusEffect: jest.fn((cb) => cb()), 
}));

jest.mock("react-native/Libraries/Alert/Alert", () => ({
  alert: jest.fn(),
}));
useFocusEffect;

describe("Settings Component", () => {
  const mockRouterPush = jest.fn();
  const Alert = require("react-native/Libraries/Alert/Alert");

  beforeEach(async () => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    Alert.alert.mockClear();
    await AsyncStorage.clear();
  });

  it("renders login prompt when no user data exists", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const { getByText } = render(<Settings />);

    await waitFor(() => {
      expect(getByText(/Please Login in to change settings/i)).toBeTruthy();
      const loginButton = getByText("Login");
      fireEvent.press(loginButton);
      expect(mockRouterPush).toHaveBeenCalledWith("/login");
    });
  });

  it("loads and displays current username", async () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => 
      key === "username" ? "testuser" : "password123"
    );

    const { getByText } = render(<Settings />);

    await waitFor(() => {
      expect(getByText("Current Username")).toBeTruthy();
      expect(getByText("testuser")).toBeTruthy();
    });
  });

  it("updates username successfully", async () => {
    (AsyncStorage.getItem as jest.Mock)
      .mockResolvedValueOnce("olduser") // First call for username
      .mockResolvedValueOnce("password123"); // Second call for password

    const { getByText, getByPlaceholderText } = render(<Settings />);

    await waitFor(() => {
      fireEvent.changeText(
        getByPlaceholderText("Enter New Name"),
        "newuser"
      );
      fireEvent.press(getByText("Save Changes"));

      expect(AsyncStorage.setItem).toHaveBeenCalledWith("username", "newuser");
      expect(Alert.alert).toHaveBeenCalledWith("Success", "Username updated!");
    });
  });

  it("updates password successfully with correct old password", async () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === "username") return Promise.resolve("testuser");
      if (key === "password") return Promise.resolve("oldpassword");
      return Promise.resolve(null);
    });
  
    const { getByText, getByPlaceholderText } = render(<Settings />);
  
    await waitFor(() => {
      expect(getByText("Current Username")).toBeTruthy();
    });

    fireEvent.changeText(
      getByPlaceholderText("Enter New Password"),
      "newpassword"
    );
    fireEvent.changeText(
      getByPlaceholderText("Re-enter new Password"), 
      "newpassword"
    );
    fireEvent.changeText(
      getByPlaceholderText("Old Password"),
      "oldpassword"
    );
  
    fireEvent.press(getByText("Save Changes"));
  
    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "password",
        "newpassword"
      );
      expect(Alert.alert).toHaveBeenCalledWith(
        "Success",
        "Password updated successfully!"
      );
    });
  });

  it("shows error when passwords don't match", async () => {
    (AsyncStorage.getItem as jest.Mock)
      .mockResolvedValueOnce("testuser")
      .mockResolvedValueOnce("oldpassword");

    const { getByText, getByPlaceholderText } = render(<Settings />);

    await waitFor(() => {
      fireEvent.changeText(
        getByPlaceholderText("Enter New Password"),
        "newpassword"
      );
      fireEvent.changeText(
        getByPlaceholderText("Re-enter new Password"),
        "differentpassword"
      );
      fireEvent.press(getByText("Save Changes"));

      expect(Alert.alert).toHaveBeenCalledWith(
        "Error", 
        "New passwords do not match."
      );
    });
  });

  it("shows error when old password is incorrect", async () => {
    (AsyncStorage.getItem as jest.Mock)
      .mockResolvedValueOnce("testuser")
      .mockResolvedValueOnce("correctpassword");

    const { getByText, getByPlaceholderText } = render(<Settings />);

    await waitFor(() => {
      fireEvent.changeText(
        getByPlaceholderText("Enter New Password"),
        "newpassword"
      );
      fireEvent.changeText(
        getByPlaceholderText("Re-enter new Password"),
        "newpassword"
      );
      fireEvent.changeText(
        getByPlaceholderText("Old Password"),
        "wrongpassword"
      );
      fireEvent.press(getByText("Save Changes"));

      expect(Alert.alert).toHaveBeenCalledWith(
        "Error", 
        "Old password is incorrect."
      );
    });
  });
});