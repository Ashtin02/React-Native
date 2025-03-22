import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LoginScreen from "../app/login";

describe('LoginScreen', () => {
    it('renders correctly', () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen/>);
      expect(getByPlaceholderText('Username')).toBeDefined();
      expect(getByPlaceholderText('Password')).toBeDefined();
      expect(getByText('Login')).toBeDefined();
    });

    it('updates input values', () => {
        const { getByPlaceholderText } = render(<LoginScreen/>);
        const usernameInput = getByPlaceholderText('Username');
        const passwordInput = getByPlaceholderText('Password');
      });

})