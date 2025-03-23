import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import LoginScreen from "../app/login";

describe('LoginScreen', () => {
    it('renders correctly', () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen/>);
      expect(getByPlaceholderText('Username')).toBeDefined();
      expect(getByPlaceholderText('Password')).toBeDefined();
      expect(getByText('Sign In')).toBeDefined();
    });

    it('updates input values', () => {
        const { getByPlaceholderText } = render(<LoginScreen/>);
        const usernameInput = getByPlaceholderText('Username');
        const passwordInput = getByPlaceholderText('Password');

        fireEvent.changeText(usernameInput, 'perave');
        fireEvent.changeText(passwordInput, 'sonitaraba15');

        expect(usernameInput.props.value).toBe('perave');
        expect(passwordInput.props.value).toBe('sonitaraba15');
    });

    it('calls login function on button press', async () => {
      const { getByText, getByPlaceholderText } = render(<LoginScreen />);
      const usernameInput = getByPlaceholderText('Username');
      const passwordInput = getByPlaceholderText('Password');
      const loginButton = getByText('Sign In');

      fireEvent.changeText(usernameInput, 'perave');
      fireEvent.changeText(passwordInput, 'sonitaraba15');
      fireEvent.press(loginButton);

      await waitFor(() => {
        expect(LoginScreen).toHaveBeenCalledWith('perave', 'sonitaraba15');
      });
    });

    it('displays error message on failed login', async ()  => {
      const LoginScreen = jest.fn()
      LoginScreen.mockImplementationOnce(() => Promise.reject(new Error('Invalid credentials')));
      const { getByText, getByPlaceholderText, findByText } = render(<LoginScreen />);
      const usernameInput = getByPlaceholderText('Username');
      const passwordInput = getByPlaceholderText('Password');
      const loginButton = getByText('Login');

      fireEvent.changeText(usernameInput, 'wronguser');
      fireEvent.changeText(passwordInput, 'wrongpassword');
      fireEvent.press(loginButton);

      const errorMessage = await findByText('Invalid credentials');
      expect(errorMessage).toBeDefined();
    });



})