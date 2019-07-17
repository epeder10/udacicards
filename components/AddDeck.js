import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, StatusBar, Platform } from 'react-native';

class AddDeck extends Component {
    render () {
        return (
            <View style={styles.container}>
                <Text>What is the title of your new deck?</Text>
                

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

export default AddDeck