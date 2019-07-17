import React from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar, Platform } from 'react-native';
import { purple, white } from './utils/colors'
import Constants from 'expo-constants'
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import AddDeck from './components/AddDeck'
import EntryDetail from './components/EntryDetail'
import HomeScreen from './components/HomeScreen'

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'All Decks',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='archive' size={30} color={tintColor} />
    },
  },
  AddEntry: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
});

const MainNavigator = createStackNavigator({
  Home: {
    screen: TabNavigator,
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})

const AppContainer = createAppContainer(MainNavigator);

export default createAppContainer(MainNavigator);

/*export default class App extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
        <AppContainer></AppContainer>
      </View>
    )
  }
}*/


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
