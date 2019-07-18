import React, { Component } from 'react';
import { StackActions } from 'react-navigation'
import { StyleSheet, Text, View, FlatList, StatusBar, TouchableOpacity ,Platform } from 'react-native';
import { white, purple } from '../utils/colors'
import { connect } from 'react-redux';

class Deck extends Component {
    submit = () => {
        alert('click');
    }

    addQuestion = () => {
        const pushAction = StackActions.push({
            routeName: 'AddQuestion',
            params: {
              deck: this.props.navigation.state.params.deck,
            },
        });
          
        this.props.navigation.dispatch(pushAction);
    }

    render () {
        const key = this.props.navigation.state.params.deck
        const deck = this.props.decks[key]
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>{key}</Text>
                <Text style={styles.heading}>Number of cards: {deck['cards'].length}</Text>
                <TouchableOpacity
                    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                    onPress={this.submit}>
                    <Text style={styles.submitBtnText}>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                    onPress={this.addQuestion}>
                    <Text style={styles.submitBtnText}>Add Question</Text>
                </TouchableOpacity>
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
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingTop: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        margin: 40
    },
      AndroidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
      heading: {
        fontSize: 22,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    });

function mapStateToProps (state) {
    return {
        decks: state
    }
}
        
export default connect(mapStateToProps)(Deck)