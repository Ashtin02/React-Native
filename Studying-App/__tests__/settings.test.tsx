import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useFocusEffect } from "expo-router";
import Settings from "../app/settings";

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
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    const { getByText } = render(<Settings />);

    await waitFor(() => {
      expect(getByText(/Please Login in to change settings/i)).toBeTruthy();
    });

    const loginButton = getByText("Login");
    fireEvent.press(loginButton);
    expect(mockRouterPush).toHaveBeenCalledWith("/login");
  });

  it("loads and displays current username", async () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === "username") return Promise.resolve("testuser");
      if (key === "password") return Promise.resolve("password123");
    });

    const { getByText } = render(<Settings />);

    await waitFor(() => {
      expect(getByText("Current Username")).toBeTruthy();
      expect(getByText("testuser")).toBeTruthy();
    });
  });

  it("updates username successfully", async () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === "username") return Promise.resolve("olduser");
      if (key === "password") return Promise.resolve("password123");
    });

    const { getByText, getByPlaceholderText } = render(<Settings />);

    await waitFor(async () => {
      const usernameInput = getByPlaceholderText("Enter New Name");
      fireEvent.changeText(usernameInput, "newuser");

      const saveButton = getByText("Save Changes");
      fireEvent.press(saveButton);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith("username", "newuser");
      expect(Alert.alert).toHaveBeenCalledWith("Success", "Username updated!");
    });
  });

  it("updates password successfully with correct old password", async () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === "username") return Promise.resolve("testuser");
      if (key === "password") return Promise.resolve("oldpassword");
    });

    const { getByText, getByPlaceholderText } = render(<Settings />);

    await waitFor(async () => {
      const newPasswordInput = getByPlaceholderText("Enter New Password");
      fireEvent.changeText(newPasswordInput, "newpassword");

      const confirmPasswordInput = getByPlaceholderText("Re-enter new Password");
      fireEvent.changeText(confirmPasswordInput, "newpassword");

      const oldPasswordInput = getByPlaceholderText("Old Password");
      fireEvent.changeText(oldPasswordInput, "oldpassword");

      const saveButton = getByText("Save Changes");
      fireEvent.press(saveButton);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith("password", "newpassword");
      expect(Alert.alert).toHaveBeenCalledWith("Success", "Password updated successfully!");
    });
  });

  it("shows error when passwords don't match", async () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === "username") return Promise.resolve("testuser");
      if (key === "password") return Promise.resolve("oldpassword");
    });

    const { getByText, getByPlaceholderText } = render(<Settings />);

    await waitFor(async () => {
      const newPasswordInput = getByPlaceholderText("Enter New Password");
      fireEvent.changeText(newPasswordInput, "newpassword");

      const confirmPasswordInput = getByPlaceholderText("Re-enter new Password");
      fireEvent.changeText(confirmPasswordInput, "differentpassword");

      const oldPasswordInput = getByPlaceholderText("Old Password");
      fireEvent.changeText(oldPasswordInput, "oldpassword");

      const saveButton = getByText("Save Changes");
      fireEvent.press(saveButton);

      expect(Alert.alert).toHaveBeenCalledWith("Error", "New passwords do not match.");
      expect(AsyncStorage.setItem).not.toHaveBeenCalledWith("password", expect.anything());
    });
  });

  it("shows error when old password is incorrect", async () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === "username") return Promise.resolve("testuser");
      if (key === "password") return Promise.resolve("correctpassword");
    });

    const { getByText, getByPlaceholderText } = render(<Settings />);

    await waitFor(async () => {
      const newPasswordInput = getByPlaceholderText("Enter New Password");
      fireEvent.changeText(newPasswordInput, "newpassword");

      const confirmPasswordInput = getByPlaceholderText("Re-enter new Password");
      fireEvent.changeText(confirmPasswordInput, "newpassword");

      const oldPasswordInput = getByPlaceholderText("Old Password");
      fireEvent.changeText(oldPasswordInput, "wrongpassword");

      const saveButton = getByText("Save Changes");
      fireEvent.press(saveButton);

      expect(Alert.alert).toHaveBeenCalledWith("Error", "Old password is incorrect.");
      expect(AsyncStorage.setItem).not.toHaveBeenCalledWith("password", expect.anything());
    });
  });
});