import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { purple, white } from '../utils/colors';
import { StackActions } from 'react-navigation';
import { addEntry } from '../actions/index'
import { submitEntry } from '../utils/api'


function SubmitBtn ({ onPress }) {
    return (
      <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
        onPress={onPress}>
          <Text style={styles.submitBtnText}>SUBMIT</Text>
      </TouchableOpacity>
    )
}

class AddDeck extends Component {

    submit = () => {
        const key = this.state['text']
        const entry = {'cards': []}
    
        this.props.dispatch(addEntry({
          [key]: entry
        }))
    
        this.setState(() => ({ text: ''}))

        this.toHome(key)
    
        submitEntry({ key, entry })
    
        // Clear local notification
    }
    
    toHome = (key) => {
        const pushAction = StackActions.push({
            routeName: 'Deck',
            params: {
              deck: key,
            },
        });
          
        this.props.navigation.dispatch(pushAction);
    }

    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.textField}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
                <SubmitBtn onPress={this.submit} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        alignItems: 'center'
    },
    textField: {
        height: 40, 
        width: 200, 
        borderColor: 'gray', 
        borderWidth: 1,
        paddingTop: 10,
        marginLeft: 40,
        marginRight: 40
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

function mapStateToProps (state) {
    return {
        state: state
    }
}
      
export default connect(mapStateToProps)(AddDeck)