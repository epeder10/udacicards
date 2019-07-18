import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { StackActions } from 'react-navigation'
import { white, purple} from '../utils/colors'

class Quiz extends Component {

    render () {
        const key = this.props.navigation.state.params.deck
        const index = this.props.navigation.state.params.cardIndex
        const deck = this.props.decks[key]

        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Quiz</Text>
                <Text style={styles.text}>{deck.cards[index].question}</Text>
                <Text style={styles.text}>{deck.cards[index].answer}</Text>
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
    text: {
        fontSize: 18,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
    },
    heading: {
        fontSize: 22,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold'
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
    });

function mapStateToProps( state ) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(Quiz)