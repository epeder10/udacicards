import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, Platform, Switch } from 'react-native'
import { StackActions } from 'react-navigation'
import { white, purple, orange } from '../utils/colors'

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

function BackToDeckBtn ({ onPress }) {
    return (
      <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
        onPress={onPress}>
          <Text style={styles.submitBtnText}>Back To Deck</Text>
      </TouchableOpacity>
    )
}

function RestartQuizBtn ({ onPress }) {
    return (
      <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
        onPress={onPress}>
          <Text style={styles.submitBtnText}>Restart Quiz</Text>
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
        this.updateQuiz()
        
        this.setState({
            'cardIndex': this.state.cardIndex + 1,
            'showAnswer': false
        })
    }

    updateQuiz = () => {
        if (this.state.correct) {
            this.setState({
                correctAnswer: this.state.correctAnswer + 1,
            })
        }
        this.setState({
            questionsAnswered: this.state.questionsAnswered + 1,
        })
    }
    endQuiz = () => {
        this.updateQuiz()
        this.setState({
            completed: true
        })
    }

    restartQuiz = () => {
        const pushAction = StackActions.replace({
            routeName: 'Quiz',
            params: {
              deck: this.props.navigation.state.params.deck,
              cardIndex: 0,
              correctAnswer: 0,
              questionsAnswered: 0,
              completed: false,
            },
        });
          
        this.props.navigation.dispatch(pushAction);
    }

    backToDeck = () => {
        const popAction = StackActions.pop({
            n: 1,
          });
          
        this.props.navigation.dispatch(popAction);
    }

    constructor (props) {
        super(props)
        this.state = {
            showAnswer: false,
            correct: false,
            deckKey: this.props.navigation.state.params.deck,
            cardIndex: this.props.navigation.state.params.cardIndex,
            correctAnswer: this.props.navigation.state.params.correctAnswer,
            questionsAnswered: this.props.navigation.state.params.questionsAnswered,
            completed: this.props.navigation.state.params.completed
        }
    }

    render () {
        const key = this.props.navigation.state.params.deck
        const deck = this.props.decks[key]
        const remainingCards = deck.cards.length - this.state.cardIndex

        if (this.state.completed) {
            const percent = (this.state.correctAnswer / this.state.questionsAnswered) * 100
            return (
                <View style={styles.container}>
                    <Text style={styles.percent}>{ percent }%</Text>
                    <Text style={styles.text}>You answered {this.state.correctAnswer} questions correct</Text>
                    <RestartQuizBtn onPress={this.restartQuiz} />
                    <BackToDeckBtn onPress={this.backToDeck} />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Quiz</Text>
                <Text>Questions remaining: {remainingCards}</Text>
                <Text style={styles.heading}>{deck.cards[this.state.cardIndex].question}</Text>
                { this.state.showAnswer ? 
                <View>
                    <Text style={styles.text}>{deck.cards[this.state.cardIndex].answer}</Text>
                    <View style={styles.row}>
                        <Text>Did you answer correctly?</Text>
                        <Switch onValueChange={this.userAnswer}
                            value={this.state.correct}/>
                    </View>
                    { this.state.cardIndex + 1 === deck.cards.length ?
                        <EndQuizBtn onPress={this.endQuiz} /> :
                        <NextQuestionBtn onPress={this.nextQuestion} />
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
    percent: {
        fontSize: 40,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: orange
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