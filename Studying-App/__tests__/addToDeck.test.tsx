import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import DeckCreation from '../app/addToDeck';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

// mock async storage
jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(() => Promise.resolve()),
    getItem: jest.fn(() => Promise.resolve(null)),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
}));

// mock expo router, and add some mock existing flashcards
jest.mock('expo-router', () => ({
    useRouter: jest.fn(() => ({
        replace: jest.fn(),
        push: jest.fn(),
    })),
    useLocalSearchParams: jest.fn(() => ({
        deckName: 'Test Deck',
        existingFlashcards: JSON.stringify([{ question: 'TestQuestion 1', answer: 'TestAnswer 1' }]),
    })),
    useFocusEffect: jest.fn(),
}));

describe('AddFlashcard Component', () => {
    let mockRouterReplace: jest.Mock;
    let mockRouterPush: jest.Mock;

    beforeEach(async () => {
        mockRouterReplace = jest.fn();
        mockRouterPush = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({
            replace: mockRouterReplace,
            push: mockRouterPush,
        });

        jest.clearAllMocks();
        await AsyncStorage.clear();
    });

    test('renders deck name correctly', async () => {
        const { findByText } = render(<DeckCreation />);
        expect(await findByText('Test Deck')).toBeTruthy();
    });

    test('clicking "Finish" button saves flashcards and routes to dashboard', async () => {
        const { findByText } = render(<DeckCreation />);
        const finishButton = await findByText('Finish'); 

        fireEvent.press(finishButton);

        await waitFor(async () => {
            expect(AsyncStorage.setItem).toHaveBeenCalledWith(
                'Test Deck',
                JSON.stringify([{ question: 'TestQuestion 1', answer: 'TestAnswer 1' }])
            );
            expect(mockRouterReplace).toHaveBeenCalledWith('/dashboard');
        });
    });

    test('clicking "Add Flashcard" button routes to add flashcard screen', async () => {
        const { findByText } = render(<DeckCreation />);
        const addFlashcardButton = await findByText('+'); 

        fireEvent.press(addFlashcardButton);

        await waitFor(() => {
            expect(mockRouterPush).toHaveBeenCalledWith({
                pathname: '/addFlashcard',
                params: { deckName: 'Test Deck', flashcards: JSON.stringify([{ question: 'TestQuestion 1', answer: 'TestAnswer 1' }]) },
            });
        });
    });

    test('renders flashcards correctly', async () => {
        const { findByText } = render(<DeckCreation />);
        expect(await findByText('TestQuestion 1')).toBeTruthy(); 
        expect(await findByText('TestAnswer 1')).toBeTruthy();
    });

    test('shows "Add some flashcards!" when no flashcards exist', async () => {
        (jest.requireMock('expo-router').useLocalSearchParams as jest.Mock).mockReturnValue({
            deckName: 'Test Deck',
            existingFlashcards: '',
        });

        const { findByText } = render(<DeckCreation />);
        expect(await findByText('Add some flashcards!')).toBeTruthy(); 
    });
});
