import React from 'react'
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, Platform } from 'react-native';
import { receiveEntries } from '../actions/index'

class HomeScreen extends React.Component {
    componentDidMount() {
        this.props.dispatch(receiveEntries())
    }

    render() {
        if (Object.keys(this.props.decks).length == 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.heading}>There are no decks</Text>
                    <Text>Create one below.</Text>
                </View>
            )
        }
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <FlatList
                    data={Object.keys(this.props.decks)}
                    renderItem={({item}) => <Text keyItem={item}>{item}</Text>}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        alignItems: 'center'
    },
    heading: {
        fontSize: 22,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});
function mapStateToProps (entries) {
    return {
        decks: entries
    }
}
      
export default connect(mapStateToProps)(HomeScreen)