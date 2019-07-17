import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar, Platform } from 'react-native';


class Deck extends Component {
    render () {
        return (
            <View style={styles.container}>
                <Text>Deck name</Text>
                <Text>Number of cards</Text>
                <Text>Start Quiz</Text>
                <Text>Add question</Text>
                <Card/>
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

export default Deck