import React from 'react'
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, Platform, TouchableOpacity, Animated, Easing } from 'react-native';
import { receiveEntries } from '../actions/index'
import { StackActions } from 'react-navigation';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.opacityValue = new Animated.Value(0)
    }
    componentDidMount() {
        this.props.dispatch(receiveEntries())
    }

    showBook = (item) => {
        const pushAction = StackActions.push({
            routeName: 'Deck',
            params: {
                deck: item,
              },
        });
          
        this.props.navigation.dispatch(pushAction);
    }

    opacity = (item) => {
        this.opacityValue.setValue(0);
        Animated.timing(
          this.opacityValue,
          {
            toValue: 1,
            duration: 1000,
            easing: Easing.back()
          }
        ).start((e) => this.showBook(item));
    }

    render() {
        const opacity = this.opacityValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 0, 1]
          });
        if (Object.keys(this.props.decks).length == 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.heading}>There are no decks</Text>
                    <Text style={styles.text}>Create one below.</Text>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <FlatList
                    data={Object.keys(this.props.decks)}
                    renderItem={({item}) => 
                    <Animated.View style={[{opacity}]}>
                        <TouchableOpacity
                            onPress={(e) => this.opacity(item)}>
                            <View style={styles.deck}>
                                <Text style={styles.heading} >{item}</Text>
                                <Text style={styles.text} >{this.props.decks[item]['cards'].length} cards in deck</Text>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 5,
        paddingRight: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    heading: {
        fontSize: 22,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    text: {
        fontSize: 18,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
    },
    deck: {
        padding: 30,
        margin: 0,
        borderWidth: 1,
        textAlign: 'center',    
        borderColor: '#dad7d7',
        borderStyle: 'solid',
        borderRadius: 5,
      }
});
function mapStateToProps (entries) {
    return {
        decks: entries
    }
}
      
export default connect(mapStateToProps)(HomeScreen)