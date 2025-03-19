import { transform } from '@babel/core';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';

interface FlashcardProps {
    question: string;
    answer: string
}

export default function Flashcard({ question, answer }: FlashcardProps) {
    const [flipped, setFlipped] = useState(false);
    const animation = useRef(new Animated.Value(0)).current

    const frontInterpolate = animation.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg']
        
    });

    const backInterpolate = animation.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg']
        
    });

    const flipCard = () => {
        Animated.spring(animation, {
            toValue: flipped ? 0 : 180,
            friction: 8, 
            tension: 8, 
            useNativeDriver: true,
        }).start()
    setFlipped(!flipped);
};


return (
    <View style={styles.container}>
    <TouchableOpacity testID="button" onPress={flipCard}>
        <View style={styles.cardContainer}>
                {/* Front Side */}
                <Animated.View style={[styles.flashcard, { transform: [{ rotateY : frontInterpolate}]}]}>
                    <Text style={styles.cardText}>{question}</Text>
                </Animated.View>

                {/* Back Side */}
                <Animated.View style={[styles.flashcard, { transform: [{ rotateY : backInterpolate}]}]}>
                    <Text style={[styles.cardText]}>{answer}</Text>
                </Animated.View>
        </View>
    </TouchableOpacity>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        width: 300, // Ensures the card has dimensions
        height: 200,
        marginRight: 25,
        marginLeft:25,
    },
    flashcard: {
        width: 300,
        height: 200,
        borderRadius: 12,
        backgroundColor: 'lavender',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backfaceVisibility:"hidden"
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        padding: 20,
    },
});
