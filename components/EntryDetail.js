import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar, Platform } from 'react-native';

class EntryDetail extends Component {
    render () {
        return (
            <View style={styles.container}>
                <Text>Decks</Text>
                <Text>Decks</Text>
                <Text>Decks</Text>
                <Text>Decks</Text>
                <Text>Decks</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    });

export default EntryDetail