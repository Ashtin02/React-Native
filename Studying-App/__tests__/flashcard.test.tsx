import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Flashcard from "../app/components/flashcard";

test("renders question side off initilization", () => {
    const { getByText } = render(<Flashcard question="Question" answer="Answer" />)
    
    expect(getByText("Question")).toBeTruthy();
});

test("card flips when pressed", async () => {
    const { getByText } = render(
    <Flashcard question="Question" answer="Answer" />
    );

    expect(getByText("Question")).toBeTruthy();

    fireEvent.press(getByText("Question"))

    // After the flip, ensure answer is visible
    expect(getByText("Answer")).toBeTruthy();
});