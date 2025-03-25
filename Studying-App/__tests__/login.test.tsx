import React from "react";
import {render, fireEvent} from "@testing-library/react-native";
import LoginScreen from "../app/login";


describe('LoginScreen', () => {
 it('renders all elements correctly', () => {
   const { getByPlaceholderText, getByTestId } = render(<LoginScreen/>);
   expect(getByPlaceholderText('Username')).toBeTruthy();
   expect(getByPlaceholderText('Password')).toBeTruthy();
   expect(getByTestId('login')).toBeTruthy();
 });


 it('updates username and password on input change and tests login functionality', () => {
   const {getByPlaceholderText, getByTestId} = render(<LoginScreen/>);
   const usernameInput = getByPlaceholderText("Username");
   const passwordInput = getByPlaceholderText("Password");
   fireEvent.changeText(usernameInput, "peravestar");
   fireEvent.changeText(passwordInput, 'sonitaraba#24');
   expect(usernameInput.props.value).toBe("peravestar");
   expect(passwordInput.props.value).toBe("sonitaraba#24");
   const loginButton = getByTestId('login');
   fireEvent.press(loginButton);
 });
});
