import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, Platform, Switch } from 'react-native'
import { StackActions } from 'react-navigation'
import { white, purple} from '../utils/colors'

function ShowAnswerBtn ({ onPress }) {
    return (
      <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
        onPress={onPress}>
          <Text style={styles.submitBtnText}>Show Answer</Text>
      </TouchableOpacity>
    )
}

function NextQuestionBtn ({ onPress }) {
    return (
      <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
        onPress={onPress}>
          <Text style={styles.submitBtnText}>Next Question</Text>
      </TouchableOpacity>
    )
}

function EndQuizBtn ({ onPress }) {
    return (
      <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
        onPress={onPress}>
          <Text style={styles.submitBtnText}>End Quiz</Text>
      </TouchableOpacity>
    )
}

class Quiz extends Component {
    showAnswer = () => {
        this.setState({
            showAnswer: true
        })
    }

    userAnswer = (selection) => {
        this.setState({
            correct: selection
        })
    }

    nextQuestion = () => {
        const resetAction = StackActions.reset({
            index: 1,
            actions: [
            NavigationActions.navigate({ routeName: 'Main' }),
            NavigationActions.navigate({ routeName: 'Deck', params: { 'deck': this.state.deckKey} }),
            NavigationActions.navigate({ routeName: 'Quiz', params: { 'deck': this.state.deckKey} }),
            ],
        });
        this.props.navigation.dispatch(resetAction);
    }

    endQuiz = () => {
        alert('end!')
    }

    constructor (props) {
        super(props)
        this.state = {
            showAnswer: false,
            correct: false,
            deckKey: this.props.navigation.state.params.deck,
            cardIndex: this.props.navigation.state.params.cardIndex
        }
    }

    render () {
        const key = this.props.navigation.state.params.deck
        const deck = this.props.decks[key]

        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Quiz</Text>
                <Text>Questions remaining: {deck.cards.length}</Text>
                <Text style={styles.text}>{deck.cards[this.state.cardIndex].question}</Text>
                { this.state.showAnswer ? 
                <View>
                    <Text style={styles.text}>{deck.cards[this.state.cardIndex].answer}</Text>
                    <View style={styles.row}>
                        <Text>Did you answer correctly?</Text>
                        <Switch onValueChange={this.userAnswer}
                            value={this.state.correct}/>
                    </View>
                    { this.state.cardIndex === deck.cards.length ?
                        <NextQuestionBtn onPress={this.nextQuestion} /> :
                        <EndQuizBtn onPress={this.endQuiz} />
                    }
                </View>:
                <ShowAnswerBtn onPress={this.showAnswer} />
                }
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
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