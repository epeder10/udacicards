import React from 'react'
import { StyleSheet, Text, View, FlatList, StatusBar, Platform } from 'react-native';

class HomeScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Home!</Text>
        </View>
      );
    }
  }

  export default HomeScreen