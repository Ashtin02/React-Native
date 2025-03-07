import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks'

export default function flashcardCreation() {
    const { deckName } = useLocalSearchParams<{ deckName: string }>();
  return (
    <View style={styles.container}>
          <Text style={styles.title}> {deckName} </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 40,
        paddingTop:20,
        fontWeight: "bold",
    },
})