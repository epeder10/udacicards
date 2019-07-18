import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { white, purple } from '../utils/colors'
import { addEntry } from '../actions/index'
import { submitEntry } from '../utils/api' 
import { StackActions } from 'react-navigation';

function SubmitBtn ({ onPress }) {
    return (
      <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
        onPress={onPress}>
          <Text style={styles.submitBtnText}>SUBMIT</Text>
      </TouchableOpacity>
    )
}

class AddQuestion extends Component {

    submit = () => {
        const key = this.state['deck']
        const deck = this.props.decks[key]
        card = {
            'question': this.state['question'],
            'answer': this.state['answer']
        }
        deck.cards.push(card)
    
        this.props.dispatch(addEntry({
          [key]: deck
        }))
    
        this.setState(() => ({ text: ''}))

        this.toDeck(key)
    
        submitEntry({ key, deck })

    }
    
    toDeck = (key) => {
        const popAction = StackActions.pop({
            n: 1,
          });
          
          this.props.navigation.dispatch(popAction);
    }

    constructor(props) {
        super(props);
        this.state = { 
            question: '',
            answer: '',
            deck: this.props.navigation.state.params.deck
        };
    }

    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Add a Question?</Text>
                <TextInput
                    style={styles.textField}
                    onChangeText={(text) => this.setState({'question' : text})}
                    value={this.state.question}
                />
                <Text style={styles.heading}>Add the Answer?</Text>
                <TextInput
                    style={styles.textField}
                    onChangeText={(text) => this.setState({'answer': text})}
                    value={this.state.answer}
                />
                <SubmitBtn onPress={this.submit} />
            </View>
        )
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
    textField: {
        height: 40,
        borderColor: 'gray', 
        borderWidth: 1,
        paddingTop: 10,
        marginLeft: 40,
        marginRight: 40,
        textAlign: 'center'
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
      
export default connect(mapStateToProps)(AddQuestion)